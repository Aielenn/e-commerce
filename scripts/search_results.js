// scripts/search_results.js

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get('query');

    if (query) {
        displayResults(query);
    } else {
        document.getElementById('search-results').innerHTML = '<p>No se ha ingresado una consulta de búsqueda.</p>';
    }
    
    const searchForm = document.querySelector('.search-wrapper');
    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const newQuery = searchForm.querySelector('input[name="query"]').value;
        if (newQuery) {
            window.location.search = `query=${encodeURIComponent(newQuery)}`;
        }
    });
});

function displayResults(query) {
    // Simulación de un conjunto de productos predefinidos
    const products = [
        { name: 'Teléfono XYZ', description: 'Un teléfono de última generación.' },
        { name: 'Computadora ABC', description: 'Computadora de alto rendimiento.' },
        { name: 'Teclado Gamer', description: 'Teclado mecánico RGB.' },
        { name: 'Tablet 123', description: 'Tablet con pantalla de alta resolución.' }
    ];

    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = ''; // Limpia cualquier resultado previo

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
    );

    if (filteredProducts.length > 0) {
        filteredProducts.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product');

            const productName = document.createElement('h3');
            productName.textContent = product.name;
            productElement.appendChild(productName);

            const productDescription = document.createElement('p');
            productDescription.textContent = product.description;
            productElement.appendChild(productDescription);

            resultsContainer.appendChild(productElement);
        });
    } else {
        resultsContainer.innerHTML = '<p>No se encontraron resultados.</p>';
    }
}
