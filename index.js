const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const connection = require('./db');

const app = express();
const port = process.env.PORT || 3000;

// Middleware para manejar datos JSON y formularios URL-encoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuración de Multer para manejar la carga de archivos CSV
const upload = multer({ dest: 'uploads/' });

app.post('/cargar-csv', upload.none(), async (req, res) => {
  console.log('Datos recibidos del cliente:', req.body);
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: 'No se han enviado datos.' });
  }

  const results = req.body;
  console.log('Datos procesados:', results);

  try {
    const query = 'INSERT INTO tu_tabla (nombre, nivel, turno, sostenimiento, domicilio, ubicacion, colonia, alcaldia, latitud, longitud) VALUES ?';
    connection.query(query, [results.map(obj => Object.values(obj))], (error, results) => {
      if (error) {
        console.error('Error al insertar datos:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
      }
      res.json({ message: 'Datos cargados correctamente', data: results });
    });
  } catch (error) {
    console.error('Error al procesar el archivo CSV:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Middleware para servir archivos estáticos desde el directorio 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rutas para servir las páginas
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/crud', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'crud.html'));
});

app.get('/grafica', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'grafica.html'));
});

// Ruta para obtener datos para la gráfica desde la base de datos
app.get('/api/datos', (req, res) => {
  const query = 'SELECT alcaldia, COUNT(*) as total_escuelas FROM tu_tabla GROUP BY alcaldia';
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error al obtener datos:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
    res.json(results);
  });
});

// Iniciar el servidor Express
app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
