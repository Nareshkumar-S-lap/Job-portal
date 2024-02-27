const mongoose = require('mongoose');
const User = require('./usermodel');

// Set the default role to "employee" for employee documents
User.schema.path('userType').default('employee');

module.exports = mongoose.model("employee_And _employer", User.schema); // Use the same schema for employee model
