// employeeController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const Employee = require('../models/employee');

const secretKey = 'naresh';

const generateToken = (userId, userType) => {
  return jwt.sign({ userId, userType }, secretKey, { expiresIn: '9d' });
};

exports.registerEmployee = async (request, h) => {
  try {
    const { fName, emailId, password, phoneNumber, city, candQualif, gender,candSkills } = request.payload;

    // Validation
    if (!validator.isEmail(emailId)) {
      return h.response({ status: 'fail', message: 'Invalid email format' }).code(400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userType = 'employee';
    const employee = await Employee.create({
      fName,
      emailId,
      password: hashedPassword,
      phoneNumber,
      city,
      gender,
      candQualif,
      candSkills,
      userType

    });

    const token = generateToken(employee.userId, employee.userType);
    return h.response({ status: 'success', token }).code(201);
  } catch (error) {
    console.error(error);
    return h.response({ status: 'error', message: 'Internal server error' }).code(500);
  }
};