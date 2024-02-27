const JWT = require("jsonwebtoken");
const secretkey = 'naresh';
const userAuth = async (request, h) => {
  const authHeader = request.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new Error("Auth Failed");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = JWT.verify(token, secretkey);
    request.user = { userId: payload.userId,role:payload.role};
    return h.continue;
  } catch (error) {
    throw new Error("Auth Failed");
  }
};

module.exports = userAuth;
