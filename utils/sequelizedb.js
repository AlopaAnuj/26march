const Sequelize = require("sequelize");
// const fs = require("fs");

let db = {};
// const RDSCerts = fs.readFileSync(__dirname + "/RDSCerts.pem");
const mySQLDefaultPort = 3306;

db.initialize = (config) => {
  const databases = Object.keys(config.mysqlConnection);
  for (const database of databases) {
    let sequelizeInstances = {};
    if (config.mysqlConnection[database]["host"] != "" &&
    config.mysqlConnection[database]["host"] != "NA") {
      let dbPath = config.mysqlConnection[database];
      sequelizeInstances.sequelize = new Sequelize(
        dbPath.database,
        dbPath.user,
        dbPath.password,

        {
          port: dbPath.port || mySQLDefaultPort,
          host: dbPath.configuration.host,
          dialect: dbPath.configuration.dialect || "mysql",
          define: {
            timestamps: false,
          },
          dialectOptions: {
            // ssl: dbPath.ssl === "Amazon RDS" ? { ca: RDSCerts } : dbPath.ssl,
          },
          logging: false,
          pool: {
            max: parseInt(dbPath.configuration.pool.max),
            min: 0,
            acquire: 30000,
            idle: 10000,
          },
        }
      );
      sequelizeInstances.connect = async () => {
        await db.sequelize.authenticate();
      };
      sequelizeInstances.Sequelize = Sequelize;

      db[database] = sequelizeInstances;
    }
  }
};

module.exports = db;
