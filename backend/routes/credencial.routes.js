const express = require("express");
const router = express.Router();
const pool = require("../database/db.js");
const { validationResult, param } = require("express-validator");
const { credencialSchema } = require("../schemas/credencial.schema");

router.get("/", async (req, res) => {
  try {
    const resultado = await pool.query(`
      SELECT * from credenciales;
      `);
    if (resultado.rows.length === 0) {
      return res.status(404).json({ message: "No existen credenciales" });
    }
    return res.status(200).json({ message: resultado.rows });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

router.get(
  "/:id",
  [param("id").isInt().withMessage("El ID debe ser un número entero")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      const idcredencial = req.params.id;
      try {
        const resultado = await pool.query(
          `
        SELECT * FROM credenciales WHERE id = $1
        `,
          [idcredencial]
        );
        if (resultado.rows.length === 0) {
          return res.status(404).json({ message: "Credencial no encontrada" });
        }
        return res.status(200).json({ message: resultado.rows[0] });
      } catch (error) {
        return res.status(400).json({ message: error.message });
      }
    }
  }
);

router.post("/", credencialSchema, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    const { serie, numero } = req.body;
    try {
      const resultado = await pool.query(
        `
        INSERT INTO credenciales(serie,numero) VALUES($1,$2)
        RETURNING *
        `,
        [serie, numero]
      );
      return res.status(200).json({
        message: "La credencial fue creada correctamente.",
        data: resultado.rows[0],
      });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
});

router.put(
  "/:id",
  [param("id").isInt().withMessage("El ID debe ser un número entero")],
  credencialSchema,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      const id = req.params.id;
      const { serie, numero } = req.body;
      try {
        const resultado = await pool.query(
          `
        UPDATE credenciales SET serie = $1, numero= $2 WHERE ID = $3
        RETURNING *
        `,
          [serie, numero, id]
        );
        if (resultado.rows.length === 0) {
          return res.status(404).json({ message: "Credencial no encontrada" });
        }
        return res.status(200).json({
          message: "La credencial fue editada correctamente.",
          data: resultado.rows[0],
        });
      } catch (error) {
        return res.status(400).json({ message: error.message });
      }
    }
  }
);

router.delete(
  "/:id",
  [param("id").isInt().withMessage("El ID debe ser un número entero")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      const id = req.params.id;
      try {
        const response = await pool.query(
          `
        DELETE FROM credenciales WHERE ID = $1 RETURNING *
        `,
          [id]
        );
        if (response.rows.length === 0) {
          return res.status(404).json({ message: "Credencial no encontrada" });
        }
        return res.status(200).json({
          message: "La credencial fue eliminada correctamente.",
        });
      } catch (error) {
        return res.status(400).json({ message: error.message });
      }
    }
  }
);

module.exports = router;
