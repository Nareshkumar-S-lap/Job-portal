const JobsController = require('../controller/Jobcontroller');
const userAuth = require('../middlewares/authMiddleware');

const routes = [
  {
    method: 'POST',
    path: '/postjob',
    handler: JobsController.postJob,
    options: {
      pre: [userAuth]
    }
  },
  {
    method: 'GET',
    path: '/jobs',
    handler: JobsController.getAllJobs,
    options: {
      pre: [userAuth]
    }
  },
  {
    method: 'GET',
    path: '/search-job',
    handler: JobsController.searchJobHandler,
    options: {
      pre: [userAuth]
    }
  },
  {
    method: 'PUT',
    path: '/update-job',
    handler: JobsController.updateJobHandler,
    options: {
      pre: [userAuth]
    }
  },
  {
    method: 'DELETE',
    path: '/deactivate-job',
    handler: JobsController.deactivateJob,
    options: {
      pre: [userAuth]
    }
  },
  {
    method: 'PUT',
    path: '/activate-job',
    handler: JobsController.activateJobHandler,
    options: {
      pre: [userAuth]
    }
  },
  {
    method: 'GET',
    path: '/hiringEmployee',
    handler: JobsController.validateEmployeeForHiring,
    options: {
      pre: [userAuth]
    }
    
  },
];

module.exports = routes;
