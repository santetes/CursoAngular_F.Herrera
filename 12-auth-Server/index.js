const express = require('express')
const cors = require('cors')
const { dbConexion } = require('./db/config')
const path = require('path')

//Carga de las variables de entorno
require('dotenv').config()

const PORT = process.env.PORT

//Crear servidor/aplicación express
const app = express()
//conexión a base de datos
dbConexion()
//Directorio público
app.use(express.static('public'))

//Cors
app.use(cors())
//Lectura y parseo del Body ->Esto sirve
//para decirle a express que la información que viene en el body va a ser de tipo json
app.use(express.json())

//Rutas
app.use('/api/auth', require('./routes/auth.routes'))

//Manejar demás rutas
//Esto es muy importante y sirve para que el backend sea capaz de gestionar correctamente las rutas de angular...
//...y no las confunda con las propias rutas del backend.
//Importante tambien la posición. Observese que se encuentra detrás de rutas
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'))
})

app.listen(PORT, () => console.log(`Servidor corriendo en puerto: ${PORT}`))
