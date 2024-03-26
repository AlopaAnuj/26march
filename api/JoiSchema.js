const Joi = require("joi");

exports.loginDetails = Joi.object({
    userName: Joi.string().max(100).required(),
    password: Joi.string().required()
});

exports.validateMobileClientLogin = Joi.object({
    fullName: Joi.string().required().max(100),
    guardianName: Joi.string().required().max(100),
    dateOfBirth: Joi.string().required(),
    address: Joi.string().required(),
    contactNumber: Joi.string().trim().regex(/^\d+$/).length(10),
    gender: Joi.string().required(),
    state: Joi.string().required(),
    district: Joi.string().required(),
    email: Joi.string().email().required(),
    primaryRole: Joi.string().required(),
    secondaryRole: Joi.string().optional().allow(""),
    otherRole: Joi.string().optional().allow(""),
    photo: Joi.string().required(),
    birthCertificate: Joi.string().required(),
    aadhar: Joi.string().required()
  });
  
  exports.validateStateId = Joi.object({
    stateId: Joi.number().required()
});