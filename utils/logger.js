const winston = require("winston");
let loggerLevel = process.env.loggerLevel ? process.env.loggerLevel : "debug";
const config = require("config");
// const { getIP, getAZ } = require("./containerMetaData");
const enumerateErrorFormat = winston.format((info) => {
  if (info.message instanceof Error) {
  
    info.message = Object.assign(
      {
        message: info.message.message,
        stack: info.message.stack,
      },
      info.message
    );
  }

  if (info instanceof Error) {
 
    return Object.assign(
      {
        message: info.message,
        stack: info.stack,
      },
      info
    );
  }
  return info;
});

if (!parseInt(config.shouldNotRedact)) {
  const { SyncRedactor } = require("redact-pii");
  const redactor = new SyncRedactor({
    globalReplaceWith: "<REDACTED_VALUE>",
    builtInRedactors: {
      url: {
        enabled: false,
      },
      usSocialSecurityNumber: {
        enabled: false,
      },
      digits: {
        enabled: false,
      },
      ipAddress: {
        enabled: false,
      },
      creditCardNumber: {
        enabled: false,
      },
    },
  });
  const replacer = function (key, value) {
    if (key == "message" && value != undefined) {
      value = redactor.redact(JSON.stringify(value));
      value = value.replace(/"/g, "");
    }
    return value;
  };
  const logger = winston.createLogger({
    level: loggerLevel,
    format: winston.format.combine(
    //   axiosError(),
      winston.format.timestamp(),
      enumerateErrorFormat(),
      winston.format.json({ replacer: replacer })
    ),

    transports: [
      new winston.transports.Console({
        name: "console-log",
        handleExceptions: true,
        colorize: true,
        timestamp: true,
        json: false,
        stderrLevels: ["error"],
      }),
    ],
  });
  module.exports = logger;
} else {
  const logger = winston.createLogger({
    level: loggerLevel,
    format: winston.format.combine(
    //   axiosError(),
      winston.format.timestamp(),
      enumerateErrorFormat(),
      winston.format.json()
    ),
    defaultMeta: {
      get ip() {
        return getIP();
      },
      get az() {
        return getAZ();
      },
      get traceId() {
        return global.amalgamRequestContext &&
          global.amalgamRequestContext.getStore() &&
          global.amalgamRequestContext.getStore().get("traceId")
          ? global.amalgamRequestContext.getStore().get("traceId")
          : "NA";
      },
    },
    transports: [
      new winston.transports.Console({
        name: "console-log",
        handleExceptions: true,
        colorize: true,
        timestamp: true,
        json: false,
        stderrLevels: ["error"],
      }),
    ],
  });
  module.exports = logger;
}
