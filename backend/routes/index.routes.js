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
const candidatoRoutes = require("./candidato.routes");
const empleadoRoutes = require("./empleado_publico.routes");
const comisariaRoutes = require("./comisaria.routes");
const anulacionRoutes = require("./tipo_anulacion.routes");
const authRoutes = require("./auth.routes");
const votosRoutes = require("./votos/votos.routes");
const resultadosRoutes = require("./resultados/resultados.routes");



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
router.use("/candidato", candidatoRoutes);
router.use("/empleado", empleadoRoutes);
router.use("/anulacion", anulacionRoutes);
router.use("/auth", authRoutes);
router.use("/votos", votosRoutes);
router.use("/resultados", resultadosRoutes);

module.exports = router;
