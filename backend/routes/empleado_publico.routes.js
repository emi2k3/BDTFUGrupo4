const express = require("express");
const router = express.Router();
const pool = require("../database/db");
const { validationResult } = require("express-validator");
const {
  empleadoSchema,
  idSchema,
} = require("../schemas/empleado_publico.schema");

// Crear
router.post("/", empleadoSchema, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { organismo, rol, fecha_nacimiento, id_mesa, id_ciudadano } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO empleados_publicos (organismo, rol, fecha_nacimiento, id_mesa, id_ciudadano)
       VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
      [organismo, rol, fecha_nacimiento, id_mesa, id_ciudadano]
    );

    res.status(201).json({
      message: "Empleado creado correctamente.",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Obtener todos
router.get("/", async (_req, res) => {
  try {
    const result = await pool.query("SELECT * FROM empleados_publicos;");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener uno por ID
router.get("/:id", idSchema, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM empleados_publicos WHERE id = $1;",
      [id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Empleado no encontrado." });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Editar
router.put("/:id", [...idSchema, ...empleadoSchema], async (req, res) => {
  const { id } = req.params;
  const { organismo, rol, fecha_nacimiento, id_mesa, id_ciudadano } = req.body;

  try {
    const result = await pool.query(
      `UPDATE empleados_publicos SET organismo = $1, rol = $2, fecha_nacimiento = $3,
       id_mesa = $4, id_ciudadano = $5 WHERE id = $6 RETURNING *;`,
      [organismo, rol, fecha_nacimiento, id_mesa, id_ciudadano, id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ message: "Empleado no encontrado." });

    res.json({
      message: "Empleado actualizado correctamente.",
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
      "DELETE FROM empleados_publicos WHERE id = $1 RETURNING *;",
      [id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Empleado no encontrado." });

    res.json({
      message: "Empleado eliminado correctamente.",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
