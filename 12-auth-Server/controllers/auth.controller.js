const { response, request } = require('express')
const Usuario = require('../model/Usuario')
const bcrypt = require('bcryptjs')
const { generarJWT } = require('../helpers/jwt')

const crearUsuario = async (req = request, res = response) => {
    const { name, email, password } = req.body

    try {
        //Verificar si no existe un correo igual
        const usuario = await Usuario.findOne({ email })
        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Este usuario ya se encuentra en la bbdd',
            })
        }

        //Crear usuario con el modelo
        const usuarioDb = new Usuario(req.body)

        //Encriptaremos la constraseña (hashear)
        const salt = bcrypt.genSaltSync()
        usuarioDb.password = bcrypt.hashSync(password, salt)

        //Generar el JWT
        const token = generarJWT(usuarioDb.id, usuarioDb.name)

        // Introducir usuario en el bbdd
        await usuarioDb.save()

        //Generar respuesta existosa
        return res.status(200).json({
            ok: true,
            uid: usuarioDb.id,
            name,
            email: usuarioDb.email,
            token,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'hable con el administrador',
        })
    }
}

const loginUsuario = async (req = request, res = response) => {
    const { email, password } = req.body

    try {
        const usuarioDb = await Usuario.findOne({ email })

        if (!usuarioDb) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo no existe',
            })
        }
        // Confirmar si password hace match
        const validPassword = bcrypt.compareSync(password, usuarioDb.password)
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'El password no es correcto',
            })
        }

        // Generar JWT
        const token = generarJWT(usuarioDb.id, usuarioDb.name)

        // Respuesta del servicio
        return res.json({
            ok: true,
            uid: usuarioDb.id,
            name: usuarioDb.name,
            email: usuarioDb.email,
            token,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador',
        })
    }
}

const renovarToken = (req = request, res = response) => {
    const token = generarJWT(req.usuario.id, req.usuario.name)

    return res.json({
        ok: true,
        name: req.usuario.name,
        email: req.usuario.email,
        uid: req.usuario.id,
        msg: 'Token renovado',
        token,
    })
}

module.exports = { crearUsuario, loginUsuario, renovarToken }
