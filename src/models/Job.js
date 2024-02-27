// const mongoose = require("mongoose");
// const bcrypt = require('bcryptjs');
// const secret ='naresh';
// const jobSchema = new mongoose.Schema({
//   company: {
//     type: String,
//     required: [true, "Company name is required"],
//   },
//   position: {
//     type: String,
//     required: [true, "Job Position is required"],
//     maxlength: 100,
//   },
//   status: {
//     type: String,
//     enum: ["pending", "reject", "interview"],
//     default: "pending",
//   },
//   workType: {
//     type: String,
//     enum: ["full-time", "part-time", "internship", "contract"],
//     default: "full-time",
//   },
//   workLocation: {
//     type: String,
//     default: "kanchipuram",
//     required: [true, "Work location is required"],
//   },
//   experience: {
//     type: Number,
//     required: [true, "experience is required"],
//   },
//   describtion:{
//       type: String,
//   },
//   createdBy: {
//     type: String,
//     ref: "User",
//   },
// }, { timestamps: true });



// module.exports = mongoose.model("Job", jobSchema);

const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const Schema = mongoose.Schema;

const jobPostSchema = new Schema({
    jobPostedBy: {
      type: String,
      ref: "employee_And _employer",
    },
    jobTitle: {
        type: String,
        required: true
    },
    jobId:  { // Add userId field for UUID
        type: String,
        default: uuidv4, // Generate UUID as default value
        unique: true, // Ensure userId is unique
    },
    reqExp: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    offerSalary: {
        type: String,
        required: true
    },
    keySkills: {
        type: [String],
        required: true
    },
    desiredProf: {
        type: String,
        required: true
    },
    jobDesc: {
        type: String,
        required: true
    },
    companyProf: {
        type: String,
        required: true
    },
    application_expired_date: {
        type: Date,
        required: true
      },
    isActive: { type: Boolean, default: true } 
    }, { timestamps: true });

const Job = mongoose.model('Jobserver', jobPostSchema);

module.exports = Job;
