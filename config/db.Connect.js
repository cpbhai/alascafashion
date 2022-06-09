const mongoose = require("mongoose");

mongoose.connect(process.env.CONNECTION_STRING, (err) => {
  if (err) throw err;
  console.log("MongoDB Connected");
});
