const express = require("express");
const router = express.Router();
const pool = require("../../database/db");
const { body, param, validationResult } = require("express-validator");
const { votoSchema } = require("../../schemas/voto.schema");

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.post("/votar", votoSchema, handleValidationErrors, async (req, res) => {
  const {
    estado,
    observado,
    id_circuito,
    id_eleccion,
    lista_id,
    id_tipo_anulacion,
    id_ciudadano,
  } = req.body;

  let transaction = false;

  try {
    await pool.query("BEGIN");
    transaction = true;

    // Verificar que no haya votado ya
    const yaVotoQuery = await pool.query(
      "SELECT id FROM constancias_voto WHERE id_ciudadano = $1 AND id_eleccion = $2",
      [id_ciudadano, id_eleccion]
    );

    if (yaVotoQuery.rows.length > 0) {
      await pool.query("ROLLBACK");
      transaction = false;
      return res.status(400).json({
        message: "El ciudadano ya emitió su voto para esta elección",
      });
    }

    // Verificar que la mesa esté abierta
    const mesaQuery = await pool.query(
      `SELECT m.abierta 
       FROM mesas m 
       INNER JOIN circuitos c ON c.id_mesa = m.id 
       WHERE c.id = $1`,
      [id_circuito]
    );

    if (mesaQuery.rows.length === 0) {
      await pool.query("ROLLBACK");
      transaction = false;
      return res.status(400).json({
        message: "Circuito no encontrado",
      });
    }

    if (!mesaQuery.rows[0].abierta) {
      await pool.query("ROLLBACK");
      transaction = false;
      return res.status(400).json({
        message: "La mesa no está abierta para votación",
      });
    }

    // Insertar voto
    const votoQuery = await pool.query(
      `INSERT INTO votos (estado, observado, fecha_hora, id_circuito, id_tipo_anulacion, id_eleccion) 
         VALUES ($1, $2, NOW(), $3, $4, $5) RETURNING id`,
      [estado, observado, id_circuito, id_tipo_anulacion, id_eleccion]
    );

    const voto_id = votoQuery.rows[0].id;

    // Insertar relación voto-lista si existe
    if (lista_id) {
      await pool.query(
        "INSERT INTO voto_lista (voto_id, lista_id) VALUES ($1, $2)",
        [voto_id, lista_id]
      );
    }

    // Insertar constancia de voto
    await pool.query(
      `INSERT INTO constancias_voto (fecha_hora, voto, id_ciudadano, id_eleccion, id_circuito) 
         VALUES (NOW(), true, $1, $2, $3)`,
      [id_ciudadano, id_eleccion, id_circuito]
    );

    await pool.query("COMMIT");
    transaction = false;

    return res.status(201).json({
      message: "Voto emitido exitosamente",
      voto_id: voto_id,
      observado: observado,
    });
  } catch (error) {
    if (transaction) {
      await pool.query("ROLLBACK");
    }
    console.error("Error al emitir voto:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
});

module.exports = router;
