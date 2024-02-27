const Job = require('../models/Job');
const postJob = async (userId, jobData) => {
    try {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 10);

        const {
            jobTitle,
            jobDesc,
            reqExp,
            location,
            offerSalary,
            keySkills,
            desiredProf,
            companyProf
        } = jobData;

        // Check if mandatory fields are provided
        if (!jobTitle || !jobDesc || !reqExp || !location || !offerSalary || !keySkills || !desiredProf || !companyProf) {
            throw new Error('Please enter all mandatory fields.');
        }

        const newJob = new Job({
            jobPostedBy: userId,
            jobTitle,
            reqExp,
            location,
            offerSalary,
            keySkills,
            desiredProf,
            jobDesc,
            companyProf,
            application_expired_date: expirationDate,
        });

        // Attempt to save the new job
        const savedJob = await newJob.save();
        return savedJob;
    } catch (error) {
        throw error;
    }
};

const getAllJobs = async (query) => {
    try {
        // Extracting query parameters
        const { sortBy, sortOrder, keyword, page = 1 } = query;
        const limit = 3; // Default limit

        // Constructing sort query
        const sortQuery = {};
        if (sortBy && sortOrder) {
            sortQuery[sortBy] = sortOrder === 'desc' ? -1 : 1;
        } else {
            // Default sorting by createdAt in descending order
            sortQuery.createdAt = -1;
        }

        // Constructing filter query
        const filterQuery = {};
        if (keyword) {
            filterQuery.$or = [
                { title: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } }
            ];
        }

        // Calculate skip value for pagination
        const skip = (page - 1) * limit;

        // Fetch jobs based on filter, sort, and pagination
        const jobs = await Job.find(filterQuery)
            .sort(sortQuery)
            .skip(skip)
            .limit(limit);

        // Calculate total number of jobs (for pagination)
        const totalJobs = await Job.countDocuments(filterQuery);

        // Calculating total number of pages
        const totalPages = Math.ceil(totalJobs / limit);

        return {
            jobs,
            pagination: {
                totalJobs,
                totalPages,
                currentPage: page,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            }
        };
    } catch (error) {
        throw error;
    }
};


const searchJobs = async (query) => {
    try {
        let conditions = {};
        if (query.keyword) {
            conditions['$or'] = [
                { "jobTitle": new RegExp(query.keyword, "i") },
                { "jobDesc": new RegExp(query.keyword, "i") }
            ];
        }

        if (query.skill) {
            const skillKeys = query.skill.split(',');
            conditions["keySkills"] = { $all: skillKeys };
        }

        console.log("conditions", conditions);
        const jobs = await Job.find(conditions);
        return jobs;
    } catch (error) {
        throw error;
    }
};

const updateJob = async (jobId, updateData) => {
    try {
        const updatedJob = await Job.findOneAndUpdate(
            { jobId },
            {
                $set: {
                    "jobTitle": updateData.jobTitle,
                    "reqExp": updateData.reqExp,
                    "location": updateData.location,
                    "offerSalary": updateData.offerSalary,
                    "keySkills": updateData.keySkills,
                    "desiredProf": updateData.desiredProf,
                    "jobDesc": updateData.jobDesc,
                    "companyProf": updateData.companyProf,
                    "updated_at": new Date()
                }
            },
            { new: true } // Return the modified document rather than the original
        );

        return updatedJob;
    } catch (error) {
        throw error;
    }
};

const deactivateJob = async (jobId) => {
    try {
        const deactivatedJob = await Job.findOneAndUpdate(
            { jobId },
            { $set: { isActive: false } },
            { new: true }
        );

        return deactivatedJob;
    } catch (error) {
        throw error;
    }
};
const activateJob = async (jobId) => {
    try {
        const activatedJob = await Job.findOneAndUpdate(
            { jobId },
            { $set: { isActive: true } },
            { new: true }
        );

        return activatedJob;
    } catch (error) {
        throw error;
    }
};


module.exports = {
    postJob,
    getAllJobs,
    searchJobs,
    updateJob,
    deactivateJob,
    activateJob
};