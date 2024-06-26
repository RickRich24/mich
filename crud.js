document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('addForm');
    const tableBody = document.querySelector('#dataTable tbody');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const nivel = document.getElementById('nivel').value;
        const turno = document.getElementById('turno').value;
        const sostenimiento = document.getElementById('sostenimiento').value;
        const domicilio = document.getElementById('domicilio').value;
        const ubicacion = document.getElementById('ubicacion').value;
        const colonia = document.getElementById('colonia').value;
        const alcaldia = document.getElementById('alcaldia').value;
        const latitud = document.getElementById('latitud').value;
        const longitud = document.getElementById('longitud').value;

        const newRow = document.createElement('tr');

        newRow.innerHTML = `
            <td>${nombre}</td>
            <td>${nivel}</td>
            <td>${turno}</td>
            <td>${sostenimiento}</td>
            <td>${domicilio}</td>
            <td>${ubicacion}</td>
            <td>${colonia}</td>
            <td>${alcaldia}</td>
            <td>${latitud}</td>
            <td>${longitud}</td>
            <td>
                <button class="edit">Editar</button>
                <button class="delete">Eliminar</button>
            </td>
        `;

        tableBody.appendChild(newRow);
        form.reset();
    });

    tableBody.addEventListener('click', function (event) {
        if (event.target.classList.contains('delete')) {
            const row = event.target.closest('tr');
            row.remove();
        } else if (event.target.classList.contains('edit')) {
            const row = event.target.closest('tr');
            document.getElementById('nombre').value = row.cells[0].textContent;
            document.getElementById('nivel').value = row.cells[1].textContent;
            document.getElementById('turno').value = row.cells[2].textContent;
            document.getElementById('sostenimiento').value = row.cells[3].textContent;
            document.getElementById('domicilio').value = row.cells[4].textContent;
            document.getElementById('ubicacion').value = row.cells[5].textContent;
            document.getElementById('colonia').value = row.cells[6].textContent;
            document.getElementById('alcaldia').value = row.cells[7].textContent;
            document.getElementById('latitud').value = row.cells[8].textContent;
            document.getElementById('longitud').value = row.cells[9].textContent;
            row.remove();
        }
    });
});
