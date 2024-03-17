const router = require('express').Router();

const mongojs = require('mongojs');
const db = mongojs('RentaAutos', ['Estado']);
const { ObjectId } = require('mongojs'); 

router.get('/Estado', (req, res, next) => {
    db.Estado.find((err, Estado) => {
        if (err) return next(err);
        res.json(Estado);
    });
});

router.get('/Estado/:id', (req, res, next) => {
    db.Estado.findOne({ _id: ObjectId(req.params.id) }, (err, Estado) => {
        if (err) return next(err);

        if (!Estado) {
            return res.status(404).json({ error: 'Estado not found' });
        }

        res.json(Estado);
    });
});



router.post('/Estado', (req, res, next) => {
    const Estado = req.body;

    if (!Estado.nombre || !Estado.pais) {
        return res.status(400).json({
            error: 'Bad data - nombre and pais are required fields'
        });
    } else {
        db.Estado.save(Estado, (err, savedEstado) => {
            if (err) return next(err);
            res.json(savedEstado);
        });
    }
});


router.delete('/Estado/:id', (req, res, next) => {
    const EstadoId = req.params.id;

    if (!ObjectId.isValid(EstadoId)) {
        return res.status(400).json({ error: 'Invalid Estado ID' });
    }

    db.Estado.remove({ _id: ObjectId(EstadoId) }, (err, result) => {
        if (err) return next(err);

        if (result.n === 0) {
            return res.status(404).json({ error: 'Estado not found' });
        }

        res.json({ message: 'Estado deleted successfully' });
    });
});

router.put('/Estado/:id', (req, res, next) => {
    const EstadoId = req.params.id;
    const { nombre, pais } = req.body;

    if (!ObjectId.isValid(EstadoId)) {
        return res.status(400).json({ error: 'Invalid Estado ID' });
    }

    const query = { _id: ObjectId(EstadoId) };
    const update = {
        $set: {
            nombre,
            pais
        }
    };

    db.Estado.updateOne(query, update, (err, result) => {
        if (err) return next(err);

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Estado not found' });
        }

        if (result.modifiedCount === 0) {
            return res.status(304).json({ message: 'No changes made' });
        }

        res.json({ message: 'Estado updated successfully' });
    });
});

module.exports = router;



module.exports = router;