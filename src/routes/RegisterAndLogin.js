// routes.js
const { registerEmployee } = require('../controller/employeeRegisterController');
const { registerEmployer } = require('../controller/employerRegisterController');
const { login } = require('../controller/LoginController');
//const {registerJobSeeker} = require('../controller/jobSeekerController');
//const create= require('../controller/createJob');

const routes = [
  {
    method: 'POST',
    path: '/register/employee',
    handler: registerEmployee
  },
  {
    method: 'POST',
    path: '/register/employer',
    handler: registerEmployer
  },
  {
    method: 'POST',
    path: '/login',
    handler: login
  }
];

module.exports = routes;
