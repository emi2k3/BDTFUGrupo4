const { body, param } = require("express-validator");

const listaSchema = [
  body("id_eleccion")
    .isInt().withMessage("El ID de elección debe ser un número entero."),
  body("id_partido_politico")
    .isInt().withMessage("El ID del partido político debe ser un número entero.")
];

const idSchema = [
  param("id").isInt().withMessage("El ID debe ser un número entero.")
];

module.exports = {
  listaSchema,
  idSchema
};
