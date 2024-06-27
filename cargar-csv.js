const mysql = require('mysql2');
const { parse } = require('csv-parse/sync');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

connection.connect(error => {
  if (error) {
    console.error('Error de conexión a la base de datos:', error);
    return;
  }
  console.log('Conexión establecida con la base de datos MySQL');
});

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const data = JSON.parse(event.body);
    const parsedData = parse(data, { columns: true });

    const query = 'INSERT INTO tu_tabla (nombre, nivel, turno, sostenimiento, domicilio, ubicacion, colonia, alcaldia, latitud, longitud) VALUES ?';
    connection.query(query, [parsedData.map(obj => Object.values(obj))], (error, results) => {
      if (error) {
        console.error('Error al insertar datos:', error);
        return {
          statusCode: 500,
          body: JSON.stringify({ error: 'Error interno del servidor' })
        };
      }
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Datos cargados correctamente', data: results })
      };
    });
  } catch (error) {
    console.error('Error al procesar el archivo CSV:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error interno del servidor' })
    };
  }
};
