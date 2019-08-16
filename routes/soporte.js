var express = require('express');
var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();




// hay que importar el modelo usuario para traer todas sus caracteristicas
var Soporte = require('../models/soporte');
//var SEED = require('../config/config').SEED;


// ruta principal 

// get para obtener lo que hay en la base de datos de soporte 
app.get('/', (req, res, next) => {
    // parametro para paginar desde que registro se quiere
    var desde = req.query.desde || 0;
    desde = Number(desde);
// metodo para listar los equipos de monitoria emonitoria 
    Soporte.find({}, )
    .populate('usuario', 'nombre email')
    // metodo skip 
    .skip(desde)
    // metodo para paginar 
    .limit(5)
    .populate('emonitoria')
        //con exec es la funcion para traer solo los datos que necesitamos menos la contraseña
        .exec(

            (err, soportes) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'error a la coneccion a la base de daros ',
                        errors: err

                    });
                }

// conteo de los registros
Soporte.count({},(err,conteo) => {
    res.status(200).json({
        ok: true,
        soporte: soportes,
        total: conteo
    });

})
            });

});



//  editar soporte tecnico 

app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Soporte.findById(id, (err, soporte) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'error al buscar un equipo de soporte',
                errors: err
            });
        }
        if (!soporte) {
            return res.status(400).json({
                ok: false,
                mensaje: 'el soporte con ese Id ' + id + 'no existe',
                errors: { message: 'no existe un equipo de monitoria con ese id' }
            });
        }

        soporte.ordenservicio = body.ordenservicio;
        soporte.soporteusuario = body.soporteusuario;
        soporte.tecnico = body.tecnico;
        soporte.lugarmantenimiento = body.lugarmantenimiento;
        soporte.oficioentrega = body.oficioentrega;
        soporte.fingreso = body.fingreso;
        soporte.fsalida = body.oficioentrega;
        soporte.estado = body.estado;
        soporte.obs = body.obs;
        soporte.usuario = req.usuario._id;
        soporte.emonitoria =  body.emonitoria;

        soporte.save((err, soporteGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'error al actualizar el equipo ',
                    errors: err
                });
            }


            res.status(200).json({
                ok: true,
                soporte: soporteGuardado
            });
        });

    });

});
// crear nuevo soporte recordar la libreria body parser para que funcione
app.post('/', mdAutenticacion.verificaToken, (req, res) => {
    var body = req.body;

    // grabacion a la base de datos con mongoose
    var soporte = new Soporte({
        ordenservicio: body.ordenservicio,
        soporteusuario: body.soporteusuario,
        tecnico: body.tecnico,
        lugarmantenimiento: body.lugarmantenimiento,
        oficioentrega: body.oficioentrega,
        fingreso: body.fingreso,
        fsalida: body.fsalida,
        estado: body.estado,
        obs: body.obs,
        usuario: req.usuario._id,
        emonitoria: body.emonitoria
    });
    // para guardar los datos 
    soporte.save((err, soporteGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'error al guardar los datos en mongodb ',
                errors: err
            });
        }
        res.status(201).json({
            ok: true,
            soporte: soporteGuardado,

        });
    });

});


//  para actualizar los datos de un usuario con put

app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Soporte.findById(id, (err, usuario) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'error al buscar un soporte ',
                errors: err
            });
        }
        if (!soporte) {
            return res.status(400).json({
                ok: false,
                mensaje: 'el soporte con ese Id ' + id + 'no existe',
                errors: { message: 'no existe un soporte con ese id' }
            });
        }

        soporte.ordenservicio = body.ordenservicio;
        soporte.soporteusuario = body.soporteusuario;
        soporte.tecnico = body.tecnico;
        soporte.lugarmantenimiento = body.lugarmantenimiento;
        soporte.oficioentrega = body.oficioentrega;
        soporte.fingreso = body.fingreso;
        soporte.fsalida = body.oficioentrega;
        soporte.estado = body.estado;
        soporte.obs = body.obs;
        soporte.usuario = req.usuario._id;
        soporte.emonitoria = body.emonitoria;

        soporte.save((err, soporteGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'error al actualizar soporte ',
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
    Soporte.findByIdAndRemove(id, (err, soporteBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'error al eliminar el soporte ',
                errors: err
            });
        }

        if (!soporteBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'no existe un soporte con ese id ',
                errors: { message: 'no existe un soporte con ese id ' }
            });
        }

        res.status(200).json({
            ok: true,
            soporte: soporteBorrado
        });
    });

});

// para utilizar este archivo hay que exportarlo

module.exports = app;