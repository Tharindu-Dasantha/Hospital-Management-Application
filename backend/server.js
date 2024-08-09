const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const patientsRouter = require("./routes/patient");
const doctorsRouter = require("./routes/doctor");
const appointmentsRouter = require("./routes/appointment");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error", err));

app.use("/patients", patientsRouter);
app.use("/doctors", doctorsRouter);
app.use("/appointments", appointmentsRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
