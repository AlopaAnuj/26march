
exports.getAllStateUsers = async (dbInstance) => {
  return dbInstance.sequelize.models.stateLogin.findAll({
    where: {
      role: 2
    }
  });
};

exports.getAllCondidates = async (dbInstance, userId) => {
  return dbInstance.sequelize.models.condidates.findAll({ where: {userId}
  });
};

exports.saveAndUpdateCondidate = async (dbInstance, condidateObj) => {
  return dbInstance.sequelize.models.condidates.upsert(condidateObj, {
  });
};