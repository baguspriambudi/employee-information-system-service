const mongoose = require('mongoose');

const SalarySchema = mongoose.Schema({
  grade: { type: String, enum: ['A', 'B', 'C', 'D'], required: true },
  salary: { type: Number, required: true },
});

module.exports = mongoose.model('Salary', SalarySchema);
