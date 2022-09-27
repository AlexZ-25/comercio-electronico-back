const { Router } = require("express");

const {
  getUsers,
  getUser,
  createUser,
  login,
  updateUser,
  deleteUser,
  verifyUser,
} = require("../controllers/users.controller");

const { validarJWT, validarJWTUser } = require("../middlewares/jwt.middleware");

const router = Router();

router.get("/",validarJWT, getUsers);

router.get("/auth", validarJWTUser, verifyUser);

router.get("/:idUser", getUser);

router.post("/", createUser);

router.post("/login", login);

router.put("/:idUser", updateUser);

router.delete("/:idUser", deleteUser);

module.exports = router;
