// const testPostController = require('../controller/Jobcontroller');
const user = require('../controller/User');
const userAuth = require('../middlewares/authMiddleware');

const routes = [
  // {
  //     method: 'POST',
  //     path: '/test-post',
  //     handler: testPostController,
  //     options: {
  //         pre: [userAuth]
  //     }
  // },
  // {
  //   method: 'POST',
  //   path: '/create',
  //   handler: testPostController.createJob,
  //   options: {
  //     pre: [userAuth]
  //   }
  // },
  // {
  //   method: 'POST',
  //   path: '/postjob',
  //   handler: testPostController.postJob,
  //   options: {
  //     pre: [userAuth]
  //   }
  // },
  {
    method: 'GET',
    path: '/getall',
    handler: user.getAllUser
  },
  {
    method: 'GET',
    path: '/users/type',
    handler: user.getAllUserType
  },
  {
    method: 'GET',
    path: '/users/id',
    handler: user.getUser
  },
  {
    method: 'PUT',
    path: '/users/update',
    handler: user.updateUser
  },
  {
    method: 'DELETE',
    path: '/users/delete',
    handler: user.deleteUser
  },
  {
    method: 'POST',
    path: '/user/apply-for-job',
    handler: user.applyForJob,
    options: {
      pre: [userAuth]
    }
  },
  // {
  //   method: 'GET',
  //   path: '/employer/job-applications',
  //   handler: user.getJobApplicationsForEmployer,
  //   options: {
  //     pre: [userAuth]
  //   }
  // }


];

module.exports = routes;
