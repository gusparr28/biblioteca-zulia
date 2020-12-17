const userController = {};

const User = require('../models/User');

userController.getUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        return res.status(200).json({ status: 200, user });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ status: 500, message: 'Error de servidor', error: e });
    };
};

userController.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ status: 200, users });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ status: 500, message: 'Error de servidor', error: e });
    };
};

userController.createUser = async (req, res) => {
    const { nombre, apellido, cedula, telefono, direccion, parroquia, hora_entrada, hora_salida, consulta_libros, consulta_computadoras } = req.body;
    try {
        if (!nombre || !apellido || !cedula || !telefono || !direccion || !parroquia || !hora_entrada || !hora_salida || !consulta_libros || !consulta_computadoras)
            return res.status(422).json({ status: 422, message: 'Por favor, complete todos los campos' });
        const newUser = new User({
            nombre,
            apellido,
            cedula,
            telefono,
            direccion,
            parroquia,
            hora_entrada,
            hora_salida,
            consulta_libros,
            consulta_computadoras
        });
        await newUser.save();
        return res.status(200).json({ status: 200, message: 'Usuario creado exitosamente', user: newUser });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ status: 500, message: 'Error de servidor', error: e });
    };
};

userController.updateUser = async (req, res) => {
    const { _id, nombre, apellido, cedula, telefono, direccion, parroquia, hora_entrada, hora_salida, consulta_libros, consulta_computadoras } = req.body;
    const { id } = req.params;
    try {
        const user = await User.findByIdAndUpdate(id, {
            nombre,
            apellido,
            cedula,
            telefono,
            direccion,
            parroquia,
            hora_entrada,
            hora_salida,
            consulta_libros,
            consulta_computadoras,
            _id
        }, { new: true });
        return res.status(200).json({ status: 200, message: 'Usuario actualizado exitosamente', user });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ status: 500, message: 'Error de servidor', error: e });
    }
};

userController.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await User.findByIdAndDelete(id);
        return res.status(200).json({ status: 200, message: 'Usuario eliminado exitosamente' });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ status: 500, message: 'Error de servidor', error: e });
    };
};

userController.searchUser = (req, res) => {
    let userPattern = new RegExp("^" + req.body.query);
    User.find({ cedula: { $regex: userPattern } })
        .then(user => {
            res.json({ user });
        }).catch(err => {
            console.error(err);
        });
};

module.exports = userController;