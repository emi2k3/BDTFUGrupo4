const express = require("express");
const router = express.Router();
const pool = require("../database/db");
const { validationResult } = require("express-validator");
const { zonaSchema, idSchema } = require("../schemas/zona.schema");

router.post("/", zonaSchema, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { nombre } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO zonas (nombre) VALUES ($1) RETURNING *;",
      [nombre]
    );
    res.status(201).json({ message: "Zona creada.", data: result.rows[0] });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/", async (_req, res) => {
  try {
    const result = await pool.query("SELECT * FROM zonas;");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", idSchema, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("SELECT * FROM zonas WHERE id = $1;", [id]);
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Zona no encontrada." });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", [...idSchema, ...zonaSchema], async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;

  try {
    const result = await pool.query(
      "UPDATE zonas SET nombre = $1 WHERE id = $2 RETURNING *;",
      [nombre, id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Zona no encontrada." });
    res.json({ message: "Zona actualizada.", data: result.rows[0] });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", idSchema, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM zonas WHERE id = $1 RETURNING *;",
      [id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Zona no encontrada." });
    res.json({ message: "Zona eliminada.", data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
