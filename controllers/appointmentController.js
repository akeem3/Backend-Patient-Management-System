const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { redis } = require("../utils/redis");

//create appointments
async function createAppointment(req, res) {
  try {
    const { title, date } = req.body;
    const appointment = await prisma.appointment.create({
      data: { title, date: new Date(date) },
    });
    return res.status(201).json(appointment);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

async function getAppointments(req, res) {
  try {
    //Extract query params
    const { cursur, limit = 10 } = req.query; // cursor = last seen appointment ID, limit = number of results
    const cacheKey = `appointments: ${cursur || 0}:${limit}`; // unique cache key for this query

    //check if data exists in redis
    const cached = await redis.get(cacheKey);
    // If cache hit, return cached data (fast response, no DB hit)
    if (cached) return res.json(JSON.parse(cached));

    //convert limit to int
    const take = parseInt(limit) || 10;

    //query database with prisma
    const appointments = await prisma.appointment.findMany({
      take,

      skip: cursur ? 1 : 0,

      ...(cursur && { cursor: { id: parseInt(cursur) } }),

      where: { date: { gte: new Date() } },

      orderBy: { date: "asc" },
    });

    await redis, set(cacheKey, JSON.stringify(appointments), "EX", 30);

    //retrun fresh results from db
    return res.json(appointments);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = { getAppointments, createAppointment };
