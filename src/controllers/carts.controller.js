const Cart = require("../models/cart");

const getCarts = async (req, res) => {
    const carts = await Cart.find();

    return res.json({
        ok: true,
        msg: "Carritos obtenidos",
        data: carts,
    });
};


module.exports = {
    getCarts,
    // createCart,
    // updateCart,
    // deleteCart,
};
