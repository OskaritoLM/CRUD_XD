const router = require('express').Router();
const mongojs = require('mongojs');
const db = mongojs('RentaAutos', ['Usuario']);
const { ObjectId } = require('mongojs');

// Obtener todos los usuarios
router.get('/Usuario', (req, res, next) => {
    db.Usuario.find((err, Usuarios) => {
        if (err) return next(err);
        res.json(Usuarios);
    });
});

// Obtener un usuario por ID
router.get('/Usuario/:id', (req, res, next) => {
    db.Usuario.findOne({ _id: ObjectId(req.params.id) }, (err, Usuario) => {
        if (err) return next(err);

        if (!Usuario) {
            return res.status(404).json({ error: 'Usuario not found' });
        }

        res.json(Usuario);
    });
});

// Crear un nuevo usuario
router.post('/Usuario', (req, res, next) => {
    const usuarioData = req.body;

    if (!usuarioData.nombre || !usuarioData.apellidos || !usuarioData.correo || !usuarioData.contrasena || !usuarioData.telefono || !usuarioData.lugarS || !usuarioData.rol) {
        return res.status(400).json({
            error: 'Bad data - nombre, apellidos, correo, contrasena, telefono, lugarS, and rol are required fields'
        });
    } else {
        db.Usuario.save(usuarioData, (err, savedUsuario) => {
            if (err) return next(err);
            res.json(savedUsuario);
        });
    }
});

// Eliminar un usuario por ID
router.delete('/Usuario/:id', (req, res, next) => {
    const UsuarioId = req.params.id;

    if (!ObjectId.isValid(UsuarioId)) {
        return res.status(400).json({ error: 'Invalid Usuario ID' });
    }

    db.Usuario.remove({ _id: ObjectId(UsuarioId) }, (err, result) => {
        if (err) return next(err);

        if (result.n === 0) {
            return res.status(404).json({ error: 'Usuario not found' });
        }

        res.json({ message: 'Usuario deleted successfully' });
    });
});

// Actualizar un usuario por ID
router.put('/Usuario/:id', (req, res, next) => {
    const UsuarioId = req.params.id;
    const { nombre, apellidos, correo, contrasena, telefono, lugarS, rol } = req.body;

    if (!ObjectId.isValid(UsuarioId)) {
        return res.status(400).json({ error: 'Invalid Usuario ID' });
    }

    const query = { _id: ObjectId(UsuarioId) };
    const update = {
        $set: {
            nombre,
            apellidos,
            correo,
            contrasena,
            telefono,
            lugarS,
            rol
        }
    };

    db.Usuario.updateOne(query, update, (err, result) => {
        if (err) return next(err);

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Usuario not found' });
        }

        if (result.modifiedCount === 0) {
            return res.status(304).json({ message: 'No changes made' });
        }

        res.json({ message: 'Usuario updated successfully' });
    });
});

module.exports = router;
