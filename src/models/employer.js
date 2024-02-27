// // userModel.js
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const JWT = require('jsonwebtoken');
// const validator = require('validator');
// const secretKey = 'naresh';
// //require('dotenv').config();

// const userSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: [true, "Name Is Require"],
//     },
//     lastName: {
//         type: String,
//     },
//     email: {
//         type: String,
//         required: [true, " Email is Require"],
//         unique: true,
//         validate: validator.isEmail,
//     },
//     password: {
//         type: String,
//         required: [true, "password is require"],
//         minlength: [6, "Password length should be greater than 6 character"],
//         select: true,
//     },
//     location: {
//         type: String,
//         default: "India",
//     },
//     role: {
//         type: String,
//         default: "employer"
//     }
// }, { timestamps: true });

// const User = mongoose.model("User", userSchema);
// module.exports = User;

// employerModel.js
const mongoose = require('mongoose');
const User = require('./usermodel');

// Set the default role to "employer" for employer documents
User.schema.path('userType').default('employer');

module.exports = mongoose.model("employee_And _employer", User.schema); // Use the same schema for employer model
