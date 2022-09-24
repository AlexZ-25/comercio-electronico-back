const { Router } = require("express");

const {
  getCarts,
//   createCart,
//   updateCart,
//   deleteCart,
} = require("../controllers/carts.controller");

const router = Router();

router.get("/", getCarts);

// router.post("/", createCart);

// router.put("/:idUser", updateCart);

// router.delete("/:idUser", deleteCart);

module.exports = router;
