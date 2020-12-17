const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    nombre: String,
    apellido: String,
    cedula: String,
    telefono: String,
    direccion: String,
    parroquia: String,
    hora_entrada: String,
    hora_salida: String,
    consulta_libros: String,
    consulta_computadoras: String
});

module.exports = model('User', userSchema);