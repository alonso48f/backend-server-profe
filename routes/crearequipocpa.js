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
// get para obtener lo que hay en la base de datos 
app.get('/', (req, res, next) => {
    // parametro para paginar desde que registro se quiere
    var desde = req.query.desde || 0;
    desde = Number(desde);
    // ver los equipos  con populate los ID  
    Crearequipocpa.find({}, )
        // metodo skip 
        .skip(desde)
        // metodo para paginar 
        .limit(10)
        .populate('usuario', 'nombre email')
        //con exec es la funcion para traer solo los datos que necesitamos menos la contraseña
        .exec(

            (err, crearequipocpa) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'error a la coneccion a la base de datos ',
                        errors: err

                    });
                }


                // conteo de los registros
                Crearequipocpa.count({}, (err, conteo) => {
                    res.status(200).json({
                        ok: true,
                        crearequipocpa: crearequipocpa,
                        total: conteo
                    });

                })
            });

});

// ==========================================
// Obtener crearequipocpa1 por ID
// ==========================================
app.get('/:id', (req, res) => {
    var id = req.params.id;
    Crearequipocpa.findById(id)
    .populate('usuario', 'nombre img email')
    .exec((err, crearequipocpa) => {
    if (err) {
    return res.status(500).json({
    ok: false,
    mensaje: 'Error al buscar el soporte cp-a',
    errors: err
    });
    }
    if (!crearequipocpa) {
    return res.status(400).json({
    ok: false,
    mensaje: 'El equipo cp-a con el id ' + id + 'no existe',
errors: { message: 'No existe un equipo cp-a cpa ese ID' }
});
}
res.status(200).json({
ok: true,
crearequipocpa: crearequipocpa
});
})
})

// ==========================================
// Obtener los equipos  por ID
// ==========================================
app.get('/:id', (req, res) => {
    var id = req.params.id;
    Crearequipocpa.findById(id)
        .populate('usuario', 'esn auth ')
        .exec((err, crearequipocpa) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar el equipo ',
                    errors: err
                });
            }
            if (!crearequipocpa) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El equipo con el id ' + id + 'no existe',
                    errors: {
                        message: 'No existe un equipo con ese ID '
                    }
                });
            }
            res.status(200).json({
                ok: true,
                crearequipocpa: crearequipocpa
            });
        })
})


//  para actualizar los datos de un usuario con put

app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;

    Crearequipocpa.findById(id, (err, crearequipocpa) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'error al buscar un equipo de monitoria ',
                errors: err
            });
        }
        if (!crearequipocpa) {
            return res.status(400).json({
                ok: false,
                mensaje: 'el equipo con ese Id ' + id + 'no existe',
                errors: { message: 'no existe un equipo con ese id' }
            });
        }

        crearequipocpa.esn = body.esn;
        crearequipocpa.auth = body.auth;
        crearequipocpa.contrato = body.contrato;
        crearequipocpa.year = body.year;
        crearequipocpa.fecharegistro = body.fecharegistro;
        crearequipocpa.fechavencido = body.fechavencido;
        crearequipocpa.usuario = req.usuario._id;

        crearequipocpa.save((err, crearequipocpaGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'error al actualizar el equipo ',
                    errors: err
                });
            }


            res.status(200).json({
                ok: true,
                crearequipocpa: crearequipocpaGuardado
            });
        });

    });

});


// metodo para eliminar un id

app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {

    //obtenemos el id con una variable
    var id = req.params.id;
    Crearequipocpa.findByIdAndRemove(id, (err, crearequipocpaBorrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'error al eliminar el equipo ',
                errors: err
            });
        }

        if (!crearequipocpaBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'no existe un equipo con ese id ',
                errors: { message: 'no existe un equipo con ese id ' }
            });
        }

        res.status(200).json({
            ok: true,
            crearequipocpa: crearequipocpaBorrado
        });
    });

});

// para utilizar este archivo hay que exportarlo

module.exports = app;

