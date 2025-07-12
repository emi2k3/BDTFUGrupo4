const { body, param } = require("express-validator");

const empleadoSchema = [
  body("organismo")
    .isLength({ min: 2, max: 50 })
    .withMessage("Organismo inválido."),
  body("rol")
    .isIn(["presidente", "secretario", "vocal"])
    .withMessage("Rol inválido."),
  body("fecha_nacimiento").isISO8601().withMessage("Fecha inválida."),
  body("id_mesa").isInt().withMessage("ID de mesa inválido."),
  body("id_ciudadano").isInt().withMessage("ID de ciudadano inválido."),
];

const idSchema = [param("id").isInt().withMessage("ID inválido.")];

module.exports = {
  empleadoSchema,
  idSchema,
};
