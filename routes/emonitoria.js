var express = require('express');
var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();




// hay que importar el modelo usuario para traer todas sus caracteristicas
var Emonitoria = require('../models/emonitoria');
//var SEED = require('../config/config').SEED;
var mdAutenticacion = require('../middlewares/autenticacion');

// ruta principal 

// get para obtener lo que hay en la base de datos 
app.get('/', (req, res, next) => {
    // parametro para paginar desde que registro se quiere
    var desde = req.query.desde || 0;
    desde = Number(desde);
// ver los equipos  con populate los ID  
    Emonitoria.find({}, )
    // metodo skip 
    .skip(desde)
    // metodo para paginar 
    .limit(5)
    .populate('usuario','nombre email')
        //con exec es la funcion para traer solo los datos que necesitamos menos la contraseña
        .exec(

            (err, emonitorias) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'error a la coneccion a la base de datos ',
                        errors: err

                    });
                }


                // conteo de los registros
                Emonitoria.count({},(err,conteo) => {
                    res.status(200).json({
                        ok: true,
                        emonitoria: emonitorias,
                        total: conteo
                    });

                })
            });

});



//  para actualizar los datos de un usuario con put

app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Emonitoria.findById(id, (err, emonitoria) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'error al buscar un equipo de monitoria ',
                errors: err
            });
        }
        if (!emonitoria) {
            return res.status(400).json({
                ok: false,
                mensaje: 'el emonitoria con ese Id ' + id + 'no existe',
                errors: { message: 'no existe un emonitoria con ese id' }
            });
        }

        emonitoria.placa = body.placa;
        emonitoria.ninventario = body.ninventario;
        emonitoria.nserie = body.nserie;
        emonitoria.fadquisicion = body.fadquisicion;
        emonitoria.fvidautil = body.fvidautil;
        emonitoria.obs = body.obs;
        emonitoria.usuario = req.usuario._id;

        emonitoria.save((err, emonitoriaGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'error al actualizar el equipo ',
                    errors: err
                });
            }


            res.status(200).json({
                ok: true,
                emonitoria: emonitoriaGuardado
            });
        });

    });

});
// crear nuevo equipo recordar la libreria body parser para que funcione
app.post('/', mdAutenticacion.verificaToken, (req, res) => {
    var body = req.body;

    // grabacion a la base de datos con mongoose
    var emonitoria = new Emonitoria({
        placa: body.placa,
        ninventario: body.ninventario,
        nserie: body.nserie,
        fadquisicion: body.fadquisicion,
        fvidautil: body.fvidautil,
        obs: body.obs,
        usuario: req.usuario._id,
    });
    // para guardar los datos 
    emonitoria.save((err, emonitoriaGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'error al guardar los datos en mongodb ',
                errors: err
            });
        }
        res.status(201).json({
            ok: true,
            emonitoria: emonitoriaGuardado,

        });
    });

});


//  para actualizar los datos de un usuario con put

app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Emonitoria.findById(id, (err, usuario) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'error al buscar un equipo de monitoria ',
                errors: err
            });
        }
        if (!emonitoria) {
            return res.status(400).json({
                ok: false,
                mensaje: 'el equipo de monitoria con ese Id ' + id + 'no existe',
                errors: { message: 'no existe un equipo de monitoria con ese id' }
            });
        }

        emonitoria.placa = body.placa;
        emonitoria.ninventario = body.ninventario;
        emonitoria.nserie = body.nserie;
        emonitoria.fadquisicion = body.fadquisicion;
        emonitoria.fvidautil = body.fvidautil;
        emonitoria.obs = body.obs;
        emonitoria.usuario = req.usuario._id;

        emonitoria.save((err, emonitoriaGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'error al actualizar usuario ',
                    errors: err
                });
            }
            res.status(200).json({
                ok: true,
                usuario: usuarioGuardado
            });
        });

    });

});

// metodo para eliminar un id

app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {

    //obtenemos el id con una variable
    var id = req.params.id;
    Emonitoria.findByIdAndRemove(id, (err, emonitoriaBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'error al eliminar el equipo ',
                errors: err
            });
        }

        if (!emonitoriaBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'no existe un equipo con ese id ',
                errors: { message: 'no existe un equipo con ese id ' }
            });
        }

        res.status(200).json({
            ok: true,
            emonitoria: emonitoriaBorrado
        });
    });

});

// para utilizar este archivo hay que exportarlo

module.exports = app;