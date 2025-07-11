const { body } = require("express-validator");

const credencialSchema = [
  body("serie")
    .notEmpty()
    .withMessage("La serie es requerida")
    .isLength({ max: 3, min: 3 })
    .withMessage("La serie debe tener 3 caracteres."),

  body("numero")
    .notEmpty()
    .withMessage("El número es requerido")
    .isInt()
    .withMessage("El número debe ser un integer"),
];

module.exports = {
  credencialSchema,
};
