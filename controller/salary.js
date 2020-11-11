const Salary = require('../model/Salary');

exports.createSalary = async (req, res, next) => {
  try {
    const { grade, salary } = req.body;
    const find = await Salary.findOne({ grade: grade });
    if (find) {
      return res.render('salary', { msg: 'salary is exist' });
    }
    const salaryCreated = await new Salary({ grade, salary }).save();
    if (salaryCreated) {
      return res.render('salary', {
        title: 'Created',
        viewTitle: 'Create Salary',
        success: 'salary succesfully inputed',
      });
    }
    // httpOkResponse(res, 'salary succesfully inputed', salaryCreated);
  } catch (error) {
    next(error);
  }
};

exports.viewInsertSalary = async (req, res, next) => {
  try {
    return res.render('salary', { title: 'Created', viewTitle: 'Create Salary' });
  } catch (error) {
    next(error);
  }
};
