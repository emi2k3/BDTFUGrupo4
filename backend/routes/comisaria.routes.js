const express = require("express");
const router = express.Router();
const pool = require("../database/db");
const { validationResult } = require("express-validator");
const { comisariaSchema, idSchema } = require("../schemas/comisaria.schema");

router.post("/", comisariaSchema, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { nombre, id_direccion } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO comisarias (nombre, id_direccion) VALUES ($1, $2) RETURNING *;`,
      [nombre, id_direccion]
    );
    res.status(201).json({
      message: "Comisaría creada correctamente.",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/", async (_req, res) => {
  try {
    const result = await pool.query("SELECT * FROM comisarias;");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", idSchema, async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM comisarias WHERE id = $1;", [
      req.params.id,
    ]);
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Comisaría no encontrada." });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", [...idSchema, ...comisariaSchema], async (req, res) => {
  const { nombre, id_direccion } = req.body;

  try {
    const result = await pool.query(
      `UPDATE comisarias SET nombre = $1, id_direccion = $2 WHERE id = $3 RETURNING *;`,
      [nombre, id_direccion, req.params.id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Comisaría no encontrada." });
    res.json({ message: "Comisaría actualizada.", data: result.rows[0] });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", idSchema, async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM comisarias WHERE id = $1 RETURNING *;",
      [req.params.id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Comisaría no encontrada." });
    res.json({ message: "Comisaría eliminada.", data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
