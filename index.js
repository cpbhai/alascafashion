const express = require("express");
const app = express();
const path = require("path");
const logger = require("morgan");
require("dotenv").config({ path: path.join(__dirname, "/config", ".env") });
require("./config/db.Connect");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const routes = require("./routes");

app.use(logger("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "5mb" }));

app.use(require("cookie-parser")());

app.use("/", routes);

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res) => {
  res.send("<title>404 - Page Not Found</title><h1>Page Not Found</h1>");
});

app.listen(process.env.PORT, () => {
  console.log("Server running on port", process.env.PORT);
});
