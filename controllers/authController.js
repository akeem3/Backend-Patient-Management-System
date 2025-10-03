const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//POST /register
async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    //check existing user
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
      return res.status(400).json({ error: "Email already exists" });
    }

    //hash password
    const hashed = await bcrypt.hash(password, 10);

    //create user
    const user = await prisma.user.create({
      data: { name, email, password: hashed },
    });
    return res.status(201).json({
      message: "user created",
      user: { id: user.id, email: user.email },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

//POST /login
async function login(req, res) {
  try {
    const { email, password } = req.body;

    //find user
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    //compare passwords
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    //Sign jwt
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({ message: "Login Successful", token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function profile(req, res) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: { id: true, name: true, email: true, createdAt: true },
    });

    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = { register, login, profile };
