const AuthService = require("../service/AuthService");
const ApiError = require("../utils/ApiError");

class AuthController {

  static async loginUser(req, res, next) {
    try {
      console.log("EMAIL:", req.body.email);

      const result = await AuthService.loginUser(req.body);

      console.log("LOGIN RESULT:", result);

      res.status(200).json(result);

    } catch (err) {
  console.error("LOGIN ERROR:");
  console.error(err);

  res.status(500).json({
    success: false,
    message: err.message,
    stack: err.stack
  });
}
  }

  static async registerUser(req, res, next) {
    try {
      const result = await AuthService.registerUser(req.body);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async profileUser(req, res, next) {
  try {
    const userId = req.user._id;

    const res_obj = await AuthService.profileUser(userId);
    

    res.status(200).json({
      success: true,
      data: res_obj,
    });
  } catch (error) {
    next(error);
  }
}
}

module.exports = AuthController;