const mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema({
  nip: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  gender: { type: String, required: true, enum: ['M', 'F'] },
  birthdate: { type: Date, required: true },
  entrydate: { type: Date, required: true },
  grade: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Salary' },
});

module.exports = mongoose.model('Employee', EmployeeSchema);
