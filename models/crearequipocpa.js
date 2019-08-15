var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var estadomantenimiento = {
    values: ['Preventivo', 'Correctivo', 'Mantenimiento'],
};

var CrearequipocpaSchema = new Schema({
    esn: { type: String },
    auth: { type: String },
    contrato: { type: String },
    fecharegistro: { type: Date },
    fechavencido: { type: Date },
    //usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
    img: { type: String, required: false },
    timestamp: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Crearequipocpa', CrearequipocpaSchema);