const { request, response } = require('express')
const jwt = require('jsonwebtoken')
const Usuario = require('../model/Usuario')

const generarJWT = (uid, name) => {
    const payload = {
        uid,
        name,
    }

    try {
        const token = jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '5d',
        })
        return token
    } catch (error) {
        throw new Error(error)
    }
}

const validarJWT = async (req = request, res = response, next) => {
    const token = req.headers['x-token']

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'no se ha encontrado token en la petición',
        })
    }
    try {
        const { uid } = jwt.verify(token, process.env.SECRET_JWT_SEED)

        const usuario = await Usuario.findOne({ _id: uid })

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario no encontrado en la base de datos',
            })
        }

        req.usuario = usuario
    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: 'algo raro ha pasado en la verificación',
        })
    }

    next()
}

module.exports = {
    generarJWT,
    validarJWT,
}
