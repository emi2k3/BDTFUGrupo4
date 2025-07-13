const { body, param } = require("express-validator");

const circuitoSchema = [
  body("accesible")
    .isBoolean()
    .withMessage("El campo 'accesible' debe ser booleano."),
  body("numero").isInt().withMessage("El número debe ser un entero."),
  body("id_establecimiento")
    .isInt()
    .withMessage("El ID del establecimiento debe ser un entero."),
  body("id_mesa").isInt().withMessage("El ID de la mesa debe ser un entero."),
];

const idSchema = [
  param("id").isInt().withMessage("El ID debe ser un número entero."),
];

module.exports = {
  circuitoSchema,
  idSchema,
};
