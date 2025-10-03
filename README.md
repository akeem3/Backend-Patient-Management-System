# CareConnect-API  
A scalable and secure backend API for managing **patients, doctors, and appointments** in a healthcare system.  
Built with **Node.js, Express, Prisma, PostgreSQL, and Redis**.  

---

## ✨ Features  
✅ **Patient Management** – CRUD operations with filtering, search, and pagination  
✅ **Authentication & Authorization** – JWT-based auth with bcrypt password hashing  
✅ **Appointment Scheduling** – cursor-based pagination for millions of rows  
✅ **Performance Optimization** – database indexing + Redis caching  
✅ **Security Best Practices** – input validation, environment variables, protected routes  

---

## 🏗️ Tech Stack  
- **Backend Framework:** Node.js + Express  
- **Database:** PostgreSQL (via Prisma ORM)  
- **Authentication:** JWT, bcrypt  
- **Caching:** Redis (via ioredis)  
- **Deployment Ready:** Environment variables (`.env`) support  
- **Testing Tool:** Postman  

---

## 📂 Project Structure  
CareConnect-API/
│── prisma/ # Prisma schema & migrations
│── controllers/ # Route logic (patients, doctors, appointments, auth)
│── routes/ # Express route definitions
│── utils/ # Helpers (Redis client, middleware, etc.)
│── index.js # App entry point
│── package.json
│── README.md
│── .env.example # Environment variable template

⚙️ Installation & Setup
1. Clone the Repository
git clone https://github.com/your-username/CareConnect-API.git
cd CareConnect-API

2. Install Dependencies
npm install

3. Setup Database (Aiven PostgreSQL)

Update .env file with your connection string:

DATABASE_URL="postgresql://user:password@host:port/dbname?schema=public"
JWT_SECRET="your_jwt_secret"
REDIS_URL="redis://default:password@host:6379"

4. Run Prisma Migrations
npx prisma migrate dev --name init

5. Start the Server
npm run dev


Server runs on http://localhost:3000

🔑 API Endpoints
👥 Patients

POST /patients → Create a patient

GET /patients/:id → Get patient by ID

GET /patients?search=ali&minAge=20&maxAge=40&sort=newest → Search/filter patients

PUT /patients/:id → Update patient

DELETE /patients/:id → Delete patient

🩺 Doctors

POST /doctors → Create doctor

GET /doctors/:id/patients?page=1&limit=10 → Get doctor’s patients with pagination

📅 Appointments

POST /appointments → Create appointment

GET /appointments?cursor=5&limit=10 → Get paginated appointments (cursor-based)

🔐 Auth

POST /signup → Register new user

POST /login → Login + receive JWT

GET /profile → Protected route (JWT required)

📊 Example Request
Create Patient
POST /patients
Content-Type: application/json

{
  "name": "Alice Example",
  "email": "alice@example.com",
  "age": 28
}

Response
{
  "id": 1,
  "name": "Alice Example",
  "email": "alice@example.com",
  "age": 28,
  "createdAt": "2025-09-28T15:00:00.000Z"
}

🚀 Scalability & Performance

Database Indexing: Indexed date & createdAt fields for faster queries.

Cursor-Based Pagination: Efficient retrieval of large datasets.

Redis Caching: Reduces load on DB for frequently accessed endpoints.

Async/Await Everywhere: Non-blocking requests for better performance.

🔒 Security Practices

JWT authentication with secret key stored in .env

Passwords hashed with bcrypt

Input validation (e.g., Zod or middleware)

Secrets & DB credentials excluded from source control

👨‍💻 Author

Abdul-Hakeem Hassan

🎓 BSc in Software Engineering

🎓 MSc in Project Management

🌍 Experience working with cross-cultural, international teams

💡 Passionate about healthcare, innovation, and scalable backend systems

📌 Future Improvements

Role-based access control (Admin/Doctor/Patient)

Rate limiting & request throttling

Unit + integration tests with Jest

Dockerized deployment

