const { Router } = require("express");
const { check } = require("express-validator");
const { getEstudianteByDoc, revalidarJWT } = require("../controllers/estudiantes");
const { validarJWT } = require("../middlewares/jwt");

const router = Router();

router.get('/:doc', getEstudianteByDoc);

router.get('/renew/jwt', validarJWT, revalidarJWT);

module.exports = router;