const { body, param } = require("express-validator");

const comisariaSchema = [
  body("nombre").isLength({ min: 2, max: 50 }).withMessage("Nombre inválido."),
  body("id_direccion").isInt().withMessage("ID de dirección inválido."),
];

const idSchema = [param("id").isInt().withMessage("ID inválido.")];

module.exports = { comisariaSchema, idSchema };
