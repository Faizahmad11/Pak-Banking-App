const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { notFoundHandler, errorHandler } = require("./middleware/404Handling");

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// routes
app.use("/api/v1", require("./router"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// 404 handler (must be second last)
app.use(notFoundHandler);

// error handler (must be last)
app.use(errorHandler);

module.exports = app;