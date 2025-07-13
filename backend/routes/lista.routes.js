const express = require("express");
const router = express.Router();
const pool = require("../database/db");
const { validationResult } = require("express-validator");
const { listaSchema, idSchema } = require("../schemas/lista.schema");

router.post("/", listaSchema, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { id_eleccion, id_partido_politico } = req.body;

  try {
    const result = await pool.query(
      `
      INSERT INTO listas (id_eleccion, id_partido_politico)
      VALUES ($1, $2) RETURNING *;
      `,
      [id_eleccion, id_partido_politico]
    );

    res.status(201).json({
      message: "Lista creada correctamente.",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
    pp.id AS partido_id,
    pp.nombre AS nombre_partido,
    pp.sigla AS sigla_partido,
    
    TRIM(cp.primer_nombre || ' ' || 
         COALESCE(cp.segundo_nombre, '') || ' ' ||
         cp.primer_apellido || ' ' || 
         COALESCE(cp.segundo_apellido, '')) AS presidente_nombre_completo,
    
    TRIM(cv.primer_nombre || ' ' || 
         COALESCE(cv.segundo_nombre, '') || ' ' ||
         cv.primer_apellido || ' ' || 
         COALESCE(cv.segundo_apellido, '')) AS vicepresidente_nombre_completo

   

FROM partidos_politicos pp
LEFT JOIN ciudadanos cp ON pp.id_presidente = cp.id
LEFT JOIN ciudadanos cv ON pp.id_vicepresidente = cv.id
ORDER BY pp.nombre;`);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener una por ID
router.get("/:id", idSchema, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("SELECT * FROM listas WHERE id = $1;", [
      id,
    ]);

    if (result.rows.length === 0)
      return res.status(404).json({ message: "Lista no encontrada." });

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", [...idSchema, ...listaSchema], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { id } = req.params;
  const { id_eleccion, id_partido_politico } = req.body;

  try {
    const result = await pool.query(
      `
      UPDATE listas SET
        id_eleccion = $1,
        id_partido_politico = $2
      WHERE id = $3 RETURNING *;
      `,
      [id_eleccion, id_partido_politico, id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ message: "Lista no encontrada." });

    res.json({
      message: "Lista actualizada correctamente.",
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
      "DELETE FROM listas WHERE id = $1 RETURNING *;",
      [id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ message: "Lista no encontrada." });

    res.json({
      message: "Lista eliminada correctamente.",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
