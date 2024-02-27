// employerController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const Employer = require('../models/employer');

const secretKey = 'naresh';

const generateToken = (userId,userType) => {
    return jwt.sign({ userId,userType}, secretKey, { expiresIn: '9d' });
};

exports.registerEmployer = async (request, h) => {
    try {
        const { fName,emailId, password, phoneNumber,companyName, city  } = request.payload;

        // Validation
        if (!validator.isEmail(emailId)) {
            return h.response({ status: 'fail', message: 'Invalid email format' }).code(400);
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userType = 'employer';
        const employer = await Employer.create({
            fName,
            emailId,
            password: hashedPassword,
            phoneNumber,
            companyName,
            city,
            userType
        });

        const token = generateToken(employer.userId,employer.userType);
        return h.response({ status: 'success', token }).code(201);
    } catch (error) {
        console.error(error);
        return h.response({ status: 'error', message: 'Internal server error' }).code(500);
    }
};

// const generateToken = (id) => {
//     return jwt.sign({ id }, secretKey, { expiresIn: '1d' });
//   };
  
//   exports.registerEmployee = async (request, h) => {
//     try {
//       const { name, email, password, location } = request.payload;
  
//       // Validation
//       if (!validator.isEmail(email)) {
//         return h.response({ status: 'fail', message: 'Invalid email format' }).code(400);
//       }
  
//       const hashedPassword = await bcrypt.hash(password, 10);
//       const role = 'employer';
//       const employer = await Employer.create({
//         name,
//         email,
//         password: hashedPassword,
//         location,
//         role

//       });

//       const token = generateToken(employer._id);
//     return h.response({ status: 'success', token }).code(201);
//   } catch (error) {
//     console.error(error);
//     return h.response({ status: 'error', message: 'Internal server error' }).code(500);
//   }
// };