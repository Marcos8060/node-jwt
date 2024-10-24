const Joi = require("joi");

const RegisterValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(4).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

const LoginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

module.exports = {
    RegisterValidation,
    LoginValidation,
}
