const jwt = require("jsonwebtoken");
const SECRET_KEY = "meQ84_Dir3";

function authoriseAdmin(req, res, next) {
  try {
    let token =
      req.headers["x-access-token"] || req.query.token || req.body.token;
    if (token) {
      jwt.verify(token, SECRET_KEY, function (err, decoded) {
        if (err) {
          return res.status(401).json({
            status: 0,
            message: "Failed to authenticate access_token.",
          });
        } else if (decoded.role === 1) {
          req.user = decoded;
          return next();
        } else {
          return res.status(403).json({
            errorCode: 2,
            status: 0,
            statusDescription: res.__("Msg_Dont_have_permission"),
          });
        }
      });
    } else {
      return res.status(400).json({
        status: 0,
        message: "No token provided.",
      });
    }
  } catch (error) {
    return res.status(403).json({
      status: 0,
      message: "You are not allowed to perform this action",
    });
  }
}

function authoriseUser(req, res, next) {
  try {
    let token =
      req.headers["x-access-token"];
    if (token) {
      jwt.verify(token, SECRET_KEY, function (err, decoded) {
        if (err) {
          return res.status(401).json({
            status: 0,
            message: "Failed to authenticate access_token.",
          });
        } else if (decoded.role === 2) {
          req.user = decoded;
          return next();
        } else {
          return res.status(403).json({
            errorCode: 2,
            status: 0,
            statusDescription: res.__("Msg_Dont_have_permission"),
          });
        }
      });
    } else {
      return res.status(400).json({
        status: 0,
        message: "No token provided.",
      });
    }
  } catch (error) {
    return res.status(403).json({
      status: 0,
      message: "You are not allowed to perform this action",
    });
  }
}

exports.authoriseAdmin = authoriseAdmin;
exports.authoriseUser = authoriseUser;
