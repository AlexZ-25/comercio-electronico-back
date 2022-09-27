const User = require("../models/user");
const bcrypt = require("bcrypt");
const { generarJWT } = require("../helpers/jwt.helper");
const { validarJWTUser } = require("../middlewares/jwt.middleware");

const getUsers = async (req, res) => {
    const usuarios = await User.find();

    return res.json({
        ok: true,
        msg: "Usuarios obtenidos",
        data: usuarios,
    });
};


const getUser = async (req, res) => {
    const { idUser } = req.params;
    const user = await User.findById(idUser);

    return res.json({
        msg: "Usuario obtenido",
        data: user,
    });
};

const createUser = async (req, res) => {
    try {
        const { email, username, password, permissions } = req.body;

        // if (!permissions) {permissions = "usuario"};
        // !permissions ? permissions = "usuario" : permissions = "admin";

        const emailEncontrado = await User.findOne({ email: email });

        if (emailEncontrado) {
            return res.status(400).json({
                ok: false,
                msg: `Error, el correo ${emailEncontrado.email} ya esta registrado`,
            });
        }

        const usernameEncontrado = await User.findOne({ username: username });

        if (usernameEncontrado) {
            return res.status(400).json({
                ok: false,
                msg: `Error, el username ${usernameEncontrado.username} ya esta registrado`,
            });
        }

        const salt = bcrypt.genSaltSync(10);

        const user = {
            email: email,
            username: username,
            password: bcrypt.hashSync(password, salt),
            permissions: permissions,
        };

        const nuevoUsuario = await User.create(user);

        const token = await generarJWT(nuevoUsuario.id);

        return res.status(201).json({
            ok: true,
            msg: "Registro exitoso",
            data: nuevoUsuario,
            token,
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Problemas del lado del servidor",
            data: [],
        });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: "Error al iniciar sesion - no se encontro el usuario",
            });
        }

        const validarPassword = bcrypt.compareSync(password, user.password);

        if (!validarPassword) {
            return res.status(400).json({
                ok: false,
                msg: "Error al iniciar sesion - contrasenia incorrecta",
            });
        }

        const token = await generarJWT(user.id);

        return res.json({
            ok: true,
            msg: "Acceso otorgado",
            data: user,
            token,
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Problemas del lado del servidor",
            data: [],
        });
    }
};

const updateUser = async (req, res) => {
    const { idUser } = req.params;
    const { username, password } = req.body;

    const user = {
        username,
        password,
    }

    const usuarioActualizado = await User.findByIdAndUpdate(
        idUser,
        user,
        { new: true }
    );

    return res.json({
        ok: true,
        msg: "Usuario actualizado",
        data: usuarioActualizado,
    });
};

const deleteUser = async (req, res) => {
    const { idUser } = req.params;

    const userEliminado = await User.findByIdAndRemove(idUser);

    return res.json({
        msg: "Usuario eliminado",
        data: userEliminado,
    });
};

const verifyUser = async (req, res) => {
    const { usuario } = req;

    const token = await generarJWT(usuario.id);

    return res.json({
        ok: true,
        msg: "Usuario validado",
        data: usuario,
        token,
    });
};


module.exports = {
    getUsers,
    getUser,
    createUser,
    login,
    updateUser,
    deleteUser,
    verifyUser,
};
