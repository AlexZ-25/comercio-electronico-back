const jwt = require("jsonwebtoken");
const User = require("../models/user");

const validarJWT = async (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No hay token, permiso no valido",
    });
  }

  try {
    // jwt.verify(token, process.env.SECRET)
    console.log(token)
    console.log(process.env.SECRET)
    const { id } = jwt.verify(token, process.env.SECRET);

    const usuario = await User.findById(id);

    if (!usuario) {
      return res.status(401).json({
        ok: false,
        msg: "Token no valido",
      });
    } else if (usuario.permissions !== "admin"){
      return res.status(401).json({
        ok: false,
        msg: "No cuenta con rol de administrador",
      });
    };
    
    req.usuario = usuario;
    next();
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Error en el servidor " + error,
    });
  }
};

const validarJWTUser = async (req, res, next) => {
  // const token = req
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No hay token, permiso inválido",
    });
  };

  try {
    const { id } = jwt.verify(token, process.env.SECRET);
    const usuario = await User.findById(id)
    console.log(usuario);
    if (!usuario) {
      return res.status(401).json({
        ok: false,
        msg: "No hay token, permiso inválido",
      });
    };
    req.usuario = usuario;
    next();
  } catch (err) {
    return res.status(500).json({
      ok: false,
      msg: "Error en el servidor",
    });
  }

};

module.exports = {
  validarJWT,
  validarJWTUser,
};
