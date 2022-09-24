const { Schema, model } = require('mongoose');

const EpisodeSchema = Schema({
    Id: {
        type: String,
        require: [true, "El Id del episodio es requerido"],
        unique: true
    },
    Nombre: {
        type: String,
        require: [true, "El nombre es requerido"],
        unique: true,
    },
    URL: {
        type: String,
        require: [true, "El código del URL es requerido"],
        unique: true,
    },
})

//Siempre en singular porque por default pone una S al final
module.exports = model("episode", EpisodeSchema);