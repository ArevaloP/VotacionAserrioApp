const { Router } = require("express");
const { check } = require("express-validator");
const { loginUsuario } = require("../controllers/usuarios");
const { validarCampos } = require("../middlewares/validar-campos");


const router = Router();

router.post('/auth', [
    check('username', 'El nombre de usuario es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es oblogatoria').not().isEmpty(),
    validarCampos
], loginUsuario)

module.exports = router;