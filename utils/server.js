const config = require("config");
const { AsyncLocalStorage } = require("async_hooks");
const helmet = require("helmet");
const nocache = require("nocache");
const compress = require("compression");
const bodyParser = require("body-parser");
let tamper = require("./tamper.js");
let heartbeat = require("./heartbeat.js")
const logger = require("./logger");
const sequelizedb = require("./sequelizedb");

exports.errorHandler = (envVariable) => {
  return function (err, req, res, next) {
    logger.error(req.originalUrl);
    logger.error(err);
    logger.error(err.stack);
    if (res.headersSent) {
      return next(err);
    }
    if (envVariable.verboseError == 0) {
      res.status(500).send("Something went wrong, please try again later");
    } else {
      res.status(500).send({ Error: err.stack });
    }
  };
};
exports.startServer = async function (app) {  
      logger.debug("setting up http");
      let http = require("http");
      let server = http.createServer(app);

      server.keepAliveTimeout = 90 * 1000;
      server.listen(config.port, function (err) {
        console.log("server is running on port " + config.port)
      if (err) {
        logger.error(err);
        throw err;
      }
    });
  };

exports.setupApp = function (app, getDBInstance, shouldCache) {
    let asyncLocalStorageInstance = new AsyncLocalStorage();
    global.amalgamRequestContext = asyncLocalStorageInstance;
  
    app.use(
      helmet({
        hidePoweredBy: true,
        xssFilter: true,
        noSniff: true,
        hsts: {
          maxAge: 15552000,
          includeSubDomains: false,
        },
        frameguard: {
          action: "sameorigin",
        },
        referrerPolicy: {
          policy: "same-origin",
        },
      })
    );
    if (!shouldCache) {
      app.use(nocache());
    }
    app.use(function (_req, res, next) {
      res.set("x-app-version", config.appVersion);
      res.set("x-app-modelNumber", config.appModelNumber);
      res.set("x-app-manufactureDate", config.appManufactureDate);
      next();
    });
  
    app.use(compress());
    app.use(
      bodyParser.json({
        limit: "2mb",
      })
    );
    app.use(
      bodyParser.urlencoded({
        extended: true,
      })
    );
    app.use(bodyParser.text());
    // app.use(requestIdMiddleware(asyncLocalStorageInstance));
    app.use((req, res, next) => {
      logger.debug({
        url: req.url,
        method: req.method,
        description: "Request received",
      });
      res.on("finish", () => {
        logger.debug({
          url: req.url,
          method: req.method,
          status: res.statusCode,
          contentType: res.get("Content-Type"),
        });
      });
      next();
    });
    // app.use(auditAndErrorHandler.errorHandler(config));
    app.use((req, res, next) => {
      let urlAfterSplit = req.url.split("/");
      if (!urlAfterSplit.includes("api")) {
        return next();
      } else if (urlAfterSplit.includes("apidocs")) {
        return next();
      } else if (
        urlAfterSplit[config.apiVersionPosition].match(/^V[0-9]{1,2}$/)
      ) {
        let apiVersion = urlAfterSplit[config.apiVersionPosition].substring(1);
        if (config.supportedApiVersion.split(",").includes(apiVersion)) {
          req.apiVersion = parseInt(apiVersion);
          urlAfterSplit.splice(config.apiVersionPosition, 1);
          req.url = urlAfterSplit.join("/");
          return next();
        } else {
          return res
            .status(NOTFOUND)
            .json({ description: "api version not supported" });
        }
      } else {
        if (config.supportedApiVersion.split(",").includes("1")) {
          req.apiVersion = 1;
          return next();
        } else {
          return res
            .status(NOTFOUND)
            .json({ description: "api version not supported" });
        }
      }
    });
    app.use(async function (req, res, next) {
      if (getDBInstance) {
        req.dbInstance = getDBInstance(req);
        if (req.dbInstance == undefined) {
          return res.sendStatus(400);
        }
        if (
          req.method == "POST" ||
          req.method == "PUT" ||
          req.method == "DELETE"
        ) {
          req.transaction = await req.dbInstance.sequelize.transaction();
        }
      }
      next();
    });
    app.use(
      tamper(function (req) {
        let transactionDone = false;
        let transactionRolledBack = false;
        if (
          req.method != "POST" &&
          req.method != "PUT" &&
          req.method != "DELETE"
        ) {
          return false;
        }
        return async function (body, statusCode) {
          try {
            if (!transactionDone) {
              if (statusCode >= 400) {
                logger.debug("rollback initiated");
                let t = req.transaction.rollback();
                transactionDone = true;
                await t;
              } else {
                logger.debug("commit initiated");
                let t = req.transaction.commit();
                transactionDone = true;
                await t;
                logger.debug("commit successful");
              }
            }
            return body;
          } catch (error) {
            if (!transactionRolledBack) {
              logger.debug("attempt to rollback is initiated");
              req.transaction.rollback().catch((_err) => {
                logger.error("error on rolling back ignored");
              });
              transactionRolledBack = true;
            }
            logger.error("transaction commit failure");
          }
        };
      })
    );
  };

  exports.heartbeat =heartbeat;
  exports.logger =logger;
  exports.sequelizedb = sequelizedb;
