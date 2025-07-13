const express = require("express");
const router = express.Router();
const pool = require("../database/db");
const { validationResult } = require("express-validator");
const { candidatoSchema, idSchema } = require("../schemas/candidato.schema");

// Crear
router.post("/", candidatoSchema, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { id_ciudadano, id_partido_politico, organo, orden } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO candidatos (id_ciudadano, id_partido_politico, organo, orden)
       VALUES ($1, $2, $3, $4) RETURNING *;`,
      [id_ciudadano, id_partido_politico, organo, orden]
    );

    res.status(201).json({
      message: "Candidato creado correctamente.",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Obtener todos
router.get("/", async (_req, res) => {
  try {
    const result = await pool.query("SELECT * FROM candidatos;");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener uno por ID
router.get("/:id", idSchema, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("SELECT * FROM candidatos WHERE id = $1;", [
      id,
    ]);
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Candidato no encontrado." });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Editar
router.put("/:id", [...idSchema, ...candidatoSchema], async (req, res) => {
  const { id } = req.params;
  const { id_ciudadano, id_partido_politico, organo, orden } = req.body;

  try {
    const result = await pool.query(
      `UPDATE candidatos SET id_ciudadano = $1, id_partido_politico = $2, organo = $3, orden = $4
       WHERE id = $5 RETURNING *;`,
      [id_ciudadano, id_partido_politico, organo, orden, id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ message: "Candidato no encontrado." });

    res.json({
      message: "Candidato actualizado correctamente.",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Eliminar
router.delete("/:id", idSchema, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM candidatos WHERE id = $1 RETURNING *;",
      [id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Candidato no encontrado." });

    res.json({
      message: "Candidato eliminado correctamente.",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
