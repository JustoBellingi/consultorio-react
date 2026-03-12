import express from "express";
import pg from "pg"; // Asegurate de haber instalado 'pg' (npm install pg)
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ===============================
// CONEXIÓN A POSTGRESQL (SUPABASE)
// ===============================
const { Pool } = pg;

// Aquí está el truco: usamos la variable de Render
const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Cambiamos el log para saber que es Postgres
db.connect((err) => {
  if (err) {
    console.log("Error conectando a Supabase:", err);
  } else {
    console.log("¡Conectado exitosamente a Supabase!");
  }
});

// ... el resto de tus rutas (GET /turnos, POST /turnos)

// ===============================
// OBTENER TODOS LOS TURNOS
// ===============================
app.get("/turnos", (req, res) => {
  const sql = `
    SELECT 
    id,
    nombre,
    apellido,
    obra_social, -- CAMBIADO AQUÍ
    TO_CHAR(fecha, 'YYYY-MM-DD') as fecha,
    hora
    FROM turnos
  `;
  db.query(sql, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result.rows);
  });
});

// ===============================
// CREAR NUEVO TURNO
// ===============================
app.post("/turnos", (req, res) => {
  const { nombre, apellido, obra_social, fecha, hora } = req.body;

  const sql = `
    INSERT INTO turnos (nombre, apellido, "obra_social", fecha, hora)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id
  `;

  db.query(sql, [nombre, apellido, obra_social, fecha, hora], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error al guardar turno");
      return;
    }

    res.json({
      id: result.rows[0].id,
      nombre,
      apellido,
      obra_Social,
      fecha,
      hora
    });
  });
});

// ... El resto de tus rutas (PUT y DELETE) seguirían la misma lógica:
// 1. Usar $1, $2 en lugar de ?
// 2. Acceder a result.rows
// 3. Ojo con las mayúsculas en los nombres de columnas (usar "obraSocial" con comillas dobles si en la tabla está así)

// ===============================
// INICIAR SERVIDOR
// ===============================
// Render asigna un puerto automático, por eso usamos process.env.PORT
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});