const JWT = require("jsonwebtoken");
const secretkey = 'naresh';
const User = require('../models/usermodel');
//const JobSeeker = require('../models/jobSeekerModel');

const userAuth = async (request, h) => {
    try {
        const authHeader = request.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer")) {
            return h.response({ error: 'Invalid Auth' }).code(401);;
        }

        const token = authHeader.split(" ")[1];
        const payload = JWT.verify(token, secretkey);

        // Ensure that payload contains the necessary fields (userId and role)
        if (!payload || !payload.userId || !payload.userType) {
            return h.response({ error: 'Invalid Token Payload' }).code(401);
        }

        // Check if the user exists in the User collection
        let user = await User.findOne({ userId: payload.userId });
        if (user) {
            // Attach user credentials to the request object
            request.user = { userId: payload.userId, userType: payload.userType };
            return h.continue;
        }
        return h.response({ error: 'User not found' }).code(404);
    } catch (error) {
        console.error(error);
        return h.response({ error: 'Invalid Token Payload' }).code(401);
    }
};

module.exports = userAuth;