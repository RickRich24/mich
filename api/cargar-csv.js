const mysql = require('mysql2');
const { parse } = require('csv-parse/sync');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const data = JSON.parse(req.body);
    const parsedData = parse(data, { columns: true });

    const query = 'INSERT INTO tu_tabla (nombre, nivel, turno, sostenimiento, domicilio, ubicacion, colonia, alcaldia, latitud, longitud) VALUES ?';
    connection.query(query, [parsedData.map(obj => Object.values(obj))], (error, results) => {
      if (error) {
        console.error('Error al insertar datos:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
      }
      res.status(200).json({ message: 'Datos cargados correctamente', data: results });
    });
  } catch (error) {
    console.error('Error al procesar el archivo CSV:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
