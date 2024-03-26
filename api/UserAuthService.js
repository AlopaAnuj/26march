const wrap = require("async-middleware").wrap;
const router = require("express").Router();
const UserAuthDb = require("../datbase/UserAuthDb");
const encrypt = require("../utils/encrypt.js");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "meQ84_Dir3";
const SchemaValidator  = require("../utils/SchemaValidation");
const JoiSchema = require("./JoiSchema.js");

const generateJwtToken = (tokenData, expiryTime) => {
    return jwt.sign(tokenData, SECRET_KEY, { expiresIn: expiryTime });
};
const validateLoginDetails = SchemaValidator(
    JoiSchema.loginDetails,
    "body",
    true
  );

router.post(
    "/login",
    wrap(validateLoginDetails),
    wrap(async (req, res) => {
console.log(encrypt.computeHash("andhrapradesh"))
console.log(await encrypt.getHashedPassword("andhrapradesh@123"))
        let userName = encrypt.computeHash(req.body.userName);
        let result = await UserAuthDb.getUserDetails(req.dbInstance, userName);
        if (result.length > 0) {
            let isPasswordMatched = await encrypt.compare(
                req.body.password,
                result[0].password
            );
            if (isPasswordMatched) {
                let userObj = {
                    userId: result[0].id,
                    stateName: result[0].stateName,
                    role: result[0].role
                }
                let acessToken = generateJwtToken(userObj, "60m")
                return res.status(200).json({
                    acessToken,
                    role: result[0].role
                });
            }
        }
        return res.status(400).json({
            statusDescription: "Username or password wrong."
        });
    })
);


module.exports = router;
