const router = require('express').Router();
const mongojs = require('mongojs');
const db = mongojs('RentaAutos', [ 'Categoria']);
const { ObjectId } = require('mongojs');

// Obtener todos los países
router.get('/Categoria', (req, res, next) => {
    db.Categoria.find((err, Categoriaes) => {
        if (err) return next(err);
        res.json(Categoriaes);
    });
});

// Obtener un país por ID
router.get('/Categoria/:id', (req, res, next) => {
    db.Categoria.findOne({ _id: ObjectId(req.params.id) }, (err, Categoria) => {
        if (err) return next(err);

        if (!Categoria) {
            return res.status(404).json({ error: 'Categoria not found' });
        }

        res.json(Categoria);
    });
});

// Crear un nuevo país
router.post('/Categoria', (req, res, next) => {
    const Categoria = req.body;

    if (!Categoria.nombre) {
        return res.status(400).json({
            error: 'Bad data - nombre is a required field'
        });
    } else {
        db.Categoria.save(Categoria, (err, savedCategoria) => {
            if (err) return next(err);
            res.json(savedCategoria);
        });
    }
});

// Eliminar un país por ID
router.delete('/Categoria/:id', (req, res, next) => {
    const CategoriaId = req.params.id;

    if (!ObjectId.isValid(CategoriaId)) {
        return res.status(400).json({ error: 'Invalid Categoria ID' });
    }

    db.Categoria.remove({ _id: ObjectId(CategoriaId) }, (err, result) => {
        if (err) return next(err);

        if (result.n === 0) {
            return res.status(404).json({ error: 'Categoria not found' });
        }

        res.json({ message: 'Categoria deleted successfully' });
    });
});

// Actualizar un país por ID
router.put('/Categoria/:id', (req, res, next) => {
    const CategoriaId = req.params.id;
    const { nombre } = req.body;

    if (!ObjectId.isValid(CategoriaId)) {
        return res.status(400).json({ error: 'Invalid Categoria ID' });
    }

    const query = { _id: ObjectId(CategoriaId) };
    const update = {
        $set: {
            nombre
        }
    };

    db.Categoria.updateOne(query, update, (err, result) => {
        if (err) return next(err);

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Categoria not found' });
        }

        if (result.modifiedCount === 0) {
            return res.status(304).json({ message: 'No changes made' });
        }

        res.json({ message: 'Categoria updated successfully' });
    });
});

// Obtener todas las categorías
router.get('/Categoria', (req, res, next) => {
    db.Categoria.find((err, categorias) => {
        if (err) return next(err);
        res.json(categorias);
    });
});

// Crear una nueva categoría
router.post('/Categoria', (req, res, next) => {
    const categoria = req.body;

    if (!categoria.nombre) {
        return res.status(400).json({
            error: 'Bad data - nombre is a required field'
        });
    } else {
        db.Categoria.save(categoria, (err, savedCategoria) => {
            if (err) return next(err);
            res.json(savedCategoria);
        });
    }
});

// Eliminar una categoría por ID
router.delete('/Categoria/:id', (req, res, next) => {
    const categoriaId = req.params.id;

    if (!ObjectId.isValid(categoriaId)) {
        return res.status(400).json({ error: 'Invalid Categoria ID' });
    }

    db.Categoria.remove({ _id: ObjectId(categoriaId) }, (err, result) => {
        if (err) return next(err);

        if (result.n === 0) {
            return res.status(404).json({ error: 'Categoria not found' });
        }

        res.json({ message: 'Categoria deleted successfully' });
    });
});

// Actualizar una categoría por ID
router.put('/Categoria/:id', (req, res, next) => {
    const categoriaId = req.params.id;
    const { nombre } = req.body;

    if (!ObjectId.isValid(categoriaId)) {
        return res.status(400).json({ error: 'Invalid Categoria ID' });
    }

    const query = { _id: ObjectId(categoriaId) };
    const update = {
        $set: {
            nombre
        }
    };

    db.Categoria.updateOne(query, update, (err, result) => {
        if (err) return next(err);

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Categoria not found' });
        }

        if (result.modifiedCount === 0) {
            return res.status(304).json({ message: 'No changes made' });
        }

        res.json({ message: 'Categoria updated successfully' });
    });
});

module.exports = router;
