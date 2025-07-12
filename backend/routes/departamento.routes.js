const express = require("express");
const router = express.Router();
const pool = require("../database/db");
const { validationResult } = require("express-validator");
const {
  departamentoSchema,
  idSchema,
} = require("../schemas/departamento.schema");
console.log(">> departamento.routes.js cargado");

router.post("/", departamentoSchema, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { nombre } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO departamentos (nombre) VALUES ($1) RETURNING *;",
      [nombre]
    );
    res
      .status(201)
      .json({ message: "Departamento creado.", data: result.rows[0] });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/", async (_req, res) => {
  try {
    const result = await pool.query("SELECT * FROM departamentos;");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", idSchema, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM departamentos WHERE id = $1;",
      [id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Departamento no encontrado." });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", [...idSchema, ...departamentoSchema], async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;

  try {
    const result = await pool.query(
      "UPDATE departamentos SET nombre = $1 WHERE id = $2 RETURNING *;",
      [nombre, id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Departamento no encontrado." });
    res.json({ message: "Departamento actualizado.", data: result.rows[0] });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", idSchema, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM departamentos WHERE id = $1 RETURNING *;",
      [id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Departamento no encontrado." });
    res.json({ message: "Departamento eliminado.", data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
