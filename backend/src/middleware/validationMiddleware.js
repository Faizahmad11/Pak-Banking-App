const { validationResult } = require("express-validator");
const ApiError = require("../utils/ApiError");

const ValidationMiddleware = (req, res, next) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return next(new ApiError(400, result.array()[0].msg));
  }

  next();
};

module.exports = ValidationMiddleware;