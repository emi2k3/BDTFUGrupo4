const express = require("express");
const router = express.Router();
const pool = require("../database/db");
const { validationResult } = require("express-validator");
const { direccionSchema, idSchema } = require("../schemas/direccion.schema");

router.post("/", direccionSchema, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { calle, numero, id_departamento, id_localidad, id_zona } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO direcciones (calle, numero, id_departamento, id_localidad, id_zona) VALUES ($1, $2, $3, $4, $5) RETURNING *;",
      [calle, numero, id_departamento, id_localidad, id_zona]
    );
    res
      .status(201)
      .json({ message: "Dirección creada.", data: result.rows[0] });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/", async (_req, res) => {
  try {
    const result = await pool.query("SELECT * FROM direcciones;");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", idSchema, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM direcciones WHERE id = $1;",
      [id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Dirección no encontrada." });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", [...idSchema, ...direccionSchema], async (req, res) => {
  const { id } = req.params;
  const { calle, numero, id_departamento, id_localidad, id_zona } = req.body;

  try {
    const result = await pool.query(
      "UPDATE direcciones SET calle = $1, numero = $2, id_departamento = $3, id_localidad = $4, id_zona = $5 WHERE id = $6 RETURNING *;",
      [calle, numero, id_departamento, id_localidad, id_zona, id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Dirección no encontrada." });
    res.json({ message: "Dirección actualizada.", data: result.rows[0] });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", idSchema, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM direcciones WHERE id = $1 RETURNING *;",
      [id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Dirección no encontrada." });
    res.json({ message: "Dirección eliminada.", data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
