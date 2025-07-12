const express = require("express");
const router = express.Router();
const credencialRoutes = require("./credencial.routes");
const votosRoutes = require("./votos/votos.routes");

// Prefijos Asi se ponen las rutas

router.use("/credencial", credencialRoutes);
router.use("/votos", votosRoutes);

module.exports = router;
