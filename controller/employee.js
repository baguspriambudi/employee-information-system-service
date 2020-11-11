const Employee = require('../model/Employee');
const Salary = require('../model/Salary');

exports.createEmployee = async (req, res, next) => {
  try {
    // return console.log(req.body);
    const { nip, name, gender, birthdate, entrydate, grade } = req.body;
    const findEmployee = await Employee.findOne({ nip: nip });
    if (findEmployee) {
      return res.render('insert', {
        title: 'Searching',
        viewTitle: 'Insert Employee',
        exist: 'employee is already exist',
      });
    }
    const findSalary = await Salary.findOne({ grade: grade });
    if (!findSalary) {
      return res.render('insert', {
        title: 'Searching',
        viewTitle: 'Insert Employee',
        notfound: 'grade salary not found',
      });
    }
    const employee = await new Employee({ nip, name, gender, birthdate, entrydate, grade: findSalary._id }).save();
    if (employee) {
      res.render('insert', {
        title: 'Created',
        viewTitle: 'Insert Employee',
        success: 'employee succesfully inputed',
        employee: req.body,
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.viewInsert = async (req, res, next) => {
  try {
    res.render('insert', { title: 'Created', viewTitle: 'Insert Employee' });
  } catch (error) {
    next(error);
  }
};

exports.findEmployee = async (req, res, next) => {
  try {
    // const { page } = req.query;
    // const int = parseInt(page);
    // const pageInt = int * 10 - 10;
    const findEmployee = await Employee.find({}).populate({ path: 'grade' });
    res.render('employee', {
      title: 'Employee',
      findEmployee,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateEmployee = async (req, res, next) => {
  try {
    const { nip, name, gender, birthdate, entrydate, grade } = req.body;
    const findGrade = await Salary.findOne({ grade: grade });
    if (!findGrade) {
      return res.render('edit', { grade: 'Grade not found' });
    }
    const Update = await Employee.updateOne({
      nip: nip,
      name: name,
      gender: gender,
      birthdate: birthdate,
      entrydate: entrydate,
      grade: findGrade._id,
    });
    if (Update) {
      return res.render('edit', { title: 'Updated', viewTitle: 'Update Employee', success: 'Succesfuly updated' });
    }
  } catch (error) {
    next(error);
  }
};

exports.viewUpdate = async (req, res, next) => {
  try {
    const find = await Employee.findOne({ _id: req.params.id });
    if (!find) {
      return res.render('edit', { msg: 'Employee not found' });
    }
    res.render('edit', { title: 'Updated', viewTitle: 'Update Employee', find });
  } catch (error) {
    next(error);
  }
};

exports.viewDelete = async (req, res, next) => {
  try {
    const find = await Employee.findByIdAndDelete({ _id: req.params.id });
    if (!find) {
      return res.render('employee', { msg: 'Employee not found' });
    }
    if (find) {
      return res.redirect('http://localhost:2000/api/v1/employee/view');
    }
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
    res.render('date', { title: 'By Date', viewTitle: 'Find Employee', findEmployee });
  } catch (error) {
    next(error);
  }
};

exports.search = async (req, res, next) => {
  try {
    const { search } = req.body;
    if (search === '') {
      return res.render('search', { msg: 'please input data' });
    }
    const searchEmployee = await Employee.find({
      $or: [{ name: { $regex: `.*${search}.*`, $options: 'i' } }, { nip: { $regex: `.*${search}.*`, $options: 'i' } }],
    }).populate({
      path: 'grade',
    });
    if (searchEmployee) {
      return res.render('search', { title: 'Searching', viewTitle: 'Find Employee', searchEmployee });
    }
  } catch (error) {
    next(error);
  }
};

exports.viewSeacrh = async (req, res, next) => {
  try {
    res.render('search', { title: 'Searching', viewTitle: 'Find Employee' });
  } catch (error) {
    next(error);
  }
};

exports.viewDate = async (req, res, next) => {
  try {
    res.render('date', { title: 'By Date', viewTitle: 'Find Employee' });
  } catch (error) {
    next(error);
  }
};
