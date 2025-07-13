const { body } = require("express-validator");

const votoSchema = [
  // Validaciones para la tabla "votos"
  body("estado")
    .isIn(["valido", "anulado", "en blanco"])
    .withMessage("Estado debe ser 'valido', 'anulado' o 'en blanco'"),

  body("observado")
    .isBoolean()
    .withMessage("Observado debe ser un valor booleano"),

  body("id_circuito")
    .isInt({ min: 1 })
    .withMessage("ID de circuito debe ser un número entero positivo"),

  body("id_eleccion")
    .isInt({ min: 1 })
    .withMessage("ID de elección debe ser un número entero positivo"),

  body("id_tipo_anulacion")
    .optional()
    .isInt({ min: 1 })
    .withMessage("ID de tipo de anulación debe ser un número entero positivo")
    .custom((value, { req }) => {
      // Solo debe tener valor si el estado es 'anulado'
      if (req.body.estado === "anulado" && !value) {
        throw new Error(
          "ID de tipo de anulación es requerido cuando el estado es 'anulado'"
        );
      }
      if (req.body.estado !== "anulado" && value) {
        throw new Error(
          "ID de tipo de anulación solo debe enviarse cuando el estado es 'anulado'"
        );
      }
      return true;
    }),

  // Validaciones para la tabla "voto_lista"
  body("lista_id")
    .optional()
    .isInt({ min: 1 })
    .withMessage("ID de lista debe ser un número entero positivo")
    .custom((value, { req }) => {
      // Si el estado es 'en blanco', no debe haber lista
      if (req.body.estado === "en blanco" && value) {
        throw new Error(
          "No se puede seleccionar lista cuando el voto es en blanco"
        );
      }

      // Si el estado es 'valido', debe haber una lista
      if (req.body.estado === "valido" && !value) {
        throw new Error("Debe seleccionar una lista para un voto válido");
      }

      // Si el estado es 'anulado', puede o no tener lista (depende del tipo de anulación)
      return true;
    }),

  // Validaciones para la tabla "constancias_voto"
  body("id_ciudadano")
    .isInt({ min: 1 })
    .withMessage("ID de ciudadano debe ser un número entero positivo"),

  // Validaciones adicionales de negocio
  body("credencial_civica")
    .isLength({ min: 7, max: 7 })
    .withMessage("Credencial cívica debe tener exactamente 7 caracteres")
    .matches(/^[A-Z]{3}[0-9]{4}$/)
    .withMessage(
      "Credencial cívica debe tener formato: 3 letras mayúsculas seguidas de 4 números (ej: ABC1234)"
    ),

  // Validación personalizada para verificar coherencia
  body().custom((body) => {
    // Verificar coherencia entre estado y lista_id
    if (body.estado === "valido" && !body.lista_id) {
      throw new Error("Un voto válido debe tener una lista seleccionada");
    }

    if (body.estado === "en blanco" && body.lista_id) {
      throw new Error("Un voto en blanco no puede tener lista seleccionada");
    }

    return true;
  }),
];

// Schema específico para validar antes de votar
const preVotoSchema = [
  body("credencial_civica")
    .isLength({ min: 7, max: 7 })
    .withMessage("Credencial cívica debe tener exactamente 7 caracteres")
    .matches(/^[A-Z]{3}[0-9]{4}$/)
    .withMessage(
      "Credencial cívica debe tener formato: 3 letras mayúsculas seguidas de 4 números (ej: ABC1234)"
    ),

  body("id_circuito")
    .isInt({ min: 1 })
    .withMessage("ID de circuito debe ser un número entero positivo"),

  body("id_eleccion")
    .isInt({ min: 1 })
    .withMessage("ID de elección debe ser un número entero positivo"),
];

// Schema para autorizar votos observados (solo presidente de mesa)
const autorizarVotoObservadoSchema = [
  body("voto_id")
    .isInt({ min: 1 })
    .withMessage("ID de voto debe ser un número entero positivo"),

  body("autorizado")
    .isBoolean()
    .withMessage("Autorizado debe ser un valor booleano"),

  body("observaciones")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Las observaciones no pueden exceder 500 caracteres"),
];

module.exports = {
  votoSchema,
  preVotoSchema,
  autorizarVotoObservadoSchema,
};
