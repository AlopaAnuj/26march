exports.getUserDetails = async (dbInstance, userName) => {
    return dbInstance.sequelize.models.stateLogin.findAll({
        where: {
            userName,
        }
      });
    };