const { body, param } = require("express-validator");

const eleccionSchema = [
  body("fecha")
    .isISO8601()
    .withMessage("La fecha debe tener formato válido (YYYY-MM-DD)."),
  body("tipo")
    .isLength({ min: 3, max: 50 })
    .withMessage("El tipo debe tener entre 3 y 50 caracteres."),
];

const idSchema = [
  param("id").isInt().withMessage("El ID debe ser un número entero."),
];

module.exports = {
  eleccionSchema,
  idSchema,
};
