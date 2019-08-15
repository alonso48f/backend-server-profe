var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;
//var estadomantenimiento = {
   // values: ['Preventivo', 'Correctivo', 'Mantenimiento'],
//};

var crearequipocpaSchema = new Schema({
    esn: { type: String },
    auth: { type: String },
    contrato: { type: String },
    year:{ type: String },
    fecharegistro: { type: String },
    fechavencido: { type: String },
    //usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
    img: { type: String, required: false },
    timestamp: { type: Date, default: Date.now },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
});
module.exports = mongoose.model('Crearequipocpa', crearequipocpaSchema);