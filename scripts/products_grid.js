// products_grid.js

fetch('products.json')
.then(response => response.json())
.then(data => {
  if (Array.isArray(data.products)) { // Check if data is an array
    const productGrid = document.getElementById('product-grid');

    data.products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.classList.add('product-card');

      const hasDiscount = product.discount > 0;

      productCard.innerHTML = `
        <div class="discount-badge ${hasDiscount ? 'discount-visible' : 'hidden'}">-${product.discount}%</div>
        <img src="${product.image}" alt="${product.name}">
        <div class="brand">${product.brand}</div>
        <h3>${product.name}</h3>
        <div class="price-container">
          ${hasDiscount ? `<span class="original-price">$${product.price}</span>` : ''}
          <span class="discount-price">$${product.price - ((product.price * product.discount) / 100)}</span>
        </div>
        <p class="description">${product.description}</p>
        <div class="category">${product.category[0]}</div>
      `;

      productGrid.appendChild(productCard);
    });
  } else {
    console.error('Error: Data is not an array');
  }
})
.catch(error => {
  console.error('Error fetching products:', error);
});

//filters
const productGrid = document.getElementById('product-grid');
const minPriceInput = document.getElementById('min-price');
const maxPriceInput = document.getElementById('max-price');
const categoryFilters = document.querySelectorAll('.filter-category');
const brandFilters = document.querySelectorAll('.filter-brand');

// Agregar listeners a los checkboxes de categorías y marcas
categoryFilters.forEach(filter => filter.addEventListener('change', filterProducts));
brandFilters.forEach(filter => filter.addEventListener('change', filterProducts));

// Eventos para actualizar el filtro de productos
minPriceInput.addEventListener('input', filterProducts);
maxPriceInput.addEventListener('input', filterProducts);


function filterProducts() {
  const selectedCategories = Array.from(categoryFilters).filter(el => el.checked).map(el => el.value);
  const selectedBrands = Array.from(brandFilters).filter(el => el.checked).map(el => el.value);
  const minPrice = parseInt(minPriceInput.value) || 0;
  const maxPrice = parseInt(maxPriceInput.value) || Infinity;

  fetch('products.json')
    .then(response => response.json())
    .then(data => {
      productGrid.innerHTML = ''; // Limpia los productos actuales

      const filteredProducts = data.products.filter(product => {
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category[0]);
        const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
        const finalPrice = product.price - ((product.price * product.discount) / 100);
        const matchesPrice = finalPrice >= minPrice && finalPrice <= maxPrice;

        return matchesCategory && matchesBrand && matchesPrice;
      });

      filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        const hasDiscount = product.discount > 0;

        productCard.innerHTML = `
          <div class="discount-badge ${hasDiscount ? 'discount-visible' : 'hidden'}">-${product.discount}%</div>
          <a href="product_card.html?id=${product.id}" class="product-img-link">
          <img src="${product.image}" alt="${product.name}">
          </a>
          <div class="brand">${product.brand}</div>
          <a href="product_card.html?id=${product.id}" class="product-name-link">
          <h3>${product.name}</h3>
          </a>
          <div class="price-container">
            ${hasDiscount ? `<span class="original-price">$${product.price}</span>` : ''}
            <span class="discount-price">$${product.price - ((product.price * product.discount) / 100)}</span>
          </div>
          <p class="description">${product.description}</p>
          <div class="category">${product.category[0]}</div>
        `;

        productGrid.appendChild(productCard);
      });
      // Mensaje si no hay productos que cumplan los filtros
      if (filteredProducts.length === 0) {
        productGrid.innerHTML = `<p>No se encontraron productos con los filtros seleccionados. ¡Contáctanos a traves de whastsapp y coordinamos el producto que se ajusta a tu busqueda! </p>`;
      }
    })
    .catch(error => {
      console.error('Error fetching products:', error);
    });
}

// Carga inicial sin filtros aplicados
filterProducts();
