const { body, param } = require("express-validator");

const policiaSchema = [
  body("id_ciudadano").isInt().withMessage("ID de ciudadano inválido."),
  body("id_comisaria").isInt().withMessage("ID de comisaría inválido."),
];

const idSchema = [param("id").isInt().withMessage("ID inválido.")];

module.exports = {
  policiaSchema,
  idSchema,
};
