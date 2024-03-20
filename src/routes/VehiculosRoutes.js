const router = require('express').Router();
const { error } = require('console');
const mongojs = require('mongojs');
const db = mongojs('RentaAutos', ['Vehiculo']);
const { ObjectId } = require('mongojs'); 

router.get('/Vehiculo', (req, res, next) => {
    db.Vehiculo.find((err, Vehiculo) => {
        if (err) return next(err);
        res.json(Vehiculo);
    });
});

router.get('/Vehiculo/:id', (req, res, next) => {
    db.Vehiculo.findOne({ _id: mongojs.ObjectId(req.params.id) }, (err, vehiculo) => {
        if (err) return next(err);

        if (!vehiculo) {
            // If vehiculo is null, return a 404 status code
            return res.status(404).json({ error: 'Vehiculo not found' });
        }

        res.json(vehiculo);
    });
});



router.post('/Vehiculo', (req, res, next) => {
    const vehiculo = req.body;

    // Check for missing required fields
    if (!vehiculo.marca || !vehiculo.modelo) {
        return res.status(400).json({
            error: 'Bad data - marca and modelo are required fields'
        });
    } else {
        // Save the vehiculo to the database
        db.Vehiculo.save(vehiculo, (err, savedVehiculo) => {
            if (err) return next(err);
            res.json(savedVehiculo);
        });
    }
});


router.delete('/Vehiculo/:id', (req, res, next) => {
    const vehiculoId = req.params.id;

    // Check if vehiculoId is a valid ObjectId
    if (!ObjectId.isValid(vehiculoId)) {
        return res.status(400).json({ error: 'Invalid Vehiculo ID' });
    }

    db.Vehiculo.remove({ _id: ObjectId(vehiculoId) }, (err, result) => {
        if (err) return next(err);

        if (result.n === 0) {
            // If no document was deleted, it might not exist
            return res.status(404).json({ error: 'Vehiculo not found' });
        }

        res.json({ message: 'Vehiculo deleted successfully' });
    });
});



router.put('/Vehiculo/:id', (req, res, next) => {
    const vehiculoId = req.params.id;
    const { imagen, marca, modelo, placas, asientos, maletas, tipoCaja, tipoVehiculo, cantVehiculos, categoria, precioDia, anio } = req.body;

    // Check if vehiculoId is a valid ObjectId
    if (!ObjectId.isValid(vehiculoId)) {
        return res.status(400).json({ error: 'Invalid Vehiculo ID' });
    }

    const query = { _id: ObjectId(vehiculoId) };
    const update = {
        $set: {
            imagen,
            marca,
            modelo,
            placas,
            asientos,
            maletas,
            tipoCaja,
            tipoVehiculo,
            cantVehiculos,
            categoria,
            precioDia,
            anio
        }
    };

    db.Vehiculo.updateOne(query, update, (err, result) => {
        if (err) return next(err);

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Vehiculo not found' });
        }

        if (result.modifiedCount === 0) {
            return res.status(304).json({ message: 'No changes made' });
        }

        res.json({ message: 'Vehiculo updated successfully' });
    });
});




module.exports = router;