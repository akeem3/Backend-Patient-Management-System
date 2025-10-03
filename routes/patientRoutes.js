const express = require("express");
const router = express.Router();

const {
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient,
} = require("../controllers/patientControllers");

//POST create patient
router.post("/", createPatient);

//get all patients
router.get("/", getAllPatients);

//GET patient by id
router.get("/:id", getPatientById);

//PUT update patient
router.put("/:id", updatePatient);

//DELETE delete patient
router.delete("/:id", deletePatient);

module.exports = router;
