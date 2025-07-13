const { body, param } = require("express-validator");

const zonaSchema = [
  body("nombre")
    .isLength({ min: 3, max: 100 })
    .withMessage("El nombre debe tener entre 3 y 100 caracteres."),
];

const idSchema = [
  param("id").isInt().withMessage("El ID debe ser un número entero."),
];

module.exports = {
  zonaSchema,
  idSchema,
};
