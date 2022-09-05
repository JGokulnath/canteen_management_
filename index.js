const express = require("express");
const cors = require("cors");
const mongoConnect = require("./utils/database").mongoConnect;
const adminRoutes = require("./routes/index");
const app = express();
const path = require("path");
var corsOption = {
  origin: "http://localhost:8081",
};
//Basic setup
app.use(express.static(path.join(__dirname, "build")));
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes

app.use("/api", adminRoutes);
app.use("*", (req, res, next) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
mongoConnect(() => {
  app.listen(8080);
});
