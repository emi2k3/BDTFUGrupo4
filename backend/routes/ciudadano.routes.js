const express = require("express");
const router = express.Router();
const pool = require("../database/db");
const { validationResult } = require("express-validator");
const { ciudadanoSchema, idSchema } = require("../schemas/ciudadano.schema");

router.post("/", ciudadanoSchema, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const {
    ci,
    primer_nombre,
    segundo_nombre,
    primer_apellido,
    segundo_apellido,
    mayor_edad,
    id_credencial,
  } = req.body;

  try {
    const result = await pool.query(
      `
      INSERT INTO ciudadanos (
        ci, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, mayor_edad, id_credencial
      ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;
      `,
      [
        ci,
        primer_nombre,
        segundo_nombre,
        primer_apellido,
        segundo_apellido,
        mayor_edad,
        id_credencial,
      ]
    );

    res.status(201).json({
      message: "Ciudadano creado correctamente.",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM ciudadanos;");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", idSchema, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM ciudadanos WHERE id = $1;", [
      id,
    ]);

    if (result.rows.length === 0)
      return res.status(404).json({ message: "Ciudadano no encontrado." });

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", [...idSchema, ...ciudadanoSchema], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { id } = req.params;
  const {
    ci,
    primer_nombre,
    segundo_nombre,
    primer_apellido,
    segundo_apellido,
    mayor_edad,
    id_credencial,
  } = req.body;

  try {
    const result = await pool.query(
      `
      UPDATE ciudadanos SET
        ci = $1,
        primer_nombre = $2,
        segundo_nombre = $3,
        primer_apellido = $4,
        segundo_apellido = $5,
        mayor_edad = $6,
        id_credencial = $7
      WHERE id = $8 RETURNING *;
      `,
      [
        ci,
        primer_nombre,
        segundo_nombre,
        primer_apellido,
        segundo_apellido,
        mayor_edad,
        id_credencial,
        id,
      ]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ message: "Ciudadano no encontrado." });

    res.json({
      message: "Ciudadano actualizado correctamente.",
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
      "DELETE FROM ciudadanos WHERE id = $1 RETURNING *;",
      [id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ message: "Ciudadano no encontrado." });

    res.json({
      message: "Ciudadano eliminado correctamente.",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
