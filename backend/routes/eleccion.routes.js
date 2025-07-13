const express = require("express");
const router = express.Router();
const pool = require("../database/db");
const { validationResult } = require("express-validator");
const { eleccionSchema, idSchema } = require("../schemas/eleccion.schema");

// Crear
router.post("/", eleccionSchema, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { fecha, tipo } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO elecciones (fecha, tipo) VALUES ($1, $2) RETURNING *;",
      [fecha, tipo]
    );
    res.status(201).json({ message: "Elección creada.", data: result.rows[0] });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Obtener todas
router.get("/", async (_req, res) => {
  try {
    const result = await pool.query("SELECT * FROM elecciones;");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener una por ID
router.get("/:id", idSchema, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM elecciones WHERE id = $1;", [
      id,
    ]);
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Elección no encontrada." });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Editar
router.put("/:id", [...idSchema, ...eleccionSchema], async (req, res) => {
  const { id } = req.params;
  const { fecha, tipo } = req.body;

  try {
    const result = await pool.query(
      "UPDATE elecciones SET fecha = $1, tipo = $2 WHERE id = $3 RETURNING *;",
      [fecha, tipo, id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Elección no encontrada." });
    res.json({ message: "Elección actualizada.", data: result.rows[0] });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Eliminar
router.delete("/:id", idSchema, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM elecciones WHERE id = $1 RETURNING *;",
      [id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Elección no encontrada." });
    res.json({ message: "Elección eliminada.", data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
