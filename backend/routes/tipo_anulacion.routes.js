const express = require("express");
const router = express.Router();
const pool = require("../database/db");
const { validationResult } = require("express-validator");
const {
  tipoAnulacionSchema,
  idSchema,
} = require("../schemas/tipo_anulacion.schema");

router.post("/", tipoAnulacionSchema, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { nombre, descripcion } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO tipo_anulacion (nombre, descripcion) VALUES ($1, $2) RETURNING *;`,
      [nombre, descripcion]
    );
    res
      .status(201)
      .json({ message: "Tipo de anulación creado.", data: result.rows[0] });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/", async (_req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tipo_anulacion;");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", idSchema, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM tipo_anulacion WHERE id = $1;",
      [req.params.id]
    );
    if (result.rows.length === 0)
      return res
        .status(404)
        .json({ message: "No se encontró el tipo de anulación." });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", [...idSchema, ...tipoAnulacionSchema], async (req, res) => {
  const { nombre, descripcion } = req.body;

  try {
    const result = await pool.query(
      `UPDATE tipo_anulacion SET nombre = $1, descripcion = $2 WHERE id = $3 RETURNING *;`,
      [nombre, descripcion, req.params.id]
    );
    if (result.rows.length === 0)
      return res
        .status(404)
        .json({ message: "No se encontró el tipo de anulación." });
    res.json({ message: "Actualizado correctamente.", data: result.rows[0] });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", idSchema, async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM tipo_anulacion WHERE id = $1 RETURNING *;",
      [req.params.id]
    );
    if (result.rows.length === 0)
      return res
        .status(404)
        .json({ message: "No se encontró el tipo de anulación." });
    res.json({ message: "Eliminado correctamente.", data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
