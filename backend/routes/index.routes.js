const express = require("express");
const router = express.Router();
const credencialRoutes = require("./credencial.routes");
const authRoutes = require("./auth.routes");
const votosRoutes = require("./votos/votos.routes");
const resultadosRoutes = require("./resultados/resultados.routes");

// Prefijos Asi se ponen las rutas

router.use("/credencial", credencialRoutes);
router.use("/auth", authRoutes);
router.use("/votos", votosRoutes);
router.use("/resultados", resultadosRoutes);

module.exports = router;
