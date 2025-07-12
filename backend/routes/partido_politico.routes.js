const express = require("express");
const router = express.Router();
const pool = require("../database/db");
const { validationResult } = require("express-validator");
const {
  partidoSchema,
  idSchema,
} = require("../schemas/partido_politico.schema");

router.post("/", partidoSchema, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { nombre, sigla, id_presidente, id_vicepresidente, id_direccion } =
    req.body;

  try {
    const result = await pool.query(
      `INSERT INTO partidos_politicos
       (nombre, sigla, id_presidente, id_vicepresidente, id_direccion)
       VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
      [nombre, sigla, id_presidente, id_vicepresidente, id_direccion]
    );

    res
      .status(201)
      .json({ message: "Partido creado correctamente.", data: result.rows[0] });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/", async (_req, res) => {
  try {
    const result = await pool.query("SELECT * FROM partidos_politicos;");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", idSchema, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM partidos_politicos WHERE id = $1;",
      [id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ message: "Partido no encontrado." });

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", [...idSchema, ...partidoSchema], async (req, res) => {
  const { id } = req.params;
  const { nombre, sigla, id_presidente, id_vicepresidente, id_direccion } =
    req.body;

  try {
    const result = await pool.query(
      `UPDATE partidos_politicos SET
        nombre = $1,
        sigla = $2,
        id_presidente = $3,
        id_vicepresidente = $4,
        id_direccion = $5
      WHERE id = $6 RETURNING *;`,
      [nombre, sigla, id_presidente, id_vicepresidente, id_direccion, id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ message: "Partido no encontrado." });

    res.json({
      message: "Partido actualizado correctamente.",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", idSchema, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM partidos_politicos WHERE id = $1 RETURNING *;",
      [id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ message: "Partido no encontrado." });

    res.json({
      message: "Partido eliminado correctamente.",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
