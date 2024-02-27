const User = require('../models/usermodel');
const JobApplication = require('../models/JobApplication');

const getAllUsers = async () => {
    try {
        const users = await User.find({});
        const usersWithoutPassword = users.map(user => {
            const { password, ...userWithoutPassword } = user.toObject();
            return userWithoutPassword;
        });
        return usersWithoutPassword;
    } catch (error) {
        throw error;
    }
};
const getAllUsersByType = async (userType) => {
    try {
        const users = await User.find({ userType });
        return users;
    } catch (error) {
        throw error;
    }
};
const getUserById = async (userId) => {
    try {
        const user = await User.findOne({ userId });
        return user;
    } catch (error) {
        throw error;
    }
}
const updateUserById = async (userId, updateData) => {
    try {
        const updatedUser = await User.findOneAndUpdate({ userId }, updateData, { new: true });
        return updatedUser;
    } catch (error) {
        throw error;
    }
};
const deleteUserById = async (userId) => {
    try {
        const user = await User.deleteOne({ userId });
        return user;
    } catch (error) {
        throw error;
    }
}; const applyForJob = async (jobId, userId) => {
    try {
        const application = await JobApplication.create({
            jobId,
            userId
        });
        return application;
    } catch (error) {
        throw error;
    }
};
async function searchEmployeesBySkills(skills) {
    return await User.find({ candSkills: { $in: skills } });
}

module.exports = {
    getAllUsers,
    getAllUsersByType,
    getUserById,
    updateUserById,
    deleteUserById,
    applyForJob,
    searchEmployeesBySkills
};
