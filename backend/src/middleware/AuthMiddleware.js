const ApiError = require("../utils/ApiError");
const JwtService = require("../utils/JwtService");

const AuthMiddleware = (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
      throw new ApiError(401, "Please login first");
    }

    const token = header.split(" ")[1];

   const decoded = JwtService.validateToken(token);

console.log("TOKEN DATA:", decoded);

req.user = decoded;

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = AuthMiddleware;