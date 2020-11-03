const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const { httpValidasiDataErrorRespone } = require('../helper/http_respone');

exports.midUser = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }).options({ abortEarly: false });

  const { error } = schema.validate(req.body);
  if (error) {
    return httpValidasiDataErrorRespone(res, error.details);
  }
  next();
};

exports.midProductUpdate = (req, res, next) => {
  const schema = Joi.object({
    id: Joi.objectId().required(),
  }).options({ abortEarly: false });

  const { error } = schema.validate(req.query);
  if (error) {
    return httpValidasiDataErrorRespone(res, error.details);
  }
  next();
};

exports.midTransactionProducts = (req, res, next) => {
  const schema = Joi.object({
    member: Joi.string().required().allow(''),
    products: Joi.array()
      .required()
      .items(
        Joi.object({
          product: Joi.objectId().required(),
          qty: Joi.number().required(),
        }),
      ),
  }).options({ abortEarly: false });
  const { error } = schema.validate(req.body);
  if (error) {
    return httpValidasiDataErrorRespone(res, error.details);
  }
  next();
};

exports.midFindEmployeeByDate = (req, res, next) => {
  const schema = Joi.object({
    start: Joi.date().required(),
    end: Joi.date().required(),
  }).options({ abortEarly: false });
  const { error } = schema.validate(req.body);
  if (error) {
    return httpValidasiDataErrorRespone(res, error.details);
  }
  next();
};
