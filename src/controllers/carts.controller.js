const Cart = require("../models/cart");

const getCarts = async (req, res) => {
    const carts = await Cart.find();

    return res.json({
        ok: true,
        msg: "Carritos obtenidos",
        data: carts,
    });
};

const getCart = async (req, res) => {
    const { idCart } = req.params;
    const cart = await Cart.findById(idCart);

    return res.json({
        msg: "Carrito obtenido",
        data: cart,
    });
};

const createCart = async (req, res) => {
    const { usertoken, episodes } = req.body;

    const cart = {
        usertoken,
        episodes,
    }

    const newCart = await Cart.create(cart);

    return res.json({
        msg: "Carrito creado",
        data: newCart,
    });
};

const updateCart = async (req, res) => {
    const { idCart } = req.params;
    const { episodes } = req.body;

    const cart = {
        episodes
    };

    const updatedCart = await Cart.findByIdAndUpdate(
        idCart,
        cart,
        { new: true }
    );

    return res.json({
        msg: "Carrito actualizado",
        data: updatedCart,
    });
};

const deleteCart = async (req, res) => {
    const { idCart } = req.params;

    const deletedCart = await Cart.findByIdAndRemove(idCart);

    return res.json({
        msg: "Carrito eliminado",
        data: deletedCart,
    });
};

module.exports = {
    getCarts,
    getCart,
    createCart,
    updateCart,
    deleteCart,
};
