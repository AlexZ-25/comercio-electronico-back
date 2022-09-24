const { Schema, model } = require('mongoose');

const CartSchema = Schema({
    usertoken: {
        type: String,
        require: [true, "El user token es requerido"],
        unique: true,
    },
    episodes: {
        type: Object,
        require: [true, "Los episodios son requeridos"],
    }
})


//Siempre en singular porque por default pone una S al final
module.exports = model("cart", CartSchema);