document.addEventListener("DOMContentLoaded", function () {
    // Obtener el parámetro "query" de la URL
    const params = new URLSearchParams(window.location.search);
    const searchQuery = params.get("query")?.toLowerCase().trim();

    // Referencia al contenedor donde se mostrarán los resultados
    const resultsContainer = document.getElementById("search-results");

    // Si no hay búsqueda, mostrar mensaje
    if (!searchQuery) {
        resultsContainer.innerHTML = "<p>Ingresa un término de búsqueda.</p>";
        return;
    }

    // Obtener productos desde el JSON local
    fetch("products.json")
        .then(response => response.json())
        .then(data => {
            const products = data.products;

            // Filtrar productos que coincidan con la búsqueda en nombre o descripción
            const filteredProducts = products.filter(product =>
                product.name.toLowerCase().includes(searchQuery) ||
                product.description.toLowerCase().includes(searchQuery)
            );

            // Si no hay coincidencias
            if (filteredProducts.length === 0) {
                resultsContainer.innerHTML = `<p>No se encontraron productos para "<strong>${searchQuery}</strong>".</p>`;
                return;
            }

            // Construir HTML para los productos encontrados
            resultsContainer.innerHTML = filteredProducts.map(product => `
                <div class="search-product-card">
                    ${product.discount > 0 ? `<div class="search-discount-badge">-${product.discount}%</div>` : ''}
                    
                    <a href="product_card.html?id=${product.id}" class="search-product-img-link">
                        <img src="${product.images?.[0] || 'ruta_por_defecto.jpg'}" alt="${product.name}">
                    </a>

                    <div class="search-brand">${product.brand}</div>

                    <a href="product_card.html?id=${product.id}" class="search-product-name-link">
                        <h3>${product.name}</h3>
                    </a>

                    <div class="search-price-container">
                        ${product.discount > 0 ? `<span class="search-original-price">$${product.price}</span>` : ''}
                        <span class="search-discount-price">$${(product.price - (product.price * product.discount / 100)).toFixed(2)}</span>
                    </div>

                    <p class="search-description">${product.description}</p>
                    
                    <div class="search-category">
                        ${Array.isArray(product.category) ? product.category[0] : product.category}
                    </div>

                    <button class="add-to-cart" data-id="${product.id}">Añadir al carrito</button>
                </div>
            `).join("");

            // Agregar funcionalidad a los botones de "Añadir al carrito"
            document.querySelectorAll(".add-to-cart").forEach(button => {
                button.addEventListener("click", function () {
                    const productId = this.getAttribute("data-id");
                    addToCart(parseInt(productId));
                });
            });
        })
        .catch(error => console.error("Error cargando productos:", error));
});
