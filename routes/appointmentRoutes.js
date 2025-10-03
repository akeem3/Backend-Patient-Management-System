const express = require("express");
const router = express.Router();
const {
  getAppointments,
  createAppointment,
} = require("../controllers/appointmentController");

//createAppointment
router.post("/", createAppointment);

//get appointments
router.get("/", getAppointments);

module.exports = router;
