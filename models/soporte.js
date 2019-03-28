var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var estadomantenimiento = {
    values: ['Preventivo', 'Correctivo', 'Mantenimiento'],
};

var SoporteSchema = new Schema({
    ordenservicio: { type: Number },
    soporteusuario: { type: String },
    tecnico: { type: String },
    lugarmantenimiento: { type: String },
    oficioentrega: { type: Number },
    fingreso: { type: Date },
    fsalida: { type: Date },
    obs: { type: String },
    estado: { type: String, default: 'Mantenimiento', enum: estadomantenimiento },
    status: {
        type: Boolean,
        default: false
    },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
    emonitoria: { type: Schema.Types.ObjectId, ref: 'Emonitoria', required: [true, 'el id del equipo es necesario'] },
    img: { type: String, required: false },
    timestamp: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Soporte', SoporteSchema);