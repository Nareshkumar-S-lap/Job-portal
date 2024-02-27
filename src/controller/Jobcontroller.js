const Job = require('../models/Job');
const jobService = require('../services/jobService');
const User = require('../models/usermodel');
const userService = require('../services/UserService');

const testPostController = (request, h) => {
  const { name } = request.payload;
  return h.response(`Your Name Is ${name}`).code(200);
};

const postJob = async (request, h) => {
  try {
    // Check if the user is authenticated and has the role of an employer
    if (request.user.userType !== 'employer') {
      return h.response({ error: 'Only employers are allowed to create jobs' }).code(401);
    }

    const { userId } = request.user;
    const jobData = request.payload;

    const savedJob = await jobService.postJob(userId, jobData);

    return h.response({ success: true, message: 'Successfully created new job.', body: savedJob }).code(200);
  } catch (error) {
    console.error('Error creating job:', error);
    return h.response({ success: false, message: error.message || 'Internal Server Error' }).code(500);
  }
};

const getAllJobs = async (request, h) => {
  try {
    if (request.user.userType !== 'employer' && request.user.userType !== 'employee') {
      return h.response({ error: 'Only employers or employees are allowed to read jobs' }).code(401);
    }

    const jobsData = await jobService.getAllJobs(request.query);

    return { success: true, body: jobsData };
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return h.response({ error: 'Internal Server Error' }).code(500);
  }
};

const searchJobHandler = async (request, h) => {
  try {
    if (request.user.userType !== 'employer' && request.user.userType !== 'employee') {
      return h.response({ error: 'Only employers or employees are allowed to read jobs' }).code(401);
    }

    const jobs = await jobService.searchJobs(request.query);
    return h.response({ success: true, body: jobs }).code(200);
  } catch (error) {
    console.error(error);
    return h.response({ success: false, error: 'Internal server error' }).code(500);
  }
};
const updateJobHandler = async (request, h) => {
  try {
    if (request.user.userType !== 'employer') {
      return h.response({ error: 'Only employers are allowed to update jobs' }).code(401);
    }

    const jobId = request.query.jobId;
    const updateData = request.payload;

    const updatedJob = await jobService.updateJob(jobId, updateData);

    if (!updatedJob) {
      return h.response({ success: false, message: 'Job not found' }).code(404);
    }

    return h.response({ success: true, message: 'Successfully updated job.', body: updatedJob }).code(200);
  } catch (error) {
    console.error('Error updating job:', error);
    return h.response({ success: false, message: 'Internal Server Error' }).code(500);
  }
};


const deactivateJob = async (request, h) => {
  try {
    if (request.user.userType !== 'employer') {
      return h.response({ error: 'Only employers are allowed to deactivate jobs' }).code(401);
    }

    const jobId = request.query.jobId;
    const deactivatedJob = await jobService.deactivateJob(jobId);

    if (!deactivatedJob) {
      return h.response({ success: false, message: 'Job not found' }).code(404);
    }

    console.log("Job deactivated:", deactivatedJob);
    return h.response({ success: true, message: 'Job successfully deactivated.', body: deactivatedJob }).code(200);
  } catch (error) {
    console.error('Error deactivating job:', error);
    return h.response({ success: false, message: 'Internal Server Error' }).code(500);
  }
};


const activateJobHandler = async (request, h) => {
  try {
    if (request.user.userType !== 'employer') {
      return h.response({ error: 'Only employers are allowed to activate jobs' }).code(401);
    }

    const jobId = request.query.jobId;
    const activatedJob = await jobService.activateJob(jobId);

    if (!activatedJob) {
      return h.response({ success: false, message: 'Job not found' }).code(404);
    }

    console.log("Job activated:", activatedJob);
    return h.response({ success: true, message: 'Job successfully activated.', body: activatedJob }).code(200);
  } catch (error) {
    console.error('Error activating job:', error);
    return h.response({ success: false, message: 'Internal Server Error' }).code(500);
  }
};

// const validateEmployeeForHiring = async (request, h) => {
//   try {
//     if (request.user.userType !== 'employer') {
//       return h.response({ error: 'Only employers are allowed to activate jobs' }).code(401);
//     }
//     const { skills } = request.query;
//     // Search for employees with the specified skills
//     const employees = await User.find({ candSkills: { $in: skills } });

//     return h.response({ success: true, employees }).code(200);
//   } catch (error) {
//     console.error('Error searching employees by skills:', error);
//     return h.response({ success: false, message: 'Internal Server Error' }).code(500);
//   }
//   // };
// const validateEmployeeForHiring = async (request, h) => {
//   try {
//     if (request.user.userType !== 'employer') {
//       return h.response({ error: 'Only employers are allowed to deactivate jobs' }).code(401);
//     }
//     const { skills } = request.query;

//     // Search for employees with the specified skills
//     const employees = await User.find({ candSkills: { $in: skills } });
//     // Return success response with employees
//     return h.response({ success: true, employees }).code(200);
//   } catch (error) {
//     // Log the error for debugging purposes
//     console.error('Error searching employees by skills:', error);

//     // Return error response
//     return h.response({ success: false, message: 'Internal Server Error' }).code(500);
//   }
// };
async function validateEmployeeForHiring(request, h) {
  try {
      const { skills } = request.query;

      if (request.user.userType !== 'employer') {
          return h.response({ error: 'Only employers are allowed to deactivate jobs' }).code(401);
      }

      const employees = await userService.searchEmployeesBySkills(skills);
      return h.response({ success: true, employees }).code(200);
  } catch (error) {
      console.error('Error searching employees by skills:', error);
      return h.response({ success: false, message: 'Internal Server Error' }).code(500);
  }
}

module.exports = {
  testPostController,
  postJob,
  getAllJobs,
  searchJobHandler,
  updateJobHandler,
  deactivateJob,
  activateJobHandler,
  validateEmployeeForHiring

};