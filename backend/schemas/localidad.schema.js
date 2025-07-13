const { body, param } = require("express-validator");

const localidadSchema = [
  body("tipo")
    .isLength({ min: 3, max: 50 })
    .withMessage("El tipo debe tener entre 3 y 50 caracteres."),
  body("nombre")
    .isLength({ min: 3, max: 50 })
    .withMessage("El nombre debe tener entre 3 y 50 caracteres."),
];

const idSchema = [
  param("id").isInt().withMessage("El ID debe ser un número entero."),
];

module.exports = {
  localidadSchema,
  idSchema,
};
