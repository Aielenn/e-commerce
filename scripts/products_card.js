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

  fetch('products.json')
    .then(response => response.json())
    .then(data => {
      const product = data.products.find(p => p.id == productId);

      if (!product) {
        productDetailContainer.innerHTML = '<p>Producto no encontrado.</p>';
        return;
      }

      productDetailContainer.innerHTML = `
        <div class="the-product">
          <div class="the-product-gallery">
            <img src="${product.images[0]}" alt="${product.name}" class="the-product-image">
            <div class="thumbnail-container">
              ${product.images.map((img, index) => `<img src="${img}" alt="${product.name} Thumbnail ${index + 1}" class="thumbnail" onclick="changeMainImage('${img}')">`).join('')}
            </div>
          </div>
          <div class="the-product-info">
            <p class="the-product-brand"> ${product.brand}</p>
            <h3 class="the-product-name">${product.name}</h3>
            <p class="the-product-category">Categoría: ${product.category[0]}</p>
            <hr class="divider">
            <div class="the-product-pricing">
              <p class="product-price">$${product.price - (product.price * product.discount / 100)}</p>
              ${product.discount > 0 ? `<p class="the-product-original-price">Precio original: $${product.price}</p>` : ''}
              ${product.discount > 0 ? `<p class="the-product-discount">${product.discount}% de ahorro</p>` : ''}
            </div>
            <p class="info-promotion">3 cuotas sin interés de $${((product.price - (product.price * product.discount / 100)) / 3).toFixed(0)}</p>
            <div class="the-btn">
              <button class="add-to-cart-btn" data-id="${product.id}">Agregar al Carrito</button>
              <button class="comprar">Comprar</button>
            </div>
            <hr class="divider">
            <div class="shipping">
              <p> Retira GRATIS tu compra en nuestras sucursales.</p>
              <p> Envios GRATIS en compras mayores a 75.000 </p>
              <p> Pedi tu envio a domicilio al costo mas bajo.</p>
            </div>

            <div class="shipping-cost-container">
            <p class="shipping-title">Calcular envio:</p>
            <div class="shipping-input-container">
              <img src="images/envio.png" alt="Camión de envío" class="shipping-icon">
              <input type="text" class="postal-code-input" placeholder="Ingresa tu Codigo Postal" maxlength="5">
              <button class="calculate-shipping-btn">></button>
              <span class="shipping-cost-result">$00.00</span>
            </div>
              <a href="https://www.correoargentino.com.ar/formularios/cpa" class="no-postal-code">No sé mi código postal</a>
            </div> 

            <hr class="divider">
            <p class="the-description">Descripción del producto:</p>
            <p class="description">${product.description}</p>
            <p class="description">Caracteristicas:</p>
            <ul class="specs">
              ${Object.entries(product.specs)
          .map(([key, value]) => {
            // Convierte los valores booleanos en "Sí" o "No"
            const displayValue = value === true ? "Sí" : value === false ? "No" : value;
            return `<li><strong>${key}:</strong> ${displayValue}</li>`;
          })
          .join('')}
            </ul>
          </div>
        </div>
      `;

      const productNameElement = document.getElementById("product-name");
      productNameElement.textContent = product.name;

      // Cambiar la miniatura
      window.changeMainImage = (src) => {
        const mainImage = document.querySelector('.the-product-image');
        mainImage.src = src;
      };


// Cálculo de envío
const shippingButton = productDetailContainer.querySelector('.calculate-shipping-btn');
const postalInput = productDetailContainer.querySelector('.postal-code-input');
const shippingResult = productDetailContainer.querySelector('.shipping-cost-result');

shippingButton.addEventListener('click', () => {
    const postalCode = postalInput.value.trim();

    if (postalCode.length === 4 && /^\d+$/.test(postalCode)) { // Asegura que el código postal tenga 4 dígitos
        let shippingCost;

        if (parseInt(postalCode) >= 75000) {
            shippingCost = 0; // Envío gratuito para códigos postales >= 75000
        } else if (postalCode.startsWith("1") || postalCode.startsWith("2")) {
            shippingCost = 7000; // Zona cercana
        } else if (postalCode.startsWith("3") || postalCode.startsWith("4")) {
            shippingCost = 9000; // Zona media
        } else {
            shippingCost = 15000; // Zona lejana
        }

        shippingResult.textContent = `$ ${shippingCost}`;
    } else {
        shippingResult.textContent = "Código inválido";
    }
});

})
      .catch(error => {
      console.error('Error al cargar los detalles:', error);
      productDetailContainer.innerHTML = '<p>Error al cargar los detalles del producto.</p>';
});
}

// Carga los detalles al iniciar
loadProductDetails();

// Cambiar la imagen principal al hacer clic en una miniatura
window.changeMainImage = (src) => {
  const mainImage = document.querySelector('.the-product-image');
  mainImage.src = src;
};


document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (event) => {
      if (event.target.classList.contains("add-to-cart-btn") || event.target.classList.contains("add-cart")) {
          let productId = parseInt(event.target.getAttribute("data-id"));
          if (!isNaN(productId)) {
              addToCart(productId);
          }
      }
  });
});

const relatedProductsContainer = document.querySelector('.related-products-grid');

function loadRelatedProducts(category) {
  fetch('products.json')
    .then(response => response.json())
    .then(data => {
      // Filtra productos relacionados según la categoría, excluyendo el producto actual
      const relatedProducts = data.products.filter(
        product => product.category.includes(category) && product.id != productId
      );

      // Limita los productos relacionados a un máximo de 4
      const productsToShow = relatedProducts.slice(0, 4);

      if (productsToShow.length === 0) {
        relatedProductsContainer.innerHTML = '<p>No hay productos relacionados disponibles.</p>';
        return;
      }

      // Renderiza las tarjetas de productos relacionados
      relatedProductsContainer.innerHTML = productsToShow
        .map(
          product => `
          <div class="related-product-card">
            <img src="${product.images[0]}" alt="${product.name}">
            <a href="product_card.html?id=${product.id}" class="related-product-card-h3">
            <h3>${product.name}</h3></a>
            <div class="related-product-card-pricing">
              <p class="related-product-card-price">$${product.price - (product.price * product.discount / 100)}</p>
              ${product.discount > 0 ? `<p class="related-product-card-original-price">Precio original: $${product.price}</p>` : ''}
              ${product.discount > 0 ? `<p class="related-product-card-discount">Descuento: ${product.discount}%</p>` : ''}
            </div>
            <p class="related-product-info-promotion">3 cuotas sin interés de $${((product.price - (product.price * product.discount / 100)) / 3).toFixed(0)}</p>
            
          </div>
        `
        )
        .join('');
    })
    .catch(error => {
      console.error('Error al cargar productos relacionados:', error);
      relatedProductsContainer.innerHTML = '<p>Error al cargar productos relacionados.</p>';
    });
}

// Llama a la función después de cargar los detalles del producto
fetch('products.json')
  .then(response => response.json())
  .then(data => {
    const product = data.products.find(p => p.id == productId);
    if (product) {
      loadRelatedProducts(product.category[0]);
    }
  });
