const router = require('express').Router();

const mongojs = require('mongojs');
const db = mongojs('RentaAutos', ['Pais']);
const { ObjectId } = require('mongojs'); 

router.get('/Pais', (req, res, next) => {
    db.Pais.find((err, Pais) => {
        if (err) return next(err);
        res.json(Pais);
    });
});

router.get('/Pais/:id', (req, res, next) => {
    db.Pais.findOne({ _id: mongojs.ObjectId(req.params.id) }, (err, Pais) => {
        if (err) return next(err);

        if (!Pais) {
            // If vehiculo is null, return a 404 status code
            return res.status(404).json({ error: 'Pais not found' });
        }

        res.json(Pais);
    });
});


router.post('/Pais', (req, res, next) => {
    const Pais = req.body;

    // Check for missing required fields
    if (!Pais.nombre) {
        return res.status(400).json({
            error: 'Bad data - nombre is a required field'
        });
    } else {
        // Save the Pais to the database
        db.Pais.save(Pais, (err, savedPais) => {
            if (err) return next(err);
            res.json(savedPais);
        });
    }
});

router.delete('/Pais/:id', (req, res, next) => {
    const paisId = req.params.id;

    // Check if paisId is a valid ObjectId
    if (!ObjectId.isValid(paisId)) {
        return res.status(400).json({ error: 'Invalid Pais ID' });
    }

    db.Pais.remove({ _id: ObjectId(paisId) }, (err, result) => {
        if (err) return next(err);

        if (result.n === 0) {
            // If no document was deleted, it might not exist
            return res.status(404).json({ error: 'Pais not found' });
        }

        res.json({ message: 'Pais deleted successfully' });
    });
});

router.put('/Pais/:id', (req, res, next) => {
    const paisId = req.params.id;
    const { nombre } = req.body;

    // Check if paisId is a valid ObjectId
    if (!ObjectId.isValid(paisId)) {
        return res.status(400).json({ error: 'Invalid Pais ID' });
    }

    const query = { _id: ObjectId(paisId) };
    const update = {
        $set: {
            nombre
        }
    };

    db.Pais.updateOne(query, update, (err, result) => {
        if (err) return next(err);

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Pais not found' });
        }

        if (result.modifiedCount === 0) {
            return res.status(304).json({ message: 'No changes made' });
        }

        res.json({ message: 'Pais updated successfully' });
    });
});


module.exports = router;