const express = require("express");
const router = express.Router();
const credencialRoutes = require("./credencial.routes");
const ciudadanoRoutes = require("./ciudadano.routes");
const listaRoutes = require("./lista.routes");
const eleccionRoutes = require("./eleccion.routes");
const partidoRoutes = require("./partido_politico.routes");
const zonaRoutes = require("./zona.routes");
const localidadRoutes = require("./localidad.routes");
const departamentoRoutes = require("./departamento.routes");
const direccionRoutes = require("./direccion.routes");
const mesaRoutes = require("./mesa.routes");
const circuitoRoutes = require("./circuito.routes");
const establecimientoRoutes = require("./establecimiento.routes");

// Prefijos Asi se ponen las rutas

router.use("/credencial", credencialRoutes);
router.use("/ciudadano", ciudadanoRoutes);
router.use("/lista", listaRoutes);
router.use("/eleccion", eleccionRoutes);
router.use("/partido", partidoRoutes);
router.use("/zona", zonaRoutes);
router.use("/localidad", localidadRoutes);
router.use("/departamento", departamentoRoutes);
router.use("/direccion", direccionRoutes);
router.use("/mesa", mesaRoutes);
router.use("/circuito", circuitoRoutes);
router.use("/establecimiento", establecimientoRoutes);

module.exports = router;
