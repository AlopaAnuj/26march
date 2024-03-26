const config = require("config");

function getVariablesForCurrentEnv() {
  return config;
}

module.exports = getVariablesForCurrentEnv();
