const express = require("express");
const router = express.Router();
const pool = require("../../database/db");
const { param, validationResult } = require("express-validator");

// Ruta para obtener todos los votos separados por lista de una elección específica
router.get(
  "/listas/eleccion/:id",
  [param("id").isInt().withMessage("El ID debe ser un número entero")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const ideleccion = req.params.id;
    try {
      const resultado = await pool.query(
        `SELECT 
            e.id AS eleccion_id,
            e.fecha AS fecha_eleccion,
            e.tipo AS tipo_eleccion,
            l.id AS lista_id,
            pp.nombre AS partido_nombre,
            pp.sigla AS partido_sigla,
            COALESCE(COUNT(CASE WHEN v.estado = 'valido' THEN vl.voto_id END), 0) AS votos_validos,
            COALESCE(COUNT(CASE WHEN v.estado = 'anulado' THEN vl.voto_id END), 0) AS votos_anulados,
            COALESCE(COUNT(CASE WHEN v.estado = 'en blanco' THEN vl.voto_id END), 0) AS votos_en_blanco
        FROM elecciones e
        INNER JOIN listas l ON e.id = l.id_eleccion
        INNER JOIN partidos_politicos pp ON l.id_partido_politico = pp.id
        LEFT JOIN voto_lista vl ON l.id = vl.lista_id
        LEFT JOIN votos v ON vl.voto_id = v.id
        WHERE e.id = $1
        GROUP BY e.id, e.fecha, e.tipo, l.id, pp.nombre, pp.sigla
        ORDER BY votos_validos DESC`,
        [ideleccion]
      );

      if (resultado.rows.length === 0) {
        return res.status(404).json({
          message: "No se encontró la elección o no hay listas registradas",
        });
      }
      return res.status(200).json({
        message: "Votos por lista obtenidos exitosamente",
        data: resultado.rows,
      });
    } catch (error) {
      console.error("Error al obtener votos por lista:", error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  }
);

// Ruta para obtener todos los votos separados por departamento de una elección específica
router.get(
  "/departamentos/eleccion/:id",
  [param("id").isInt().withMessage("El ID debe ser un número entero")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const idEleccion = req.params.id;
    try {
      const resultado = await pool.query(
        `SELECT 
            d.id AS departamento_id,
            d.nombre AS departamento_nombre,
            COUNT(v.id) AS total_votos,
            COUNT(CASE WHEN v.estado = 'valido' THEN 1 END) AS votos_validos,
            COUNT(CASE WHEN v.estado = 'anulado' THEN 1 END) AS votos_anulados,
            COUNT(CASE WHEN v.estado = 'en blanco' THEN 1 END) AS votos_en_blanco,
            COUNT(CASE WHEN v.observado = true THEN 1 END) AS votos_observados
        FROM departamentos d
        INNER JOIN direcciones dir ON d.id = dir.id_departamento
        INNER JOIN establecimientos est ON dir.id = est.id_direccion
        INNER JOIN circuitos c ON est.id = c.id_establecimiento
        INNER JOIN votos v ON c.id = v.id_circuito
        WHERE v.id_eleccion = $1
        GROUP BY d.id, d.nombre
        ORDER BY total_votos DESC;`,
        [idEleccion]
      );

      if (resultado.rows.length === 0) {
        return res.status(404).json({
          message:
            "No se encontraron votos para esta elección en ningún departamento",
        });
      }

      return res.status(200).json({
        message:
          "Votos por departamento para la elección obtenidos exitosamente",
        data: resultado.rows,
      });
    } catch (error) {
      console.error(
        "Error al obtener votos por departamento para elección:",
        error
      );
      return res.status(500).json({
        message: "Error interno del servidor",
        error: error.message,
      });
    }
  }
);

// Ruta para obtener la cantidad de votos emitidos por candidato en una elección específica

router.get(
  "/candidatos/eleccion/:id",
  [param("id").isInt().withMessage("El ID debe ser un número entero")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const idEleccion = req.params.id;
    try {
      const resultado = await pool.query(
        `SELECT 
          c.id AS candidato_id,
          CONCAT(ci.primer_nombre, ' ', ci.primer_apellido) AS nombre_candidato,
          pp.nombre AS partido_politico,
          c.organo,
          c.orden,
          COALESCE(COUNT(CASE WHEN v.estado = 'valido' AND v.observado = FALSE THEN 1 END), 0) AS votos_validos,
          COALESCE(COUNT(CASE WHEN v.observado = TRUE THEN 1 END), 0) AS votos_observados,
          COALESCE(COUNT(CASE WHEN v.estado = 'anulado' THEN 1 END), 0) AS votos_anulados,
          COALESCE(COUNT(v.id), 0) AS total_votos
        FROM candidatos c
          INNER JOIN ciudadanos ci ON c.id_ciudadano = ci.id
          INNER JOIN partidos_politicos pp ON c.id_partido_politico = pp.id
          LEFT JOIN integrantes_lista il ON c.id = il.id_candidato
          LEFT JOIN listas l ON il.id_lista = l.id AND l.id_eleccion = $1
          LEFT JOIN voto_lista vl ON l.id = vl.lista_id
          LEFT JOIN votos v ON vl.voto_id = v.id AND v.id_eleccion = $1
        WHERE 
          c.orden = 1  -- Solo candidatos principales (orden 1)
        GROUP BY 
          c.id, 
          ci.primer_nombre, 
          ci.primer_apellido, 
          pp.nombre,
          c.organo,
          c.orden
        HAVING 
          COUNT(l.id) > 0  -- Solo incluir candidatos que participan en esta elección
        ORDER BY 
          pp.nombre,
          c.organo,
          c.orden`,
        [idEleccion]
      );

      if (resultado.rows.length === 0) {
        return res.status(404).json({
          message: "No se encontraron candidatos para esta elección",
        });
      }

      return res.status(200).json({
        message: "Votos por candidato obtenidos exitosamente",
        data: resultado.rows,
      });
    } catch (error) {
      console.error("Error al obtener votos por candidato:", error);
      return res.status(500).json({
        message: "Error interno del servidor",
        error: error.message,
      });
    }
  }
);

module.exports = router;
