const { Router } = require("express");

const {
  getCarts,
  getCart,
  createCart,
  updateCart,
  deleteCart,
} = require("../controllers/carts.controller");

const { validarJWT } = require("../middlewares/jwt.middleware");

const router = Router();

router.get("/", validarJWT, getCarts);

router.get("/:idCart", getCart);

router.post("/", createCart);

router.put("/:idUser", updateCart);

router.delete("/:idUser", deleteCart);

module.exports = router;
