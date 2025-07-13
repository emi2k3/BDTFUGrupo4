const express = require("express");
const router = express.Router();
const pool = require("../database/db");
const { validationResult } = require("express-validator");
const { circuitoSchema, idSchema } = require("../schemas/circuito.schema");

router.post("/", circuitoSchema, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { accesible, numero, id_establecimiento, id_mesa } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO circuitos (accesible, numero, id_establecimiento, id_mesa)
       VALUES ($1, $2, $3, $4) RETURNING *;`,
      [accesible, numero, id_establecimiento, id_mesa]
    );

    res.status(201).json({
      message: "Circuito creado correctamente.",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/", async (_req, res) => {
  try {
    const result = await pool.query(`SELECT 
      c.id,
      c.accesible,
      c.numero,
      m.numero_identificacion AS numero_mesa,
      m.abierta AS estado_mesa,
      e.nombre AS nombre_establecimiento
FROM 
    circuitos c
JOIN 
    mesas m ON c.id_mesa = m.id
JOIN 
    establecimientos e ON c.id_establecimiento = e.id;`);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", idSchema, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("SELECT * FROM circuitos WHERE id = $1;", [
      id,
    ]);
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Circuito no encontrado." });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", [...idSchema, ...circuitoSchema], async (req, res) => {
  const { id } = req.params;
  const { accesible, numero, id_establecimiento, id_mesa } = req.body;

  try {
    const result = await pool.query(
      `UPDATE circuitos SET accesible = $1, numero = $2, id_establecimiento = $3, id_mesa = $4
       WHERE id = $5 RETURNING *;`,
      [accesible, numero, id_establecimiento, id_mesa, id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ message: "Circuito no encontrado." });

    res.json({
      message: "Circuito actualizado correctamente.",
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
      "DELETE FROM circuitos WHERE id = $1 RETURNING *;",
      [id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Circuito no encontrado." });
    res.json({
      message: "Circuito eliminado correctamente.",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
