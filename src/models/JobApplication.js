// models/jobApplication.js
const mongoose = require('mongoose');

// const jobApplicationSchema = new mongoose.Schema({
//   jobId: {
//     type: String,
//     ref: 'Jobserver',
//     required: true
//   },
//   userId: {
//     type: String,
//     ref: 'employee_And _employer',
//     required: true
//   },
//   user: {
//     type: Object,
//     ref: 'employee_And _employer'
//   }
// }, { timestamps: true });
const jobApplicationSchema = new mongoose.Schema({
  jobId: {
    type: String,
    ref: 'Jobserver',
    required: true
  },
  userId: {
    type: String,
    ref: 'employee_And _employer',
    required: true
  }
}, { timestamps: true });

const JobApplication = mongoose.model('JobApplication', jobApplicationSchema);

module.exports = JobApplication;
