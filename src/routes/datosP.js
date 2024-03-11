const router =require('express').Router();
const mongojs= require('mongojs');
const db = mongojs('mongodb://127.0.0.1:27017/minsaitAngular',['datosP']);
const ObjectId = require('mongodb').ObjectId;


router.get('/datosP',(req,res,next)=>{
    db.datosP.find((err,datosP) => {
        if(err) return next(err);
        res.json(datosP);
    });
});

router.get('/datosP/:id', (req, res, next) => {
    db.datosP.findOne({ _id: mongojs.ObjectId(req.params.id) }, (err, datosP) => {
        if (err) return next(err);

        if (!datosP) {
            // If vehiculo is null, return a 404 status code
            return res.status(404).json({ error: 'datosP not found' });
        }

        res.json(datosP);
    });
});

router.post('/datosP', (req, res, next) => {
    const datosP = req.body; // Esta línea es crucial para obtener los datos enviados en el cuerpo de la solicitud.

    // Ahora puedes verificar si los campos necesarios están presentes y no están vacíos.
    if (!datosP.telefono || !(datosP.sexo + '')) {
        res.status(400).json({
            error: 'Bad data'
        });
    } else {
        db.datosP.save(datosP, (err, datosPSaved) => {
            if (err) return next(err);
            res.json(datosPSaved); // Envía el documento guardado como respuesta.
        });
    }
});

 router.delete('/datosP/:id', (req, res, next) => {
    const datosPID = req.params.id;

    // Check if vehiculoId is a valid ObjectId
    if (!ObjectId.isValid(datosPID)) {
        return res.status(400).json({ error: 'Invalid DatosP id' });
    }

    db.datosP.remove({ _id: ObjectId(datosPID) }, (err, result) => {
        if (err) return next(err);

        if (result.n === 0) {
            // If no document was deleted, it might not exist
            return res.status(404).json({ error: 'Vehiculo not found' });
        }

        res.json({ message: 'Vehiculo deleted successfully' });
    });
});

router.put('/datosP/:id', (req, res, next) => {
    const datosPId = req.params.id;
    const { telefono,dateNac, sexo, cp, pais, estado, ciudad} = req.body;

    // Check if vehiculoId is a valid ObjectId
    if (!ObjectId.isValid(datosPId)) {
        return res.status(400).json({ error: 'Invalid datosP ID' });
    }

    const query = { _id: ObjectId(datosPId) };
    const update = {
        $set: {
            telefono,
            dateNac, 
            sexo, cp, 
            pais,
            estado, 
            ciudad
        }
    };

    db.datosP.updateOne(query, update, (err, result) => {
        if (err) return next(err);

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'datosP not found' });
        }

        if (result.modifiedCount === 0) {
            return res.status(304).json({ message: 'No changes made' });
        }

        res.json({ message: 'datosP updated successfully' });
    });
});


module.exports=router;