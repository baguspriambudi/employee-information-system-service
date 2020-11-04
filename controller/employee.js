const Employee = require('../model/Employee');
const Salary = require('../model/Salary');
const { httpValidasiErroResponse, httpOkResponse, httpNotFound } = require('../helper/http_respone');

exports.createEmployee = async (req, res, next) => {
  try {
    const { nip, name, gender, birthdate, entrydate, grade } = req.body;
    const findEmployee = await Employee.findOne({ nip: nip });
    if (findEmployee) {
      return httpValidasiErroResponse(res, 'employee is already exist');
    }
    const findSalary = await Salary.findOne({ _id: grade });
    if (!findSalary) {
      return httpNotFound(res, 'grade salary not found');
    }
    const employee = await new Employee({ nip, name, gender, birthdate, entrydate, grade }).save();
    httpOkResponse(res, 'employee succesfully inputed ', employee);
  } catch (error) {
    next(error);
  }
};

exports.findEmployee = async (req, res, next) => {
  try {
    const { page } = req.query;
    // eslint-disable-next-line radix
    const int = parseInt(page);
    const pageInt = int * 10 - 10;
    const findEmployee = await Employee.find({}).populate({ path: 'grade' }).skip(pageInt).limit(10);
    httpOkResponse(res, 'successfully find employee', findEmployee);
  } catch (error) {
    next(error);
  }
};

exports.updateEmployee = async (req, res, next) => {
  try {
    const findEmployee = await Employee.findById({ _id: req.query.id });
    if (!findEmployee) {
      return httpNotFound(res, 'Employee not found');
    }
    const updateEmployee = await Employee.findOneAndUpdate(
      {
        _id: req.query.id,
      },
      req.body,
      { new: true },
    );
    httpOkResponse(res, 'employee successfully updated', updateEmployee);
  } catch (error) {
    next(error);
  }
};

exports.deleteEmployee = async (req, res, next) => {
  try {
    const findEmployee = await Employee.findById({ _id: req.query.id });
    if (!findEmployee) {
      return httpNotFound(res, 'Employee not found');
    }
    const deleteEmployee = await Employee.findOneAndDelete({
      _id: req.query.id,
    });
    httpOkResponse(res, 'employee successfully deleted', deleteEmployee);
  } catch (error) {
    next(error);
  }
};

exports.findEmployeeByEntryDate = async (req, res, next) => {
  try {
    const { start, end } = req.body;
    const findEmployee = await Employee.find({ entrydate: { $gte: start, $lte: end } })
      .populate({ path: 'grade' })
      .sort({ entrydate: 1 });
    httpOkResponse(res, 'successfully find employee', findEmployee);
  } catch (error) {
    next(error);
  }
};

exports.search = async (req, res, next) => {
  try {
    const { search } = req.body;
    if (search === '') {
      return httpValidasiErroResponse(res, 'please input data');
    }
    const searchEmployee = await Employee.find({
      $or: [{ name: { $regex: `.*${search}.*`, $options: 'i' } }, { nip: { $regex: `.*${search}.*`, $options: 'i' } }],
    }).populate({
      path: 'grade',
    });
    httpOkResponse(res, 'successfully find employee', searchEmployee);
  } catch (error) {
    next(error);
  }
};
