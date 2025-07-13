const { body, param } = require("express-validator");

const direccionSchema = [
  body("calle")
    .isLength({ min: 3 })
    .withMessage("La calle debe tener al menos 3 caracteres."),
  body("numero").isInt().withMessage("El número debe ser un entero."),
  body("id_departamento").isInt().withMessage("ID departamento inválido."),
  body("id_localidad").isInt().withMessage("ID localidad inválido."),
  body("id_zona").isInt().withMessage("ID zona inválido."),
];

const idSchema = [
  param("id").isInt().withMessage("El ID debe ser un número entero."),
];

module.exports = {
  direccionSchema,
  idSchema,
};
