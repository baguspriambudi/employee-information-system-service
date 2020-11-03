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

exports.midEmployee = (req, res, next) => {
  const schema = Joi.object({
    nip: Joi.string().required(),
    name: Joi.string().required(),
    gender: Joi.string().required(),
    birthdate: Joi.date().required(),
    entrydate: Joi.date().required(),
    grade: Joi.objectId().required(),
  }).options({ abortEarly: false });
  const { error } = schema.validate(req.body);
  if (error) {
    return httpValidasiDataErrorRespone(res, error.details);
  }
  next();
};

exports.midEmployeeUpdate = (req, res, next) => {
  const schema = Joi.object({
    nip: Joi.string().required().optional(),
    name: Joi.string().required().optional(),
    gender: Joi.string().required().optional(),
    birthdate: Joi.date().required().optional(),
    entrydate: Joi.date().required().optional(),
    grade: Joi.objectId().required().optional(),
  }).options({ abortEarly: false });
  const { error } = schema.validate(req.body);
  if (error) {
    return httpValidasiDataErrorRespone(res, error.details);
  }
  const schema2 = Joi.object({
    id: Joi.objectId().required(),
  }).options({ abortEarly: false });
  const isvalid2 = schema2.validate(req.query);
  if (isvalid2.error) {
    return httpValidasiDataErrorRespone(res, error.details);
  }
  next();
};

exports.midEmployeeDelete = (req, res, next) => {
  const schema = Joi.object({
    id: Joi.objectId().required(),
  }).options({ abortEarly: false });

  const { error } = schema.validate(req.query);
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
