const router = require('express').Router();
const mongojs = require('mongojs');
const multer = require('multer');
const db = mongojs('RentaAutos', ['Reserva']);
const { ObjectId } = require('mongojs');

// Configuración de Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/') 
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
});

const upload = multer({ storage: storage });

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
router.post('/Reserva', upload.fields([{ name: 'license', maxCount: 1 }, { name: 'identification', maxCount: 1 }]), (req, res, next) => {
    console.log("Datos req.body ", req.body); 
    const reservaData = req.body;
    const licenseFile = req.files['license'][0]; 
    const identificationFile = req.files['identification'][0]; 

    if (!reservaData.cliente || !reservaData.correo || !reservaData.telefono || !reservaData.lugarS || !reservaData.fechasS || !reservaData.horasS || !reservaData.fechasE || !reservaData.horasE || !reservaData.lugarE || !reservaData.total || !reservaData.vehiculo) {
        return res.status(400).json({
            error: 'Bad data - cliente, correo, telefono, lugarS, fechasS, horasS, fechasE, horasE, lugarE, estatusR, total and vehiculo are required fields'
        });
    } else if (!licenseFile || !identificationFile) { // Verificar si los archivos están presentes
        return res.status(400).json({
            error: 'License and identification files are required'
        });
    } else {
        db.Reserva.save({ ...reservaData, license: licenseFile.path, identification: identificationFile.path }, (err, savedReserva) => {
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
    const { cliente, correo, telefono, lugarS, fechasS, horasS, fechasE, horasE, lugarE, estatusR, total, vehiculo, descuento} = req.body;

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
            fechasE, 
            horasE, 
            lugarE, 
            estatusR, 
            total,
            vehiculo,
            descuento
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
