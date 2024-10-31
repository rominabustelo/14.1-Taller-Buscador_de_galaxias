document.getElementById('btnBuscar').addEventListener('click', async () => {
    const query = document.getElementById('inputBuscar').value;
    const url = `https://images-api.nasa.gov/search?q=${query}`; 
    
    try {
        const response = await fetch(url);
        const data = await response.json();

        mostrarResultados(data.collection.items);
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        alert('Error al obtener los datos. Intenta de nuevo más tarde.');
    }
});

function mostrarResultados(items) {
    const contenedor = document.getElementById('contenedor');
    contenedor.innerHTML = ''; // Limpiar resultados anteriores

    if (items.length === 0) {
        contenedor.innerHTML = '<p>No se encontraron resultados.</p>';
        return;
    }

    items.forEach(item => {
        const { title, description, date_created } = item.data[0];
        const imgUrl = item.links[0] ? item.links[0].href : '';

        const tarjeta = `
            <div class="col">
                <div class="card h-100">
                    <img src="${imgUrl}" class="card-img-top" alt="${title}">
                    <div class="card-body">
                        <h5 class="card-title">${title}</h5>
                        <div class="card-text">
                        <p class="card-text">${description || 'Sin descripción'}</p>
                        </div>
                    </div>
                    <div class="card-footer">
                        <small class="text-body-secondary">${(date_created)}</small>
                    </div>
                </div>
            </div>
        `;

        contenedor.innerHTML += tarjeta; 
    });
}
