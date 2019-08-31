var express = require('express');

var fileUpload = require('express-fileupload');
var fs = require('fs');


var app = express();

var Usuario = require('../models/usuario');
var Emonitoria = require('../models/emonitoria');
var Soporte = require('../models/soporte');
var Crearequipocpa1= require ('../models/crearequipocpa1');


// default options
app.use(fileUpload());




app.put('/:tipo/:id', (req, res, next) => {

    var tipo = req.params.tipo;
    var id = req.params.id;

    // tipos de colección
    var tiposValidos = ['soporte', 'emonitoria', 'usuarios', 'crearequipocpa1'];
    if (tiposValidos.indexOf(tipo) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Tipo de colección no es válida',
            errors: { message: 'Tipo de colección no es válida' }
        });
    }


    if (!req.files) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No selecciono nada',
            errors: { message: 'Debe de seleccionar una archivo' }
        });
    }

    // Obtener nombre del archivo
    var archivo = req.files.imagen;
    var nombreCortado = archivo.name.split('.');
    var extensionArchivo = nombreCortado[nombreCortado.length - 1];

    // Sólo estas extensiones aceptamos
    var extensionesValidas = ['png', 'jpg', 'jpeg', 'pdf'];

    if (extensionesValidas.indexOf(extensionArchivo) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Extension no válida',
            errors: { message: 'Las extensiones válidas son ' + extensionesValidas.join(', ') }
        });
    }

    // Nombre de archivo personalizado
    // 12312312312-123.png
    var nombreArchivo = `${ id }-${ new Date().getMilliseconds() }.${ extensionArchivo }`;


    // Mover el archivo del temporal a un path
    var path = `./uploads/${ tipo }/${ nombreArchivo }`;

    archivo.mv(path, err => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al mover archivo',
                errors: err
            });
        }


        subirPorTipo(tipo, id, nombreArchivo, res);

        // res.status(200).json({
        //     ok: true,
        //     mensaje: 'Archivo movido',
        //     extensionArchivo: extensionArchivo
        // });


    })



});



function subirPorTipo(tipo, id, nombreArchivo, res) {

    if (tipo === 'usuarios') {

        Usuario.findById(id, (err, usuario) => {

            if (!usuario) {
                return res.status(400).json({
                    ok: true,
                    mensaje: 'Usuario no existe',
                    errors: { message: 'Usuario no existe' }
                });
            }


            var pathViejo = './uploads/usuarios/' + usuario.img;

            // Si existe, elimina la imagen anterior
            if (fs.existsSync(pathViejo)) {
                fs.unlink(pathViejo);
            }

            usuario.img = nombreArchivo;

            usuario.save((err, usuarioActualizado) => {

                usuarioActualizado.password = ':)';

                return res.status(200).json({
                    ok: true,
                    mensaje: 'Imagen de usuario actualizada',
                    usuario: usuarioActualizado
                });

            })


        });

    }

    if (tipo === 'emonitoria') {

        Emonitoria.findById(id, (err, emonitoria) => {

            if (!emonitoria) {
                return res.status(400).json({
                    ok: true,
                    mensaje: 'el equipo de monitoria no existe',
                    errors: { message: 'Equipo de monitoria no existe' }
                });
            }

            var pathViejo = './uploads/emonitoria/' + emonitoria.img;

            // Si existe, elimina la imagen anterior
            if (fs.existsSync(pathViejo)) {
                fs.unlink(pathViejo);
            }

            emonitoria.img = nombreArchivo;

            emonitoria.save((err, emonitoriaActualizado) => {

                return res.status(200).json({
                    ok: true,
                    mensaje: 'Imagen de médico actualizada',
                    usuario: emonitoriaActualizado
                });

            })

        });
    }

    if (tipo === 'soporte') {

        Soporte.findById(id, (err, soporte) => {

            if (!soporte) {
                return res.status(400).json({
                    ok: true,
                    mensaje: 'el id del soporte no existe',
                    errors: { message: 'Hospital no existe' }
                });
            }

            var pathViejo = './uploads/soporte/' + soporte.img;

            // Si existe, elimina la imagen anterior
            if (fs.existsSync(pathViejo)) {
                fs.unlink(pathViejo);
            }

            soporte.img = nombreArchivo;

            soporte.save((err, soporteActualizado) => {

                return res.status(200).json({
                    ok: true,
                    mensaje: 'Imagen de soporte actualizada',
                    usuario: soporteActualizado
                });

            })

        });
    }

    if (tipo === 'crearequipocpa1') {

        Crearequipocpa1.findById(id, (err, crearequipocpa1) => {

            if (!crearequipocpa1) {
                return res.status(400).json({
                    ok: true,
                    mensaje: 'el id del soporte equipo cpa  no existe',
                    errors: { message: 'el equipo no existe n' }
                });
            }

            var pathViejo = './uploads/crearequipocpa1/' + crearequipocpa1.img;

            // Si existe, elimina la imagen anterior
            if (fs.existsSync(pathViejo)) {
                fs.unlink(pathViejo);
            }

            crearequipocpa1.img = nombreArchivo;

            crearequipocpa1.save((err, crearequipocpa1Actualizado) => {

                return res.status(200).json({
                    ok: true,
                    mensaje: 'Imagen de soporte actualizada',
                    usuario: crearequipocpa1Actualizado
                });

            })

        });
    }
    


}



module.exports = app;