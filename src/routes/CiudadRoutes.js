const router = require('express').Router();

const mongojs = require('mongojs');
const db = mongojs('minsaitAngularmongodb://127.0.0.1:27017/', ['Ciudad']);
const { ObjectId } = require('mongojs'); 

router.get('/Ciudad', (req, res, next) => {
    db.Ciudad.find((err, Ciudad) => {
        if (err) return next(err);
        res.json(Ciudad);
    });
});

router.get('/Ciudad/:id', (req, res, next) => {
    db.Ciudad.findOne({ _id: ObjectId(req.params.id) }, (err, ciudad) => {
        if (err) return next(err);

        if (!ciudad) {
            return res.status(404).json({ error: 'Ciudad not found' });
        }

        res.json(ciudad);
    });
});



router.post('/Ciudad', (req, res, next) => {
    const ciudad = req.body;

    if (!ciudad.nombre || !ciudad.pais) {
        return res.status(400).json({
            error: 'Bad data - nombre and pais are required fields'
        });
    } else {
        db.Ciudad.save(ciudad, (err, savedCiudad) => {
            if (err) return next(err);
            res.json(savedCiudad);
        });
    }
});


router.delete('/Ciudad/:id', (req, res, next) => {
    const ciudadId = req.params.id;

    if (!ObjectId.isValid(ciudadId)) {
        return res.status(400).json({ error: 'Invalid Ciudad ID' });
    }

    db.Ciudad.remove({ _id: ObjectId(ciudadId) }, (err, result) => {
        if (err) return next(err);

        if (result.n === 0) {
            return res.status(404).json({ error: 'Ciudad not found' });
        }

        res.json({ message: 'Ciudad deleted successfully' });
    });
});

router.put('/Ciudad/:id', (req, res, next) => {
    const ciudadId = req.params.id;
    const { nombre, pais } = req.body;

    if (!ObjectId.isValid(ciudadId)) {
        return res.status(400).json({ error: 'Invalid Ciudad ID' });
    }

    const query = { _id: ObjectId(ciudadId) };
    const update = {
        $set: {
            nombre,
            pais
        }
    };

    db.Ciudad.updateOne(query, update, (err, result) => {
        if (err) return next(err);

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Ciudad not found' });
        }

        if (result.modifiedCount === 0) {
            return res.status(304).json({ message: 'No changes made' });
        }

        res.json({ message: 'Ciudad updated successfully' });
    });
});

module.exports = router;



module.exports = router;