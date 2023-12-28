const mongoose = require("mongoose");

const connectDatabse = () =>
  mongoose
    .connect(process.env.DB_LOCAL_URI)
    .then((con) => {
      console.log(`Mongo db is connected to the host ${con.connection.host}`);
    })
    .catch(() => {
      console.log("Database connection error");
    });

module.exports = connectDatabse;
