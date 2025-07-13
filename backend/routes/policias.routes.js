const express = require("express");
const router = express.Router();
const pool = require("../database/db");
const { validationResult } = require("express-validator");
const { policiaSchema, idSchema } = require("../schemas/policia.schema");

// Crear
router.post("/", policiaSchema, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { id_ciudadano, id_comisaria } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO policias (id_ciudadano, id_comisaria)
       VALUES ($1, $2) RETURNING *;`,
      [id_ciudadano, id_comisaria]
    );
    res
      .status(201)
      .json({ message: "Policía creado correctamente.", data: result.rows[0] });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Obtener todos
router.get("/", async (_req, res) => {
  try {
    const result = await pool.query("SELECT * FROM policias;");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener uno por ID
router.get("/:id", idSchema, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM policias WHERE id = $1;", [
      id,
    ]);
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Policía no encontrado." });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Editar
router.put("/:id", [...idSchema, ...policiaSchema], async (req, res) => {
  const { id } = req.params;
  const { id_ciudadano, id_comisaria } = req.body;

  try {
    const result = await pool.query(
      `UPDATE policias SET id_ciudadano = $1, id_comisaria = $2
       WHERE id = $3 RETURNING *;`,
      [id_ciudadano, id_comisaria, id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ message: "Policía no encontrado." });

    res.json({
      message: "Policía actualizado correctamente.",
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
      "DELETE FROM policias WHERE id = $1 RETURNING *;",
      [id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Policía no encontrado." });

    res.json({
      message: "Policía eliminado correctamente.",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
