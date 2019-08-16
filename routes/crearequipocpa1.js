var express = require('express');
var mdAutenticacion = require('../middlewares/autenticacion');
var app = express();
var Crearequipocpa1 = require ('../models/crearequipocpa1');

// ==========================================
// Crear un nuevo equipo cp-a
// ==========================================
app.post('/', mdAutenticacion.verificaToken, (req, res) => {

    var body = req.body;

    var crearequipocpa1 = new Crearequipocpa1({
        modulo: body.modulo,
        indicativo: body.indicativo,
        tipo: body.tipo,
        elemento: body.elemento,
        nombre_equipo: body.nombre_equipo,
        fecha: body.fecha,
        numeroequipo: body.numeroequipo,
        viabilidad: body.viabilidad,
        fechaentrega: body.fechaentrega,
        unidad: body.unidad,
        unidadmayor: body.unidadmayor,
        objetivo: body.objetivo,
        estructura: body.estructura,
        blanco: body.blanco,
        operacion: body.operacion,
        subcompania: body.subcompania,
        responsable_material: body.responsable_material,
        contrato: body.contrato,
        modo_bateria: body.modo_bateria,
        fecha_vencimiento_bateria: body.fecha_vencimiento_bateria,
        estado: body.estado,
        fecharegistro: req.fecharegistro,
        fechavencido: req.fechavencido,
        usuario: req.usuario._id,
        oficio: req.oficio,
        crearequipocpa: body.crearequipocpa,

    });

    crearequipocpa1.save((err, equipo1Guardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear equipo en equipoguardado1',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            crearequipocpa1: equipo1Guardado
        });


    });

});
// get para obtener lo que hay en la base de datos 
app.get('/', (req, res, next) => {
    // parametro para paginar desde que registro se quiere
    var desde = req.query.desde || 0;
    desde = Number(desde);
    // ver los equipos  con populate los ID  
    Crearequipocpa1.find({}, )
        // metodo skip 
        .skip(desde)
        // metodo para paginar 
        .limit(5)
        .populate('usuario', 'nombre email')
        //con exec es la funcion para traer solo los datos que necesitamos menos la contraseña
        .exec(

            (err, crearequipocpa1) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'error a la coneccion a la base de datos ',
                        errors: err

                    });
                }


                // conteo de los registros
                Crearequipocpa1.count({}, (err, conteo) => {
                    res.status(200).json({
                        ok: true,
                        crearequipocpa1: crearequipocpa1,
                        total: conteo
                    });

                })
            });

});
//  para actualizar los datos de un usuario con put

app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Crearequipocpa1.findById(id, (err, crearequipocpa1) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'error al buscar un equipo de monitoria ',
                errors: err
            });
        }
        if (!crearequipocpa1) {
            return res.status(400).json({
                ok: false,
                mensaje: 'el equipo con ese Id ' + id + 'no existe',
                errors: { message: 'no existe un equipo con ese id' }
            });
        }

        crearequipocpa1.modulo = body.modulo;
        crearequipocpa1.indicativo = body.indicativo;
        crearequipocpa1.tipo = body.tipo;
        crearequipocpa1.elemento = body.elemento;
        crearequipocpa1.nombre_equipo = body.nombre_equipo;
        crearequipocpa1.numeroequipo = body.numeroequipo;
        crearequipocpa1= req.usuario._id;
        crearequipocpa1.viabilidad = body.viabilidad;
        crearequipocpa1.fechaentrega = body.fechaentrega;
        crearequipocpa1.unidad = body.unidad;
        crearequipocpa1.unidadmayor = body.unidadmayor;
        crearequipocpa1.objetivo = body.objetivo;
        crearequipocpa1.estructura = body.estructura;
        crearequipocpa1.blanco = body.blanco;
        crearequipocpa1.operacion = body.operacion;
        crearequipocpa1.subcompania = body.subcompania;
        crearequipocpa1.responsable_material = body.responsable_material;
        crearequipocpa1.modo_bateria = body.modo_bateria;
        crearequipocpa1.fecha_vencimiento_bateria = body.fecha_vencimiento_bateria;
        crearequipocpa1.estado = body.estado;
        crearequipocpa1.oficio = body.oficio;
        crearequipocpa1.fecharegistro = body.fecharegistro;
        crearequipocpa1.fechavencido = body.fechavencido;

        crearequipocpa1.save((err, crearequipocpa1Guardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'error al actualizar el equipo ',
                    errors: err
                });
            }


            res.status(200).json({
                ok: true,
                crearequipocpa1: crearequipocpa1Guardado
            });
        });

    });

});

// para utilizar este archivo hay que exportarlo

module.exports = app;