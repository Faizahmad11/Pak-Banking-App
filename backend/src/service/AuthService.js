const User = require("../models/User.models");
const bcryptjs = require("bcryptjs");
const ApiError = require("../utils/ApiError");
const JwtService = require("../utils/JwtService");
console.log("USER MODEL:", User);

class AuthService {
  static async loginUser(body) {
    const email = body.email.toLowerCase().trim();
    const password = body.password;

    const user = await User.findOne({ email });

    if (!user) throw new ApiError(404, "No Account found with this email");

    const match = await bcryptjs.compare(password, user.password);

    if (!match) throw new ApiError(401, "Invalid password");

    const token = JwtService.generateToken({
      _id: user._id,
      email: user.email
    });

    return {
      msg: "Login successful",
      token,
      user
    };
  }

  static async registerUser(body) {
    const { name, email, password, ac_type } = body;

    const cleanEmail = email.toLowerCase().trim();

   const exist = await User.findOne({ email: cleanEmail });

    if (exist) throw new ApiError(400, "Email already exists");

    const hashed = await bcryptjs.hash(password, 10);

   const user = await User.create({
  name,
  email: cleanEmail,
  password: hashed,
  ac_type
});

    const token = JwtService.generateToken({
      _id: user._id,
      email: user.email
    });

    return { msg: "Register success", token, user };
  }

  static async profileUser(userId) {
  const user = await User.findById(userId).select("-password")

    if (!user) throw new ApiError(404, "User not found");

    return user;
  }
}

module.exports = AuthService;