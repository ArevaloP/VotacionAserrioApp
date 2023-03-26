const { Router } = require("express");
const { check } = require("express-validator");

const { getCandidatos, votar, agregarCandidato, obtenerResultados, reiniciarVotacion } = require("../controllers/candidatos");
const { existeEstudianteById } = require("../helpers/validaciones-db");
const { validarJWT } = require("../middlewares/jwt");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.get('/', [
    validarJWT
], getCandidatos);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El apellido es obligatorio').not().isEmpty(),
    check('numero', 'El numero es obligatorio').not().isEmpty(),
    check('puesto', 'El puesto a que aspira el candidato es obligatorio').not().isEmpty(),
    validarCampos
], agregarCandidato);

router.put('/votar/:id', [
    validarJWT,
    check('id').custom(existeEstudianteById),
    check('idPersonero', 'El id del personero es obligatorio para votar').not().isEmpty(),
    check('idContralor', 'El id del contralor es es obligatorio para votar').not().isEmpty(),
    validarCampos
], votar);

router.get('/resultados', validarJWT, obtenerResultados);

router.put('/reiniciarVotacion', validarJWT, reiniciarVotacion);

module.exports = router;