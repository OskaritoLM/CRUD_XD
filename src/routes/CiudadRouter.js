const router = require('express').Router();

const mongojs = require('mongojs');
const db = mongojs('RentaAutos', ['Ciudad']);
const { ObjectId } = require('mongojs'); 

router.get('/Ciudad', (req, res, next) => {
    db.Ciudad.find((err, Ciudad) => {
        if (err) return next(err);
        res.json(Ciudad);
    });
});

router.get('/Ciudad/:id', (req, res, next) => {
    db.Ciudad.findOne({ _id: ObjectId(req.params.id) }, (err, Ciudad) => {
        if (err) return next(err);

        if (!Ciudad) {
            return res.status(404).json({ error: 'Ciudad not found' });
        }

        res.json(Ciudad);
    });
});



router.post('/Ciudad', (req, res, next) => {
    const Ciudad = req.body;

    if (!Ciudad.nombre || !Ciudad.pais) {
        return res.status(400).json({
            error: 'Bad data - nombre and pais are required fields'
        });
    } else {
        db.Ciudad.save(Ciudad, (err, savedCiudad) => {
            if (err) return next(err);
            res.json(savedCiudad);
        });
    }
});


router.delete('/Ciudad/:id', (req, res, next) => {
    const CiudadId = req.params.id;

    if (!ObjectId.isValid(CiudadId)) {
        return res.status(400).json({ error: 'Invalid Ciudad ID' });
    }

    db.Ciudad.remove({ _id: ObjectId(CiudadId) }, (err, result) => {
        if (err) return next(err);

        if (result.n === 0) {
            return res.status(404).json({ error: 'Ciudad not found' });
        }

        res.json({ message: 'Ciudad deleted successfully' });
    });
});

router.put('/Ciudad/:id', (req, res, next) => {
    const CiudadId = req.params.id;
    const { nombre, pais,Estado } = req.body;

    if (!ObjectId.isValid(CiudadId)) {
        return res.status(400).json({ error: 'Invalid Ciudad ID' });
    }

    const query = { _id: ObjectId(CiudadId) };
    const update = {
        $set: {
            nombre,
            pais,
            Estado
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