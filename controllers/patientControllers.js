const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//POST Create petient
async function createPatient(req, res) {
  try {
    const { name, email, age } = req.body;
    const patient = await prisma.patient.create({
      data: { name, email, age },
    });
    return res.status(201).json(patient);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

//GET all patinets
async function getAllPatients(req, res) {
  try {
    const { search, minAge, maxAge, sort } = req.query;

    //build dynamic filters
    const filters = {};

    //Search by name or email
    if (search) {
      filters.OR = [
        ({ name: { contains: search, mode: "insensitive" } },
        { name: { contains: search, mode: "insensitive" } }),
      ];
    }

    //age filtering
    if (minAge || maxAge) {
      filters.age = {};
      if (minAge) filters.age.gte = parseInt(minAge);
      if (maxAge) filters.age.lte = parseInt(maxAge);
    }

    //sorting

    let orderBy = {};
    switch (sort) {
      case "newest":
        orderBy = { createdAt: "desc" };
        break;
      case "oldest":
        orderBy = { createdAt: "asc" };
        break;
      default:
        orderBy = { id: "asc" };
    }

    const pateints = await prisma.patient.findMany({
      where: filters,
      orderBy,
    });

    return res.json(pateints);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

//GET patients by id
async function getPatientById(req, res) {
  const id = parseInt(req.params.id);
  try {
    const patient = await prisma.patient.findUnique({
      where: { id },
    });
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }
    return res.json(patient);
  } catch (error) {
    return res.status(500).json({ error: "server error" });
  }
}

//PUT update patients
async function updatePatient(req, res) {
  const id = parseInt(req.params.id);
  try {
    const { name, email, age } = req.body;
    const updated = await prisma.patient.update({
      where: { id },
      data: { name, email, age },
    });
    return res.json(updated);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

//DELETE pateint
async function deletePatient(req, res) {
  const id = parseInt(req.params.id);
  try {
    await prisma.patient.delete({
      where: { id },
    });
    return res.json({ message: "patient deleted successfully" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

module.exports = {
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient,
};
