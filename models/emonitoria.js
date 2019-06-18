var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var emonitoriaSchema = new Schema({

    placa: { type: String },
    ninventario: { type: String },
    nserie: { type: String },
    fadquisicion: { type: String },
    fvidautil: { type: String},
    obs: { type: String },
    img: { type: String, required: false },
    timestamp: { type: Date, default: Date.now },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },


});

module.exports = mongoose.model('Emonitoria', emonitoriaSchema);