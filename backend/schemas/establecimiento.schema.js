const { body, param } = require("express-validator");

const establecimientoSchema = [
  body("nombre")
    .isLength({ min: 3, max: 100 })
    .withMessage("El nombre debe tener entre 3 y 100 caracteres."),
  body("tipo")
    .isLength({ min: 3, max: 50 })
    .withMessage("El tipo debe tener entre 3 y 50 caracteres."),
  body("id_direccion")
    .isInt()
    .withMessage("El ID de dirección debe ser un número entero."),
];

const idSchema = [
  param("id").isInt().withMessage("El ID debe ser un número entero."),
];

module.exports = {
  establecimientoSchema,
  idSchema,
};
