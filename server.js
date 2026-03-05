import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();

// Permite que React (localhost:5173) pueda hablar con este backend
app.use(cors());

// Permite recibir datos JSON desde el frontend
app.use(express.json());

// ===============================
// CONEXIÓN A MYSQL
// ===============================
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Justo0406",
  database: "consultorio"
});
db.connect((err) => {
  if (err) {
    console.log("Error conectando a MySQL:", err);
  } else {
    console.log("Conectado a MySQL");
  }
});


// ===============================
// OBTENER TODOS LOS TURNOS
// ===============================
app.get("/turnos", (req, res) => {

  console.log("Alguien pidió los turnos");

  const sql = "SELECT * FROM turnos";

  db.query(sql, (err, result) => {

    if (err) {
      console.log(err);
      res.status(500).send(err);
      return;
    }

    res.json(result);

  });

});
// ===============================
// CREAR NUEVO TURNO
// ===============================
app.post("/turnos", (req, res) => {

  // Datos enviados desde React
  const { nombre, apellido, obraSocial, fecha, hora } = req.body;

  const sql = `
    INSERT INTO turnos (nombre, apellido, obraSocial, fecha, hora)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [nombre, apellido, obraSocial, fecha, hora], (err, result) => {

    if (err) {
      console.error(err);
      res.status(500).send("Error al guardar turno");
      return;
    }

    // Devolvemos el turno creado
    res.json({
      id: result.insertId,
      nombre,
      apellido,
      obraSocial,
      fecha,
      hora
    });

  });

});


// ===============================
// ELIMINAR TURNO
// ===============================
app.delete("/turnos/:id", (req, res) => {

  const { id } = req.params;

  const sql = "DELETE FROM turnos WHERE id = ?";

  db.query(sql, [id], (err, result) => {

    if (err) {
      console.error(err);
      res.status(500).send("Error al eliminar turno");
      return;
    }

    res.json({
      mensaje: "Turno eliminado correctamente"
    });

  });

});


// ===============================
// INICIAR SERVIDOR
// ===============================
app.listen(3001, () => {
  console.log("Servidor corriendo en http://localhost:3001");
});