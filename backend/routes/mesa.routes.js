const express = require("express");
const router = express.Router();
const pool = require("../database/db");
const { validationResult } = require("express-validator");
const { mesaSchema, idSchema } = require("../schemas/mesa.schema");

router.post("/", mesaSchema, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { numero_identificacion, fecha_apertura, fecha_cierre, abierta } =
    req.body;

  try {
    const result = await pool.query(
      `INSERT INTO mesas (numero_identificacion, fecha_apertura, fecha_cierre, abierta)
       VALUES ($1, $2, $3, $4) RETURNING *;`,
      [numero_identificacion, fecha_apertura, fecha_cierre, abierta]
    );

    res
      .status(201)
      .json({ message: "Mesa creada correctamente.", data: result.rows[0] });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/", async (_req, res) => {
  try {
    const result = await pool.query("SELECT * FROM mesas;");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", idSchema, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("SELECT * FROM mesas WHERE id = $1;", [id]);
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Mesa no encontrada." });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", [...idSchema, ...mesaSchema], async (req, res) => {
  const { id } = req.params;
  const { numero_identificacion, fecha_apertura, fecha_cierre, abierta } =
    req.body;

  try {
    const result = await pool.query(
      `UPDATE mesas SET numero_identificacion = $1, fecha_apertura = $2,
       fecha_cierre = $3, abierta = $4 WHERE id = $5 RETURNING *;`,
      [numero_identificacion, fecha_apertura, fecha_cierre, abierta, id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Mesa no encontrada." });

    res.json({ message: "Mesa actualizada.", data: result.rows[0] });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", idSchema, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM mesas WHERE id = $1 RETURNING *;",
      [id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Mesa no encontrada." });

    res.json({ message: "Mesa eliminada.", data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
