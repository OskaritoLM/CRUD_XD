const  express = require('express');
const app = express();
const cors= require('cors');
const datosPRoutes = require('./routes/datosP');
const path = require('path');
//settings
app.set('views',path.join(__dirname,'views'));
app.set('port', process.env.PORT || 3000);
app.engine('html', require('ejs').renderFile);
app.set('view engine','ejs');

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//routes
app.use('/api',datosPRoutes);

//static file
app.use(express.static(path.join(__dirname,'dist')));


//start server
app.listen(app.get('port'), ()=>{
    console.log('server on port ', app.get('port'));
});