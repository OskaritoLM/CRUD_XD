const router = require('express').Router();
const mongojs = require('mongojs');
const db = mongojs('minsaitAngularmongodb://127.0.0.1:27017/', ['Lugar']);
const { ObjectId } = require('mongojs');

// Obtener todos los lugares
router.get('/Lugar', (req, res, next) => {
    db.Lugar.find((err, Lugares) => {
        if (err) return next(err);
        res.json(Lugares);
    });
});

// Obtener un lugar por ID
router.get('/Lugar/:id', (req, res, next) => {
    db.Lugar.findOne({ _id: ObjectId(req.params.id) }, (err, Lugar) => {
        if (err) return next(err);

        if (!Lugar) {
            return res.status(404).json({ error: 'Lugar not found' });
        }

        res.json(Lugar);
    });
});

// Crear un nuevo lugar
router.post('/Lugar', (req, res, next) => {
    const Lugar = req.body;

    if (!Lugar.nombre || !Lugar.direccion || !Lugar.pais || !Lugar.ciudad) {
        return res.status(400).json({
            error: 'Bad data - nombre, direccion, pais, and ciudad are required fields'
        });
    } else {
        db.Lugar.save(Lugar, (err, savedLugar) => {
            if (err) return next(err);
            res.json(savedLugar);
        });
    }
});

// Eliminar un lugar por ID
router.delete('/Lugar/:id', (req, res, next) => {
    const LugarId = req.params.id;

    if (!ObjectId.isValid(LugarId)) {
        return res.status(400).json({ error: 'Invalid Lugar ID' });
    }

    db.Lugar.remove({ _id: ObjectId(LugarId) }, (err, result) => {
        if (err) return next(err);

        if (result.n === 0) {
            return res.status(404).json({ error: 'Lugar not found' });
        }

        res.json({ message: 'Lugar deleted successfully' });
    });
});

// Actualizar un lugar por ID
router.put('/Lugar/:id', (req, res, next) => {
    const LugarId = req.params.id;
    const { nombre, direccion, pais, ciudad } = req.body;

    if (!ObjectId.isValid(LugarId)) {
        return res.status(400).json({ error: 'Invalid Lugar ID' });
    }

    const query = { _id: ObjectId(LugarId) };
    const update = {
        $set: {
            nombre,
            direccion,
            pais,
            ciudad
        }
    };

    db.Lugar.updateOne(query, update, (err, result) => {
        if (err) return next(err);

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Lugar not found' });
        }

        if (result.modifiedCount === 0) {
            return res.status(304).json({ message: 'No changes made' });
        }

        res.json({ message: 'Lugar updated successfully' });
    });
});

module.exports = router;
