const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const pool = require("../database/db");
const JWT_SECRET = process.env.JWT_SECRET || "clave_secreta";

router.post("/login", async (req, res) => {
  const { ci, serie, numero } = req.body;

  try {
    const result = await pool.query(
      `SELECT 
        * 
    FROM 
        ciudadanos c
    JOIN
        credenciales cre ON c.id_credencial = cre.id
    WHERE 
        cre.serie = $1 AND cre.numero=$2  AND c.ci=$3
    LIMIT 1`,
      [serie, numero, ci]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Ciudadano no encontrado" });
    }
    const ciudadano = result.rows[0];
    if (!ciudadano.mayor_edad) {
      return res.status(400).json({ message: "Ciudadano menor de edad" });
    }
    const token = jwt.sign(
      {
        id: ciudadano.id,
      },
      JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({ token });
  } catch (error) {
    console.error("Error en login Ciudadano:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

module.exports = router;
