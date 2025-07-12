const { body, param } = require("express-validator");

const tipoAnulacionSchema = [
  body("nombre").isLength({ min: 2, max: 50 }).withMessage("Nombre inválido."),
  body("descripcion").isLength({ min: 3 }).withMessage("Descripción inválida."),
];

const idSchema = [param("id").isInt().withMessage("ID inválido.")];

module.exports = { tipoAnulacionSchema, idSchema };
