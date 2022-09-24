const User = require("../models/user");

const getUsers = async (req, res) => {
    const usuarios = await User.find();

    return res.json({
        ok: true,
        msg: "Usuarios obtenidos",
        data: usuarios,
    });
};


module.exports = {
    getUsers,
    // createUser,
    // updateUser,
    // deleteUser,
};
