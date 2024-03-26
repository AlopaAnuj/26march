const wrap = require("async-middleware").wrap;
const router = require("express").Router();
const AdminDb = require("../datbase/AdminDb");
const SchemaValidator = require("../utils/SchemaValidation");
const JoiSchema = require("./JoiSchema.js");

const validateStateId = SchemaValidator(
  JoiSchema.validateStateId,
  "params",
  true
);

router.get(
  "/getAllStateUsers",
  wrap(async (req, res) => {
    let result = await AdminDb.getAllStateUsers(req.dbInstance);
    return res.status(200).json({
      result,
    });
  })
);

router.get(
  "/getAllCondidateOfState/:stateId",
  wrap(validateStateId),
  wrap(async (req, res) => {
    let result = await AdminDb.getAllCondidates(req.dbInstance, req.params.stateId);
    return res.status(200).json({
      result,
    });
  })
);
module.exports = router;
