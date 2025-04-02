import express from 'express';
import ejs from 'ejs';
import path from "path"; //--> modulo path para manejar rutas de archivos
import { fileURLToPath } from "url"; //--> modulo url para obtener la ruta del archivo actual

import indexRouter from './routes/index.js'; //--> importar el router de index.js

const __filename = fileURLToPath(import.meta.url); //--> obtener la ruta del archivo actual
const __dirname = path.dirname(__filename); //--> obtener el nombre del directorio actual
const app = express(); 

app.set("views", path.join(__dirname, "views")); //--> carpeta donde se encuentran las vistas
app.set('view engine', 'ejs'); //--> motor de plantilla ejs

app.use(express.static(path.join(__dirname, 'public'))); //--> carpeta donde se encuentran los archivos estaticos
app.use(indexRouter); //--> carpeta donde se encuentran los archivos estaticos





app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
    
