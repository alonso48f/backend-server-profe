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

    var crearequipocpa = new Crearequipocpa({
        esn: body.esn,
        auth: body.auth,
        contrato: body.contrato,
        year: body.year,
        fecharegistro: body.fecharegistro,
        fechavencido: body.fechavencido,
        usuario: req.usuario._id
    });

    crearequipocpa.save((err, equipoGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear equipo',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            crearequipocpa: equipoGuardado
        });


    });

});
