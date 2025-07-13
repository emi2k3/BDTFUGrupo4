const { body, param } = require("express-validator");

const candidatoSchema = [
  body("id_ciudadano")
    .isInt()
    .withMessage("El ID del ciudadano debe ser un número entero."),
  body("id_partido_politico")
    .isInt()
    .withMessage("El ID del partido político debe ser un número entero."),
  body("organo")
    .isLength({ min: 3, max: 50 })
    .withMessage("El órgano debe tener entre 3 y 50 caracteres."),
  body("orden").isInt().withMessage("El orden debe ser un número entero."),
];

const idSchema = [
  param("id").isInt().withMessage("El ID debe ser un número entero."),
];

module.exports = {
  candidatoSchema,
  idSchema,
};
