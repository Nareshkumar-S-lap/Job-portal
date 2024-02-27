const User = require('../models/usermodel');
const JobApplication = require('../models/JobApplication');
const userService = require('../services/UserService');
const getAllUser = async (request, h) => {
    try {
        const users = await userService.getAllUsers();
        if (users.length === 0) {
            return h.response({ error: 'No users found' }).code(404);
        }
        console.log("Get all user");
        return { success: true, body: users };
    } catch (error) {
        console.error("Error in getting all users:", error);
        return h.response(error).code(500);
    }
};



const getAllUserType = async (request, h) => {
    try {
        const { userType } = request.query;
        if (!userType) {
            return h.response({ error: 'User type parameter is missing' }).code(400);
        }

        const users = await userService.getAllUsersByType(userType);
        if (users.length === 0) {
            return h.response({ error: `No users found for the specified type '${userType}'` }).code(404);
        }

        const usersWithoutPassword = users.map(user => {
            const { password, ...userWithoutPassword } = user.toObject();
            return userWithoutPassword;
        });

        return { success: true, body: usersWithoutPassword };
    } catch (error) {
        console.error("Error in getting users by type:", error);
        return h.response(error).code(500);
    }
};

const getUser = async (request, h) => {
    try {
        const { id } = request.query;
        if (!id) {
            return h.response({ error: 'User ID parameter is missing' }).code(400);
        }

        const user = await userService.getUserById(id);
        if (!user) {
            return h.response({ error: 'User not found' }).code(404);
        }

        return { success: true, body: user };
    } catch (error) {
        console.error("Error in getting user by ID:", error);
        return h.response(error).code(500);
    }
};

const updateUser = async (request, h) => {
    try {
        const { id } = request.query;
        if (!id) {
            return h.response({ error: 'User ID is required' }).code(400);
        }

        const updateData = {
            "fName": request.payload.fName,
            "lName": request.payload.lName,
            "emailId": request.payload.emailId,
            "password": request.payload.password,
            "phoneNumber": request.payload.phoneNumber,
            "gender": request.payload.gender,
            "companyName": request.payload.orgName,
            "companyDesc": request.payload.orgDesc,
            "companyId": request.payload.companyId,
            "companyAdd": request.payload.companyAdd,
            "candQualif": request.payload.candQualif,
            "candDob": request.payload.candDob,
            "candExp": request.payload.candExp,
            "candSkills": request.payload.candSkills,
            "candExpDesc": request.payload.candExpDesc,
            "candCompany": request.payload.candCompany,
            "city": request.payload.city,
            "state": request.payload.state,
            "country": request.payload.country
        };

        const updatedUser = await userService.updateUserById(id, updateData);
        if (!updatedUser) {
            return h.response({ error: 'User not found' }).code(404);
        }

        console.log("User updated successfully");
        return { success: true, message: 'Successfully updated user.', body: updatedUser };
    } catch (error) {
        console.error("Error in updating user:", error);
        return h.response(error).code(500);
    }
};

// Delete user by userId
const deleteUser = async (request, h) => {
    try {
        const { id } = request.query;
        if (!id) {
            return h.response({ error: 'User ID is required' }).code(400);
        }

        const user = await userService.deleteUserById(id);

        if (user.deletedCount === 0) {
            return h.response({ error: 'User not found' }).code(404);
        }

        console.log("User deleted successfully");
        return { success: true, message: 'User successfully deleted.', body: user };
    } catch (error) {
        console.error("Error in deleting user:", error);
        return h.response(error).code(500);
    }
};

const applyForJob = async (request, h) => {
    try {
        const { jobId } = request.query;
        const { userId } = request.user;

        if (!jobId) {
            return h.response({ error: 'Job ID is required' }).code(400);
        }

        const application = await userService.applyForJob(jobId, userId);

        return {
            success: true,
            message: "Thank you! Your application has been successfully submitted. We will contact you very soon!",
            application
        };
    } catch (error) {
        console.error('Error applying for job:', error);
        return h.response({ error: 'Internal Server Error' }).code(500);
    }
};

module.exports = {
    getAllUser,
    getAllUserType,
    getUser,
    updateUser,
    deleteUser,
    applyForJob
};