const { body, param } = require("express-validator");

const partidoSchema = [
  body("nombre")
    .isLength({ min: 3, max: 100 })
    .withMessage("El nombre debe tener entre 3 y 100 caracteres."),
  body("sigla")
    .isLength({ min: 1, max: 10 })
    .withMessage("La sigla debe tener entre 1 y 10 caracteres."),
  body("id_presidente")
    .isInt()
    .withMessage("El ID del presidente debe ser un número entero."),
  body("id_vicepresidente")
    .isInt()
    .withMessage("El ID del vicepresidente debe ser un número entero."),
  body("id_direccion")
    .isInt()
    .withMessage("El ID de la dirección debe ser un número entero."),
];

const idSchema = [
  param("id").isInt().withMessage("El ID debe ser un número entero."),
];

module.exports = {
  partidoSchema,
  idSchema,
};
