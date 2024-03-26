let logger = require("./logger");
let config = require("config");
// let getCertAndKey = require("./getCertificateDetails");

const healthCheck = (db, publisher) => {
  return async (req, res) => {
    try {
      logger.debug("Health Check Made");
      if (db.usingSequelize) {
        let testDBConnections = [];
        for (let prop of Object.keys(db)) {
          if (prop != "initialize") {
            testDBConnections.push(db[prop].sequelize.authenticate());
          }
        }
        await Promise.all(testDBConnections);
      } else if (db) {
        await db.query("select 1 from dual");
      }
      let msg = {};
      msg.routingKey = "heartbeat";
      if (publisher) {
        await publisher.publishEvent(msg);
      }
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("ok");
    } catch (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("error");
      logger.error(`health check error:${err}`);
    }
  };
};

exports.initialise = async (db, publisher, port) => {
  let server;
  if (parseInt(config.runWithHttps)) {
    logger.debug("health check https");
    let https = require("https");
    // let certAndKeyDetails = getCertAndKey();
    server = https.createServer(
    //   {
    //     key: certAndKeyDetails.privKey,
    //     cert: certAndKeyDetails.cert,
    //   },
      healthCheck(db, publisher)
    );
  } else {
    logger.debug("health check http");
    let http = require("http");
    server = http.createServer(healthCheck(db, publisher));
  }
  server.listen(port, function (err) {
    if (err) {
      return err;
    }
  });
};
