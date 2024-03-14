const router = require('express').Router();
const mongojs = require('mongojs');
const db = mongojs('RentaAutos', ['Reserva']);
const { ObjectId } = require('mongojs');

// // Obtener todas las reservas
router.get('/Reserva', (req, res, next) => {
     db.Reserva.find((err, Reserva) => {
         if (err) return next(err);
         res.json(Reserva);
     });
 });

// Obtener una reserva por ID
router.get('/Reserva/:id', (req, res, next) => {
    db.Reserva.findOne({ _id: mongojs.ObjectId(req.params.id) }, (err, Reserva) => {
        if (err) return next(err);

        if (!Reserva) {
            return res.status(404).json({ error: 'Reserva not found' });
        }

        res.json(Reserva);
    });
});

// Crear una nueva reserva
router.post('/Reserva', (req, res, next) => {
    const reservaData = req.body;

    if (!reservaData.cliente || !reservaData.correo || !reservaData.telefono || !reservaData.lugarS || !reservaData.fechasS || !reservaData.horasS || !reservaData.FechasE || !reservaData.HorasE || !reservaData.lugarE || !reservaData.estatusR || !reservaData.total || !reservaData.vehiculo) {
        return res.status(400).json({
            error: 'Bad data - cliente, correo, telefono, lugarS, fechasS, horasS, FechasE, HorasE, lugarE, estatusR, total and vehiculo are required fields'
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
    const reservaId = req.params.id;
    const { cliente, correo, telefono, lugarS, fechasS, horasS, FechasE, HorasE, lugarE, estatusR, total, vehiculo} = req.body;

    if (!ObjectId.isValid(reservaId)) {
        return res.status(400).json({ error: 'Invalid Reserva ID' });
    }

    const query = { _id: ObjectId(reservaId) };
    const update = {
        $set: {
            cliente, 
            correo, 
            telefono, 
            lugarS, fechasS, 
            horasS, 
            FechasE, 
            HorasE, 
            lugarE, 
            estatusR, 
            total,
            vehiculo
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
