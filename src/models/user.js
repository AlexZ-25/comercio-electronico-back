const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    email: {
        type: String,
        require: [true, "El nombre es requerido"],
        unique: true,
    },
    username: {
        type: String,
        require: [true, "El nombre es requerido"],
        unique: true,
    },
    password: {
        type: String,
    },
    permissions: {
        type: String,
        require: [true, "Se requiere definir los permisos para este nuevo usuario"],
    }
})

UserSchema.methods.toJSON = function () {
    const { __v, _id, ...rest } = this.toObject();
    rest.id = _id;
    return rest;
}

//Siempre en singular porque por default pone una S al final
module.exports = model("user", UserSchema);