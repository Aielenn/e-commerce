
let currentPage = 1;
const productsPerPage = 12;
let allProducts = []; 
let filteredProducts = []; 

const categoryFilters = document.querySelectorAll('.filter-category');
const brandFilters = document.querySelectorAll('.filter-brand');
const minPriceInput = document.getElementById('min-price');
const maxPriceInput = document.getElementById('max-price');

function renderProducts(filteredProducts) {
  const productGrid = document.getElementById('product-grid');
  productGrid.innerHTML = ''; // Limpiar el grid antes de renderizar

  const start = (currentPage - 1) * productsPerPage;
  const end = start + productsPerPage;

  const paginatedProducts = filteredProducts.slice(start, end); 

  if (filteredProducts.length === 0) {
    productGrid.innerHTML = `<p>No se encontraron productos que coincidan con los filtros seleccionados.</p>`;
    return;
  }

  paginatedProducts.forEach(product => {
    const hasDiscount = product.discount > 0;
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
    productCard.innerHTML = `
      <div class="discount-badge ${hasDiscount ? 'discount-visible' : 'hidden'}">-${product.discount}%</div>
      <a href="product_card.html?id=${product.id}" class="product-img-link">
        <img src="${product.images[0]}" alt="${product.name}">
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
}

function setupPaginationControls() {
  const paginationContainer = document.getElementById('pagination-controls');
  paginationContainer.innerHTML = ''; 

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const label = document.createElement('span');
  label.textContent = 'Páginas: ';
  paginationContainer.appendChild(label);

  if (currentPage > 1) {
    const prevButton = document.createElement('button');
    prevButton.textContent = '<';
    prevButton.classList.add('pagination-arrow');
    prevButton.addEventListener('click', () => {
      currentPage--;
      renderProducts(filteredProducts);
      setupPaginationControls();
    });
    paginationContainer.appendChild(prevButton);
  }

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement('button');
    pageButton.textContent = i;
    pageButton.classList.add('pagination-button');
    if (i === currentPage) {
      pageButton.classList.add('active');
    }
    pageButton.addEventListener('click', () => {
      currentPage = i;
      renderProducts(filteredProducts);
      setupPaginationControls();
    });
    paginationContainer.appendChild(pageButton);
  }

  if (currentPage < totalPages) {
    const nextButton = document.createElement('button');
    nextButton.textContent = '>';
    nextButton.classList.add('pagination-arrow');
    nextButton.addEventListener('click', () => {
      currentPage++;
      renderProducts(filteredProducts);
      setupPaginationControls();
    });
    paginationContainer.appendChild(nextButton);
  }
}

function filterProductsByAdvancedFilters(products, category) {
  let filteredProducts = products;

  if (category === 'celulares') {
    const ram = document.getElementById('filter-ram').value;
    const storage = document.getElementById('filter-storage').value;

    if (ram) {
      filteredProducts = filteredProducts.filter(product => product.specs?.ram === ram || product.specs?.ram === undefined);
    }
    if (storage) {
      filteredProducts = filteredProducts.filter(product => product.specs?.storage === storage || product.specs?.storage === undefined);
    }
  } else if (category === 'smartTV') {
    const screenSize = document.getElementById('filter-screen-size').value;
    const resolution = document.getElementById('filter-resolution').value;

    if (screenSize) {
      filteredProducts = filteredProducts.filter(product => product.specs?.screenSize === screenSize || product.specs?.screenSize === undefined);
    }
    if (resolution) {
      filteredProducts = filteredProducts.filter(product => product.specs?.resolution === resolution || product.specs?.resolution === undefined);
    }
  } else if (category === 'perifericos') {
    const lighting = document.getElementById('filter-lighting').value;
    const wireless = document.getElementById('filter-wireless').value;

    if (lighting) {
      filteredProducts = filteredProducts.filter(product => product.specs?.lighting === (lighting === 'true') || product.specs?.lighting === undefined);
    }
    if (wireless) {
      filteredProducts = filteredProducts.filter(product => product.specs?.wireless === (wireless === 'true') || product.specs?.wireless === undefined);
    }
  } else if (category === 'sillas') {
    const material = document.getElementById('filter-material').value;
    const color = document.getElementById('filter-color').value;

    if (material) {
      filteredProducts = filteredProducts.filter(product => product.specs?.material === material || product.specs?.material === undefined);
    }
    if (color) {
      filteredProducts = filteredProducts.filter(product => product.specs?.color === color || product.specs?.color === undefined);
    }
  } else if (category === 'computadoras') {
    const processor = document.getElementById('filter-processor').value;
    const ram = document.getElementById('filter-computer-ram').value;
    const storage = document.getElementById('filter-computer-storage').value;

    if (processor) {
      filteredProducts = filteredProducts.filter(product => product.specs?.processor === processor || product.specs?.processor === undefined);
    }
    if (ram) {
      filteredProducts = filteredProducts.filter(product => product.specs?.ram === ram || product.specs?.ram === undefined);
    }
    if (storage) {
      filteredProducts = filteredProducts.filter(product => product.specs?.storage === storage || product.specs?.storage === undefined);
    }
  } else if (category === 'armarTuPC') {
    const component = document.getElementById('filter-component').value;

    if (component) {
      filteredProducts = filteredProducts.filter(product => product.specs?.component === component || product.specs?.component === undefined);
    }
  }

  return filteredProducts;
}

function filterProducts() {
  const selectedCategories = Array.from(categoryFilters)
    .filter(el => el.checked)
    .map(el => el.value);

  const selectedBrands = Array.from(brandFilters)
    .filter(el => el.checked)
    .map(el => el.value);

  const minPrice = parseInt(minPriceInput.value) || 0;
  const maxPrice = parseInt(maxPriceInput.value) || Infinity;
  const sortOption = document.getElementById('sort').value;

  // Filtrar los productos
  filteredProducts = allProducts.filter(product => {
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category[0]);
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    const finalPrice = product.price - ((product.price * product.discount) / 100);
    const matchesPrice = finalPrice >= minPrice && finalPrice <= maxPrice;

    return matchesCategory && matchesBrand && matchesPrice;
  });

  // Aplicar filtros avanzados
  const activeCategory = Object.keys(filterGroups).find(category => filterGroups[category].style.display === 'block');
  filteredProducts = filterProductsByAdvancedFilters(filteredProducts, activeCategory);

  // Ordenar los productos
  if (sortOption === 'price-asc') {
    filteredProducts.sort((a, b) => {
      const priceA = a.price - ((a.price * a.discount) / 100);
      const priceB = b.price - ((b.price * b.discount) / 100);
      return priceA - priceB;
    });
  } else if (sortOption === 'price-desc') {
    filteredProducts.sort((a, b) => {
      const priceA = a.price - ((a.price * a.discount) / 100);
      const priceB = b.price - ((b.price * b.discount) / 100);
      return priceB - priceA;
    });
  }

  currentPage = 1;
  renderProducts(filteredProducts);
  setupPaginationControls();
}

// Agregar eventos de cambio a los filtros
categoryFilters.forEach(filter => filter.addEventListener('change', filterProducts));
brandFilters.forEach(filter => filter.addEventListener('change', filterProducts));
minPriceInput.addEventListener('input', filterProducts);
maxPriceInput.addEventListener('input', filterProducts);

// Función para obtener el valor de un parámetro de URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

const selectedCategory = getQueryParam('category');

// Si hay una categoría seleccionada, filtrar los productos al cargar
if (selectedCategory) {
  fetch('products.json')
    .then(response => response.json())
    .then(data => {
      if (Array.isArray(data.products)) {
        allProducts = data.products;
        filteredProducts = allProducts.filter(product => product.category.includes(selectedCategory));
        renderProducts(filteredProducts); 
        setupPaginationControls(); 
      } else {
        console.error('Error: Data no es array');
      }
      showAdvancedFilters(selectedCategory);
      filteredProducts = filterProductsByAdvancedFilters(filteredProducts, selectedCategory);
      renderProducts(filteredProducts); 
    })
    .catch(error => {
      console.error('Error extrayendo productos:', error);
    });
} else {
  // Si no hay categoría seleccionada, cargar todos los productos
  fetch('products.json')
    .then(response => response.json())
    .then(data => {
      if (Array.isArray(data.products)) {
        allProducts = data.products;
        filteredProducts = allProducts;
        renderProducts(filteredProducts); 
        setupPaginationControls(); 
      } else {
        console.error('Error: Data no es array');
      }
    })
    .catch(error => {
      console.error('Error extrayendo productos:', error);
    });
}

// FILTROS AVANZADOS
const filterGroups = {
  celulares: document.getElementById('filter-celulares'),
  smartTV: document.getElementById('filter-smart-tv'),
  perifericos: document.getElementById('filter-perifericos'),
  sillas: document.getElementById('filter-sillas'),
  computadoras: document.getElementById('filter-computadoras'),
  armarTuPC: document.getElementById('filter-arma-tu-pc')
};

// Función para mostrar solo los filtros avanzados de la categoría activa
function showAdvancedFilters(category) {
  Object.values(filterGroups).forEach(filterGroup => {
    filterGroup.style.display = 'none';
  });

  if (filterGroups[category]) {
    filterGroups[category].style.display = 'block';
  }
}

// Event listener para la selección de una categoría
document.querySelectorAll('.category-filter').forEach(categoryButton => {
  categoryButton.addEventListener('click', (event) => {
    const category = event.target.dataset.category; 
    showAdvancedFilters(category); 
    filterProductsByCategory(category); 
  });
});

// Event listeners para aplicar filtros avanzados
document.querySelectorAll('.filter-group select').forEach(selectElement => {
  selectElement.addEventListener('change', () => {
    filterProducts();
  });
});