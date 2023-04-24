import Joi from "joi";

const login = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().required(),
});

export default {
  login,
};