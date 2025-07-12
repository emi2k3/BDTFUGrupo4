const { body, param } = require("express-validator");

const ciudadanoSchema = [
  body("ci").isInt().withMessage("La cédula debe ser un número entero."),
  body("primer_nombre")
    .isLength({ min: 2, max: 20 })
    .withMessage("El primer nombre debe tener entre 2 y 20 caracteres."),
  body("segundo_nombre")
    .optional()
    .isLength({ min: 2, max: 20 })
    .withMessage("El segundo nombre debe tener entre 2 y 20 caracteres."),
  body("primer_apellido")
    .isLength({ min: 2, max: 20 })
    .withMessage("El primer apellido debe tener entre 2 y 20 caracteres."),
  body("segundo_apellido")
    .optional()
    .isLength({ min: 2, max: 20 })
    .withMessage("El segundo apellido debe tener entre 2 y 20 caracteres."),
  body("mayor_edad")
    .isBoolean()
    .withMessage("Debe indicar si es mayor de edad."),
  body("id_credencial")
    .isInt()
    .withMessage("El ID de la credencial debe ser un número entero."),
];

const idSchema = [
  param("id").isInt().withMessage("El ID debe ser un número entero."),
];

module.exports = {
  ciudadanoSchema,
  idSchema,
};
