import express from "express";
import pkg from "pg";
import cors from "cors";

const { Pool } = pkg;

const app = express();
app.use(cors());
app.use(express.json());

// ===============================
// CONEXIÓN A POSTGRESQL (SUPABASE)
// ===============================
const db = new Pool({
  connectionString: process.env.DATABASE_URL
});
// TEST DE CONEXIÓN (MUY IMPORTANTE)
db.connect()
  .then(() => console.log("✅ Conectado a PostgreSQL"))
  .catch(err => console.error("❌ Error de conexión:", err));

// ===============================
// OBTENER TODOS LOS TURNOS
// ===============================
app.get("/turnos", async (req, res) => {
  try {
    const result = await db.query(`
      SELECT 
        id,
        nombre,
        apellido,
        obra_social,
        TO_CHAR(fecha, 'YYYY-MM-DD') as fecha,
        hora
      FROM turnos
    `);

    res.json(result.rows);
  } catch (err) {
    console.error("ERROR GET /turnos:", err);
    res.status(500).json(err);
  }
});

// ===============================
// CREAR NUEVO TURNO
// ===============================
app.post("/turnos", async (req, res) => {
  const { nombre, apellido, obra_social, fecha, hora } = req.body;

  try {
    const result = await db.query(
      `INSERT INTO turnos (nombre, apellido, obra_social, fecha, hora)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [nombre, apellido, obra_social, fecha, hora]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error("ERROR POST /turnos:", err);
    res.status(500).json(err);
  }
});

// ===============================
// DEBUG
// ===============================
app.get("/debug-turnos", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM turnos");
    res.json(result.rows);
  } catch (err) {
    console.error("ERROR DEBUG:", err);
    res.status(500).json(err);
  }
});

// ===============================
// INICIO SERVIDOR
// ===============================
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});