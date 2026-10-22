const fs = require('fs');
const path = require('path');

// Construimos la ruta absoluta hacia la carpeta logs
const rutaLog = path.join(__dirname, '../logs/archivo.log');

exports.leer = () => {
  fs.readFile(rutaLog, 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo:', err);
      return;
    }
    console.log(data);
  });
};

exports.escribir = (accion, Usuario) => {
  let mensaje = `${new Date().toISOString()} - ${accion} - ${Usuario} \n`;

  // Nos aseguramos de que la carpeta logs exista
  const carpetaLogs = path.dirname(rutaLog);
  if (!fs.existsSync(carpetaLogs)) {
    fs.mkdirSync(carpetaLogs, { recursive: true });
  }

  fs.appendFile(rutaLog, mensaje, (err) => {
    if (err) {
      console.error('Error escribiendo log:', err.message);
      return;
    }
    console.log('Log agregado correctamente');
  });
};
