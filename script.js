document.getElementById('uploadForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const fileInput = document.getElementById('csvFile');
  const file = fileInput.files[0];
  
  if (file) {
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: function(results) {
        console.log(results.data);
        localStorage.setItem('csvData', JSON.stringify(results.data));
        document.getElementById('message').innerText = 'Archivo cargado correctamente.';

        // Enviar datos al servidor
        fetch('/cargar-csv', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(results.data)
        })
        .then(response => response.json())
        .then(data => {
          console.log('Datos enviados al servidor:', data);
          document.getElementById('message').innerText = 'Datos cargados y enviados correctamente.';
        })
        .catch(error => {
          console.error('Error al enviar los datos al servidor:', error);
          document.getElementById('message').innerText = 'Error al enviar los datos al servidor.';
        });
      },
      error: function(error) {
        console.error('Error al leer el archivo:', error);
        document.getElementById('message').innerText = 'Error al cargar el archivo.';
      }
    });
  }
});

document.getElementById('showGraphBtn').addEventListener('click', function() {
  window.location.href = '/grafica';
});
