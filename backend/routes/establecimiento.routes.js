const express = require("express");
const router = express.Router();
const pool = require("../database/db");
const { validationResult } = require("express-validator");
const {
  establecimientoSchema,
  idSchema,
} = require("../schemas/establecimiento.schema");

router.post("/", establecimientoSchema, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { nombre, tipo, id_direccion } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO establecimientos (nombre, tipo, id_direccion)
       VALUES ($1, $2, $3) RETURNING *;`,
      [nombre, tipo, id_direccion]
    );

    res.status(201).json({
      message: "Establecimiento creado correctamente.",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/", async (_req, res) => {
  try {
    const result = await pool.query("SELECT * FROM establecimientos;");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", idSchema, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM establecimientos WHERE id = $1;",
      [id]
    );
    if (result.rows.length === 0)
      return res
        .status(404)
        .json({ message: "Establecimiento no encontrado." });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put(
  "/:id",
  [...idSchema, ...establecimientoSchema],
  async (req, res) => {
    const { id } = req.params;
    const { nombre, tipo, id_direccion } = req.body;

    try {
      const result = await pool.query(
        `UPDATE establecimientos SET nombre = $1, tipo = $2, id_direccion = $3
       WHERE id = $4 RETURNING *;`,
        [nombre, tipo, id_direccion, id]
      );

      if (result.rows.length === 0)
        return res
          .status(404)
          .json({ message: "Establecimiento no encontrado." });

      res.json({
        message: "Establecimiento actualizado correctamente.",
        data: result.rows[0],
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

router.delete("/:id", idSchema, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM establecimientos WHERE id = $1 RETURNING *;",
      [id]
    );
    if (result.rows.length === 0)
      return res
        .status(404)
        .json({ message: "Establecimiento no encontrado." });

    res.json({
      message: "Establecimiento eliminado correctamente.",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
