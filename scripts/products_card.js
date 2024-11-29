// Obtén el contenedor para mostrar los detalles
const productDetailContainer = document.getElementById('product-detail-container');

// Obtén el ID del producto desde la URL
const params = new URLSearchParams(window.location.search);
const productId = params.get('id');

// Carga los detalles del producto
function loadProductDetails() {
  if (!productId) {
    productDetailContainer.innerHTML = '<p>Producto no encontrado.</p>';
    return;
  }

  // Carga el JSON de productos
  fetch('products.json')
    .then(response => response.json())
    .then(data => {
      const product = data.products.find(p => p.id == productId);

      if (!product) {
        productDetailContainer.innerHTML = '<p>Producto no encontrado.</p>';
        return;
      }

      // Renderiza los detalles del producto
      productDetailContainer.innerHTML = `
        <div class="the-product">
          <img src="${product.image}" alt="${product.name}" class="the-product-image">
          <div class="the-product-info">
            <h3 class="the-product-name">${product.name}</h3>
            <p class="the-product-brand">Marca: ${product.brand}</p>
            <p class="the-product-category">Categorías: ${product.category.join(', ')}</p>
            <div class="the-product-pricing">
            <p class="product-price">$${product.price - (product.price * product.discount / 100)}</p>
            ${product.discount > 0 ? `<p class="the-product-original-price">Precio original: $${product.price}</p>` : ''}
            ${product.discount > 0 ? `<p class="the-product-discount">Descuento: ${product.discount}%</p>` : ''}
            <p class="description">${product.description}</p>
            <ul class="specs">
              ${Object.entries(product.specs).map(([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`).join('')}
            </ul>
            </div>
            <button class="add-to-cart-btn">Agregar al Carrito</button>
            </div>
        </div>
      `;
    })
    .catch(error => {
      console.error('Error al cargar los detalles:', error);
      productDetailContainer.innerHTML = '<p>Error al cargar los detalles del producto.</p>';
    });
}

// Carga los detalles al iniciar
loadProductDetails();
