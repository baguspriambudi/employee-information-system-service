const Salary = require('../model/Salary');
const { httpOkResponse } = require('../helper/http_respone');

exports.createSalary = async (req, res, next) => {
  try {
    const { grade, salary } = req.body;
    const salaryCreated = await new Salary({ grade, salary }).save();
    httpOkResponse(res, 'salary succesfully inputed', salaryCreated);
  } catch (error) {
    next(error);
  }
};

exports.findSalary = async (req, res, next) => {
  try {
    const findSalary = await Salary.find({});
    httpOkResponse(res, 'salary succesfully inputed', findSalary);
  } catch (error) {
    next(error);
  }
};
