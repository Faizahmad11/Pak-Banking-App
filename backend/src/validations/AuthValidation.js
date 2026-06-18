const { body } = require('express-validator');

class AuthValidation {

  static loginUser = [
    body("email")
      .isEmail()
      .withMessage("Invalid email format")
      .normalizeEmail(),

    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ];

  static registerUser = [
    body("name")
      .notEmpty()
      .withMessage("Name is required"),

    body("email")
      .isEmail()
      .withMessage("Invalid email format")
      .normalizeEmail(),

    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),

    body("ac_type")
      .notEmpty()
      .withMessage("Account type is required")
      .isIn(["savings", "current"])
      .withMessage("Account should be savings or current"),
  ];
}

module.exports = AuthValidation;