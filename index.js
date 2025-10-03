const express = require("express");
const patientRoutes = require("./routes/patientRoutes.js");
const authRoutes = require("./routes/authRoute.js");
const appointmentRoutes = require("./routes/appointmentRoutes.js");

const app = express();
app.use(express.json());

app.use("/patients", patientRoutes);
app.use("/auth", authRoutes);
app.use("/appointments", appointmentRoutes);

//health check
app.get("/", (req, res) => {
  res.send("Api is Live...");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
