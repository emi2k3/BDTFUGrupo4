const { body, param } = require("express-validator");

const mesaSchema = [
  body("numero_identificacion")
    .isLength({ min: 1, max: 50 })
    .withMessage("Número de identificación inválido."),
  body("fecha_apertura")
    .optional()
    .isISO8601()
    .withMessage("Fecha de apertura inválida."),
  body("fecha_cierre")
    .optional()
    .isISO8601()
    .withMessage("Fecha de cierre inválida."),
  body("abierta")
    .isBoolean()
    .withMessage("El campo 'abierta' debe ser booleano."),
];

const idSchema = [
  param("id").isInt().withMessage("El ID debe ser un número entero."),
];

module.exports = {
  mesaSchema,
  idSchema,
};
