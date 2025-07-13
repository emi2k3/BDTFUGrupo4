const express = require("express");
const router = express.Router();
const credencialRoutes = require("./credencial.routes");
const authRoutes = require("./auth.routes");

// Prefijos Asi se ponen las rutas

router.use("/credencial", credencialRoutes);
router.use("/auth", authRoutes);
module.exports = router;
