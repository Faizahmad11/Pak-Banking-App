class ApiError extends Error {
  constructor(code, msg) {
    super(msg);

    this.statusCode = code;
    this.message = msg;
    this.name = "ApiError";

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ApiError;