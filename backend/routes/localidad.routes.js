const express = require("express");
const router = express.Router();
const pool = require("../database/db");
const { validationResult } = require("express-validator");
const { localidadSchema, idSchema } = require("../schemas/localidad.schema");

router.post("/", localidadSchema, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { tipo, nombre } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO localidades (tipo, nombre) VALUES ($1, $2) RETURNING *;",
      [tipo, nombre]
    );
    res
      .status(201)
      .json({ message: "Localidad creada.", data: result.rows[0] });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/", async (_req, res) => {
  try {
    const result = await pool.query("SELECT * FROM localidades;");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", idSchema, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM localidades WHERE id = $1 RETURNING *;",
      [id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Localidad no encontrada." });
    res.json({ message: "Localidad eliminada.", data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
