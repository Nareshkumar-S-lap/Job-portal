// authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
// const Employee = require('../models/employee');
// const Employer = require('../models/employer');
const User = require('../models/usermodel');
//const JobSeeker = require('../models/jobSeekerModel');

const secret = 'naresh';

const generateToken = (userId, userType) => {
    return jwt.sign({ userId, userType }, secret, {
        expiresIn: '9d'
    });
};
// const generateToken1 = (userId, role) => {
//     return jwt.sign({ userId, role }, secret, {
//         expiresIn: '9d'
//     });
// };
// user.password = undefined;

exports.login = async (request, h) => {
    try {
        const { emailId, password } = request.payload;

        // Find the user by email
        const user = await User.findOne({ emailId });

        if (!user) {
            return h.response({ error: 'Invalid credentials' }).code(401);
        }

        // Check if the password is correct
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return h.response({ error: 'Invalid credentials' }).code(401);
        }

        user.password = undefined;
        // Generate token based on user role
        const token = generateToken(user.userId, user.userType);
        
        let responseData;
        if (user.userType === 'employee') {
            responseData = { status: 'success', userType: 'employee', token, user };
        } else if (user.userType === 'employer') {
            responseData = { status: 'success', userType: 'employer', token, user };
        } else {
            return h.response({ error: 'Invalid role' }).code(401);
        } 

        return responseData;
    } catch (error) {
        console.error('Error logging in:', error);
        return h.response({ error: 'Internal Server Error' }).code(500);
    }
};

// exports.login = async (request, h) => {
//     try {
//         const { email, password } = request.payload;

//         // Find the user by email
//         const user = await User.findOne({ email });

//         // Find job seeker by email
//         const jobSeeker = await JobSeeker.findOne({ email });

//         if (!user && !jobSeeker) {
//             return h.response({ error: 'Invalid credentials' }).code(401);
//         }

//         // Check if the password is correct
//         const isValidPassword = user ? await bcrypt.compare(password, user.password) : await bcrypt.compare(password, jobSeeker.password);

//         if (!isValidPassword) {
//             return h.response({ error: 'Invalid credentials' }).code(401);
//         }

//         // Generate token based on user role
//         let responseData;
//         if (user) {
//             user.password = undefined;
//             const token = generateToken(user.userId, user.userType);
//             responseData = { status: 'success', role: user.userType, token, user };
//         } else if (jobSeeker) {
//             jobSeeker.password = undefined;
//             const token = generateToken1(jobSeeker.userId, jobSeeker.role);
//             responseData = { status: 'success', role:jobSeeker.role, token, jobSeeker };
//         } else {
//             return h.response({ error: 'Invalid role' }).code(401);
//         }

//         return responseData;
//     } catch (error) {
//         console.error('Error logging in:', error);
//         return h.response({ error: 'Internal Server Error' }).code(500);
//     }
// };