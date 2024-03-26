
const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);

function attachModels(sequelize, Sequelize) {
  const db = {};
  fs.readdirSync(__dirname)
    .filter((file) => {
      return (
        file.indexOf(".") !== 0 &&
        file !== basename &&
        file.slice(-3) === ".js"
      );
    })
    .forEach((file) => {
      let model = require(path.join(__dirname, file))(
        sequelize,
        Sequelize.DataTypes
      );
      db[model.name] = model;
    });

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].postModelInitialisation) {
      db[modelName].postModelInitialisation(db);
    }
  });
  db.Sequelize = Sequelize;
  db.sequelize = sequelize;
  return db;
}

exports.attachModels = attachModels;
