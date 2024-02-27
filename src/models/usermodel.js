// // userModel.js
// const mongoose = require('mongoose');
// const validator = require('validator');
// const { v4: uuidv4 } = require('uuid');

// const userSchema = new mongoose.Schema({
    
//     userId: { // Add userId field for UUID
//         type: String,
//         default: uuidv4, // Generate UUID as default value
//         unique: true, // Ensure userId is unique
//     },
//     name: {
//         type: String,
//         required: [true, "Name is required"],
//     },
//     lastName: {
//         type: String,
//     },
//     email: {
//         type: String,
//         required: [true, "Email is required"],
//         unique: true,
//         validate: validator.isEmail,
//     },
//     password: {
//         type: String,
//         required: [true, "Password is required"],
//         minlength: [6, "Password length should be greater than 6 characters"],
//         select: true,
//     },
//     location: {
//         type: String,
//         default: "India",
//     },
//     company:{
//         type:String,

//     },
//     role: {
//         type: String,
//         enum: ["employer", "employee"], // Enum for possible roles
//     }
// }, { timestamps: true });

// module.exports = mongoose.model("User", userSchema);


//================================================================================

// Import required modules.
const mongoose = require('mongoose');
const validator = require('validator');
const { v4: uuidv4 } = require('uuid');
const Schema = mongoose.Schema;

// create the Schema
const userSchema = new Schema({
    userId: { // Add userId field for UUID
        type: String,
        default: uuidv4, // Generate UUID as default value
        unique: true, // Ensure userId is unique
    },
    userType:{
        type: String,
        enum: ["employer", "employee"], // Enum for possible roles
    },
    fName: {
        type: String,
        required: true
    },
    lName: {
        type: String,

    },
        emailId: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            validate: validator.isEmail,
          },
          password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password length should be greater than 6 characters"],
            select: true,
        },
    phoneNumber: {
        type: Number,
        required: true
    },
    companyName: {
        type: String
    },
    companyDesc: {
        type: String
    },
    companyId: {
        type: String
    },
    companyAdd: {
        type: String
    },
    candQualif: {
        type: String
    },
    gender: {
        type: String
    },
    candDob: {
        type: String
    },
    candExp: {
        type: Number
    },
    candSkills: {
        type: Array
    },
    candExpDesc: {
        type: String
    },
    candCompany: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    country: {
        type: String
    },
    
}, { timestamps: true });

// we need to create a model for using schema
const User = mongoose.model('employee_And _employer', userSchema);

// make this available to our user(employee/employer) in our Node applications
module.exports = User;
