var express = require('express');

var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();

// llamamos el modelo crearequipocpa
var Crearequipocpa = require ('../models/crearequipocpa');

// ==========================================
// Obtener todos los equipos de la cp-a
// ==========================================


// ==========================================
// Crear un nuevo equipo cp-a
// ==========================================
app.post('/', mdAutenticacion.verificaToken, (req, res) => {

    var body = req.body;

    var hospital = new Hospital({
        nombre: body.nombre,
        usuario: req.usuario._id
    });

    hospital.save((err, hospitalGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear hospital',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            hospital: hospitalGuardado
        });


    });

});
