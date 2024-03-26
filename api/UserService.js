const wrap = require("async-middleware").wrap;
const router = require("express").Router();
const AdminDb = require("../datbase/AdminDb");
const SchemaValidator = require("../utils/SchemaValidation");
const JoiSchema = require("./JoiSchema.js");

const validateCondidateObj = SchemaValidator(
    JoiSchema.validateMobileClientLogin,
    "body",
    true
);

router.post(
    "/addCondidate",
    wrap(validateCondidateObj),
    wrap(async (req, res) => {
        
        req.body.userId = req.user.userId;
        console.log(req.body.photo)
        let result = await AdminDb.saveAndUpdateCondidate(req.dbInstance, req.body);
        return res.status(200).json({
            result
        });
    })
);

router.get(
    "/getAllCondidates",
    wrap(async (req, res) => {
        let result = await AdminDb.getAllCondidates(req.dbInstance, req.user.userId);
        return res.status(200).json({
            result,
        });
    })
);

module.exports = router;
