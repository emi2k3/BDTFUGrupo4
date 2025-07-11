const express = require("express");
const router = express.Router();
const credencialRoutes = require("./credencial.routes");

// Prefijos Asi se ponen las rutas

router.use("/credencial", credencialRoutes);

module.exports = router;
