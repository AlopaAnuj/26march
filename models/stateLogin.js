/* jshint indent: 1 */
module.exports = function (sequelize, DataTypes) {
    let stateLogin = sequelize.define(
      "stateLogin",
      {
          id: {
            type: DataTypes.STRING(),
            allowNull: false,
            primaryKey: true,
        },
        userName: {
            type: DataTypes.STRING(100),
            allowNull: false,
          },
          password: {
            type: DataTypes.STRING(100),
            allowNull: false,
          },
          stateName: {
            type: DataTypes.STRING(100),
            allowNull: false,
          },
          role: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
          },
        createddatetime: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
          },
          modifieddatetime: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
          },
      },
      {
        tableName: "stateLogin",
        timestamps: false,
      }
    );
    return stateLogin;
  };
  