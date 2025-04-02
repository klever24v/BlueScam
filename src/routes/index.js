import {Router} from 'express';
const router = Router(); //--> crear una instancia de Router

router.get('/', (req, res) =>  res.render('index', {title: 'Primer sitio de prueba'})); //--> renderizar la vista index.ejs y pasarle el titulo como variable
router.get('/bluescan', (req, res) =>  res.render('bluescan' , {title: 'Bluescan'})); //--> renderizar la vista index.ejs y pasarle el titulo como variable

export default router; //--> exportar el router para usarlo en otros archivos