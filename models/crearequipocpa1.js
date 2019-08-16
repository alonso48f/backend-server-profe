var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;
var moduloperacional = { values: ['Aeropuerto', '1 Division', '2 Division', '3 Division', '4 Division'
, '5 Division', '6 Division', '7 Division', '8 Division', 'Modulo 2', 'Modulo 3', 'Facatativa'],};
var estadoequipo = {values: ['Activo', 'Perdido', 'Danado','Disponoble', 'Apoyo Finalizado', '']}

//var estadomantenimiento = {
   // values: ['Preventivo', 'Correctivo', 'Mantenimiento'],
//};

var crearequipocpa1Schema = new Schema({
    modulo: { type: String, default: 'Aeropuerto', enum: moduloperacional },
    indicativo: { type: String },
    tipo: { type: String },
    elemento: { type: String },
    nombre_equipo: { type: String },
    fecha: { type: String },
    numeroequipo: { type: String },
    viabilidad: { type: String },
    fechaentrega: { type: String },
    unidad: { type: String },
    unidadmayor: { type: String },
    objetivo: { type: String },
    estructura: { type: String },
    blanco: { type: String },
    operacion: { type: String },
    subcompania: { type: String },
    responsable_material: { type: String },
    modo_bateria: { type: String },
    fecha_vencimiento_bateria: { type: String },
    estado: { type: String, default: 'Activo', enum: estadoequipo },
    oficio:{ type: String },
    fecharegistro: { type: String },
    fechavencido: { type: String },
    img: { type: String, required: false },
    timestamp: { type: Date, default: Date.now },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
    crearequipocpa: { type: Schema.Types.ObjectId, ref: 'Crearequipocpa', required: [true, 'el id del equipo es necesario'] },
});
module.exports = mongoose.model('Crearequipocpa1', crearequipocpa1Schema);