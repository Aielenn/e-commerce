document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const searchQuery = params.get("query")?.toLowerCase().trim();

    const resultsContainer = document.getElementById("search-results");
    const suggestionsContainer = document.getElementById("suggestions");
    const suggestionsSection = document.getElementById("suggested-products");

    const brandFilterContainer = document.getElementById("search-brand-filter");
    const categoryFilterContainer = document.getElementById("search-category-filter");
    const minPriceInput = document.getElementById("search-min-price");
    const maxPriceInput = document.getElementById("search-max-price");
    const applyPriceFilterButton = document.getElementById("search-apply-price-filter");

    const sortContainer = document.createElement("div");
    sortContainer.classList.add("search-product-controls");
    sortContainer.innerHTML = `
        <label for="sort">Ordenar por:</label>
        <select id="sort">
            <option value="default">Relevancia</option>
            <option value="price-asc">Precio: Menor a Mayor</option>
            <option value="price-desc">Precio: Mayor a Menor</option>
        </select>
    `;
    resultsContainer.before(sortContainer);
    const sortSelect = document.getElementById("sort");

    let allProducts = [];
    let filteredProducts = [];

    function applyFilters() {
        filteredProducts = allProducts.filter(product => {
            const selectedBrands = Array.from(document.querySelectorAll("input[name='brand']:checked")).map(input => input.value);
            const selectedCategories = Array.from(document.querySelectorAll("input[name='category']:checked")).map(input => input.value);
            const minPrice = parseFloat(minPriceInput.value) || 0;
            const maxPrice = parseFloat(maxPriceInput.value) || Infinity;

            const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
            const matchesCategory = selectedCategories.length === 0 || (Array.isArray(product.category) 
                ? product.category.some(cat => selectedCategories.includes(cat))
                : selectedCategories.includes(product.category));
            const matchesPrice = product.price >= minPrice && product.price <= maxPrice;

            return matchesBrand && matchesCategory && matchesPrice;
        });

        sortAndDisplayProducts();
    }

    function sortAndDisplayProducts() {
        const sortBy = sortSelect.value;

        if (sortBy === "price-asc") {
            filteredProducts.sort((a, b) => a.price - b.price);
        } else if (sortBy === "price-desc") {
            filteredProducts.sort((a, b) => b.price - a.price);
        } 

        resultsContainer.innerHTML = displayProducts(filteredProducts);
    }

    function populateFilters(products) {
        const brands = [...new Set(products.map(product => product.brand))];
        brandFilterContainer.innerHTML = brands.map(brand => 
            `<label><input type="checkbox" name="brand" value="${brand}"> ${brand}</label>`
        ).join("");

        const categories = [...new Set(products.flatMap(product => Array.isArray(product.category) ? product.category : [product.category]))];
        categoryFilterContainer.innerHTML = categories.map(category => 
            `<label><input type="checkbox" name="category" value="${category}"> ${category}</label>`
        ).join("");
    }

    if (!searchQuery) {
        resultsContainer.innerHTML = "<p>Ingresa un término de búsqueda.</p>";
        return;
    }

    fetch("products.json")
        .then(response => response.json())
        .then(data => {
            allProducts = data.products;
            populateFilters(allProducts);

            const searchWords = searchQuery.split(" ");
            filteredProducts = allProducts.filter(product =>
                searchWords.some(word =>
                    product.name.toLowerCase().includes(word) ||
                    product.description.toLowerCase().includes(word)
                )
            );

            sortAndDisplayProducts();

            const filteredProductIds = new Set(filteredProducts.map(p => p.id));
            const suggestedProducts = allProducts.filter(product =>
                !filteredProductIds.has(product.id) && 
                (
                    searchWords.some(word =>
                        product.name.toLowerCase().includes(word) ||
                        product.description.toLowerCase().includes(word) ||
                        product.brand.toLowerCase().includes(word) ||
                        (Array.isArray(product.category) 
                            ? product.category.some(cat => cat.toLowerCase().includes(word)) 
                            : product.category.toLowerCase().includes(word))
                    ) ||
                    filteredProducts.some(fp => 
                        product.brand === fp.brand || 
                        (Array.isArray(product.category) 
                            ? product.category.some(cat => fp.category.includes(cat)) 
                            : fp.category.includes(product.category))
                    )
                )
            );
            
            suggestionsContainer.innerHTML = displayProducts(suggestedProducts);           
            suggestionsSection.classList.remove("hidden");

            document.querySelectorAll(".add-to-cart").forEach(button => {
                button.addEventListener("click", function () {
                    addToCart(parseInt(this.getAttribute("data-id")));
                });
            });

            document.querySelectorAll("input[name='brand'], input[name='category']").forEach(input => {
                input.addEventListener("change", applyFilters);
            });

            applyPriceFilterButton.addEventListener("click", applyFilters);
            sortSelect.addEventListener("change", sortAndDisplayProducts);
        })
        .catch(error => console.error("Error cargando productos:", error));
});


function displayProducts(products) {
    return products.map(product => `
        <div class="search-product-card">
            ${product.discount > 0 ? `<div class="search-discount-badge">-${product.discount}%</div>` : ''}
            
            <a href="product_card.html?id=${product.id}" class="search-product-img-link">
                <img src="${product.images?.[0]}" alt="${product.name}">
            </a>

            <div class="search-brand">${product.brand}</div>

            <a href="product_card.html?id=${product.id}" class="search-product-name-link">
                <h3>${product.name}</h3>
            </a>

            <div class="search-category">
                ${Array.isArray(product.category) ? product.category[0] : product.category}
            </div>

            <hr class="divider-block">

            <div class="search-price-container">
                ${product.discount > 0 ? `<span class="search-original-price">$${product.price}</span>` : ''}
                <span class="search-discount-price">$${(product.price - (product.price * product.discount / 100)).toFixed(2)}</span>
            </div>
            
            <button class="add-to-cart" data-id="${product.id}">Añadir al carrito</button>
        </div>
    `).join("");
}
