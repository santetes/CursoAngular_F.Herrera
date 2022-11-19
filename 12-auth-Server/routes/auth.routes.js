const { Router } = require('express')
const { check } = require('express-validator')
const {
    crearUsuario,
    loginUsuario,
    renovarToken,
} = require('../controllers/auth.controller')
const { validarJWT } = require('../helpers/jwt')
const { validarCampos } = require('../middlewares/validar-campos')

const router = Router()

//Crear Usuario
router.post(
    '/new',
    [
        check('name', 'El nombre no puede estar vacío').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'la contraseña es obligatoria').isLength({ min: 6 }),
        validarCampos,
    ],
    crearUsuario
)
//Login de Usuario
router.post(
    '/',
    [
        check('email', 'el Email es obligatorio').isEmail(),
        check('password', 'La contraseña es obligatoria').isLength({ min: 6 }),
        validarCampos,
    ],
    loginUsuario
)
//Validar y revalidar token
router.get('/renew', validarJWT, renovarToken)

module.exports = router
