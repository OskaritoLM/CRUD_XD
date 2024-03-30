const cors = require('cors');
const express = require('express');
const app = express();
const path = require('path'); // Agrega esta línea para importar el módulo path


//const indexRoutes = require('./routes/index'); 
const Vehiculos = require('./routes/VehiculosRoutes'); 
const Paises = require('./routes/PaisRoutes'); 
const Estado = require('./routes/EstadoRoutes'); 
const Categoria = require('./routes/CategoriaRoutes'); 
const Lugar = require('./routes/LugarRouter');
const Usuario = require('./routes/UsuarioRoutes');
const Reserva = require('./routes/ReservaRoutes');
const Ciudad = require('./routes/CiudadRouter');

// settings
app.set('port', process.env.PORT || 3000);

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
//app.use(indexRoutes);
app.use('/api', Vehiculos);
app.use('/api', Paises);
app.use('/api', Estado);
app.use('/api', Categoria);
app.use('/api', Lugar);
app.use('/api', Usuario);
app.use('/api', Reserva);
app.use('/api', Ciudad);


//Static Files
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/uploads', express.static(path.resolve('uploads')));



//Start Server
app.listen(app.get('port'), () => {
  console.log('Server on port ', app.get('port'));
});
