const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const { httpValidasiDataErrorRespone } = require('../helper/http_respone');

exports.midEmployee = (req, res, next) => {
  const schema = Joi.object({
    nip: Joi.string().required(),
    name: Joi.string().required(),
    gender: Joi.string().required().valid('M', 'F'),
    birthdate: Joi.date().required(),
    entrydate: Joi.date().required(),
    grade: Joi.string().required().valid('A', 'B', 'C', 'D'),
  }).options({ abortEarly: false });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.render('insert', {
      title: 'Searching',
      viewTitle: 'Insert Employee',
      msg: 'This field is required',
      date: error.message,
    });
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
    grade: Joi.string().required().valid('A', 'B', 'C', 'D'),
  }).options({ abortEarly: false });
  const { error } = schema.validate(req.body);
  if (error) {
    return httpValidasiDataErrorRespone(res, error.details);
  }
  const schema2 = Joi.object({
    id: Joi.objectId(),
  }).options({ abortEarly: false });
  const isvalid2 = schema2.validate(req.params);
  if (isvalid2.error) {
    return httpValidasiDataErrorRespone(res, isvalid2.error.details);
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
    return res.render('date', { msg: 'please input format date' });
  }
  next();
};

exports.midSalary = (req, res, next) => {
  const schema = Joi.object({
    grade: Joi.string().required().valid('A', 'B', 'C', 'D'),
    salary: Joi.number().required(),
  }).options({ abortEarly: false });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.render('salary', { err: 'This field is required' });
  }
  next();
};
