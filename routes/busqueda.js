var express = require('express');

var app = express();

var Soporte = require('../models/soporte');
var Emonitoria = require('../models/emonitoria');
var Hospital = require('../models/hospital');
var Medico = require('../models/medico');
var Usuario = require('../models/usuario');

// ==============================
// Busqueda por colección
// ==============================
app.get('/coleccion/:tabla/:busqueda', (req, res) => {

    var busqueda = req.params.busqueda;
    var tabla = req.params.tabla;
    var regex = new RegExp(busqueda, 'i');

    var promesa;

    switch (tabla) {

        case 'usuarios':
            promesa = buscarUsuarios(busqueda, regex);
            break;

        case 'emonitoria':
            promesa = buscarEmonitoria(busqueda, regex);
            break;

        case 'soporte':
            promesa = buscarSoporte(busqueda, regex);
            break;

        default:
            return res.status(400).json({
                ok: false,
                mensaje: 'Los tipos de busqueda sólo son: usuarios, medicos y hospitales',
                error: { message: 'Tipo de tabla/coleccion no válido' }
            });

    }

    promesa.then(data => {

        res.status(200).json({
            ok: true,
            [tabla]: data
        });

    })

});


// ==============================
// Busqueda general
// ==============================
app.get('/todo/:busqueda', (req, res, next) => {

    var busqueda = req.params.busqueda;
    var regex = new RegExp(busqueda, 'i');


    Promise.all([
            buscarSoporte(busqueda, regex),
            buscarEmonitoria(busqueda, regex),
            buscarUsuarios(busqueda, regex)
        ])
        .then(respuestas => {

            res.status(200).json({
                ok: true,
                soporte: respuestas[0],
                emonitoria: respuestas[1],
                usuarios: respuestas[2]
            });
        })


});


function buscarSoporte(busqueda, regex) {


    return new Promise((resolve, reject) => {
        Soporte.find({ lugarmantenimiento: regex })
            // metodo para realizar identificacion de los id en los metodos de busqueda
            .populate('usuario', 'nombre email role')
            .populate('emonitoria')
            .exec((err, soporte) => {
                if (err) {
                    reject('Error al cargar lugar de mantenimiento de soporte', err);

                } else {
                    resolve(soporte)
                }
            });
    });

}

function buscarMedicos(busqueda, regex) {

    return new Promise((resolve, reject) => {

        Medico.find({ nombre: regex })
            .populate('usuario', 'nombre email')
            .populate('hospital')
            .exec((err, medicos) => {

                if (err) {
                    reject('Error al cargar medicos', err);
                } else {
                    resolve(medicos)
                }
            });
    });
}

function buscarUsuarios(busqueda, regex) {

    return new Promise((resolve, reject) => {

        Usuario.find({}, 'nombre email role')
            .or([{ 'nombre': regex }, { 'email': regex }])
            .exec((err, usuarios) => {

                if (err) {
                    reject('Erro al cargar usuarios', err);
                } else {
                    resolve(usuarios);
                }


            })


    });
}



module.exports = app;