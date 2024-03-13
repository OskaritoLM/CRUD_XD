const router = require('express').Router();
const mongojs = require('mongojs');
const db = mongojs('minsaitAngularmongodb://127.0.0.1:27017/', ['Reserva']);
const { ObjectId } = require('mongojs');

// // Obtener todas las reservas
router.get('/Reserva', (req, res, next) => {
     db.Reserva.find((err, reservas) => {
         if (err) return next(err);
         res.json(reservas);
     });
 });

// Obtener una reserva por ID
router.get('/Reserva/:id', (req, res, next) => {
    db.Reserva.findOne({ _id: ObjectId(req.params.id) }, (err, reserva) => {
        if (err) return next(err);

        if (!reserva) {
            return res.status(404).json({ error: 'Reserva not found' });
        }

        res.json(reserva);
    });
});

// Crear una nueva reserva
router.post('/Reserva', (req, res, next) => {
    const reservaData = req.body;

    if (!reservaData.lugarS || !reservaData.FechaS || !reservaData.HoraS || !reservaData.LugarE || !reservaData.FechaE || !reservaData.HoraE || !reservaData.Edad || !reservaData.Vehiculo || !reservaData.nombre || !reservaData.apellidos || !reservaData.Pais || !reservaData.telefono || !reservaData.correo) {
        return res.status(400).json({
            error: 'Bad data - lugarS, FechaS, HoraS, lugarE, FechaE, HoraE, Edad, Vehiculo, nombre, apellidos, pais, telefono and correo are required fields'
        });
    } else {
        db.Reserva.save(reservaData, (err, savedReserva) => {
            if (err) return next(err);
            res.json(savedReserva);
        });
    }
});


// Eliminar una reserva por ID
router.delete('/Reserva/:id', (req, res, next) => {
    const reservaId = req.params.id;

    if (!ObjectId.isValid(reservaId)) {
        return res.status(400).json({ error: 'Invalid Reserva ID' });
    }

    db.Reserva.remove({ _id: ObjectId(reservaId) }, (err, result) => {
        if (err) return next(err);

        if (result.n === 0) {
            return res.status(404).json({ error: 'Reserva not found' });
        }

        res.json({ message: 'Reserva deleted successfully' });
    });
});

// Actualizar una reserva por ID
router.put('/Reserva/:id', (req, res, next) => {
    const ReservaId = req.params.id;
    const { lugarS, FechaS, HoraS, LugarE, FechaE, HoraE, Edad,Vehiculo, nombre, apellidos, Pais, telefono,correo} = req.body;

    if (!ObjectId.isValid(ReservaId)) {
        return res.status(400).json({ error: 'Invalid Reserva ID' });
    }

    const query = { _id: ObjectId(ReservaId) };
    const update = {
        $set: {
            FechaS,
            HoraS,
            LugarE,
            FechaE,
            HoraE,
            Edad,
            Vehiculo,
            nombre,
            apellidos,
            Pais,
            telefono,
            correo
        }
    };


    db.Reserva.updateOne(query, update, (err, result) => {
        if (err) return next(err);

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Reserva not found' });
        }

        if (result.modifiedCount === 0) {
            return res.status(304).json({ message: 'No changes made' });
        }

        res.json({ message: 'Reserva updated successfully' });
    });
});

module.exports = router;
