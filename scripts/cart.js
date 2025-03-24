function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

let products = [];

fetch("products.json")
    .then(response => response.json())
    .then(data => {
        if (!Array.isArray(data.products)) {
            throw new Error("❌ El archivo JSON no contiene un array válido.");
        }
        products = data.products;
    })
    .catch(error => console.error("Error al cargar productos:", error));

function addToCart(productId) {
    let cart = getCart();
    const product = products.find(p => p.id == productId);

    if (!product) {
        console.error("❌ Producto no encontrado o aún no cargado.");
        return;
    }

    let cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity += 1; 
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            brand: product.brand,
            price: product.price,
            discount: product.discount,
            images: product.images,
            quantity: 1  
        });
    }

    saveCart(cart);
    loadCart(); 
    showCartNotification();
    updateCartCount();
}


function showCartNotification() {
    const alert = document.createElement("div");
    alert.className = "cart-notification";
    alert.textContent = "Producto agregado al carrito ✅";
    document.body.appendChild(alert);

    setTimeout(() => {
        alert.remove();
    }, 4000);
}

document.addEventListener("DOMContentLoaded", () => {
    setupCartButtons();
    if (document.querySelector(".cart-items")) {
        loadCart();
    }
});

function loadCart() {
    const cartContainer = document.querySelector(".cart-items");
    const cartSummary = document.querySelector(".cart-summary");
    const shippingInput = document.querySelector(".cart-postal-code-input");
    const shippingCostDisplay = document.querySelector(".cart-shipping-cost");
    const pickupOption = document.querySelector("#pickup-option");
    const deliveryOption = document.querySelector("#delivery-option");

    if (!cartContainer) {
        console.error("❌ Error: No se encontró el contenedor de los productos en el carrito.");
        return;
    }

    let cart = getCart();
    cartContainer.innerHTML = "";

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>No hay productos en el carrito.</p>";
        cartSummary.style.display = "none";
        return;
    }

    cart.forEach((product) => {
        let finalPrice = product.price * (1 - product.discount / 100);
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <img src="${product.images[0]}" alt="${product.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h2>${product.name}</h2>
                <p>${product.brand}</p>
                <div class="cart-item-prices">
                    <span class="cart-final-price">$${finalPrice.toFixed(2)}</span>
                    <span class="cart-discount-badge">- ${product.discount}% OFF</span>
                </div>
                <div class="cart-item-actions">
                    <button class="decrease" onclick="updateQuantity(${product.id}, -1)">-</button>
                    <span class="quantity">${product.quantity}</span>
                    <button class="increase" onclick="updateQuantity(${product.id}, 1)">+</button>
                    <button class="remove" onclick="removeFromCart(${product.id})">🗑 Eliminar</button>
                </div>
            </div>
        `;
        cartContainer.appendChild(cartItem);
    });

    updateSummary();

    pickupOption.addEventListener("change", () => {
        shippingInput.disabled = true;
        shippingInput.value = "";
        updateSummary(0);
    });

    deliveryOption.addEventListener("change", () => {
        shippingInput.disabled = false;
        updateShippingCost();
    });

    shippingInput.addEventListener("input", updateShippingCost);
}

function updateQuantity(productId, change) {
    let cart = getCart();
    let product = cart.find(p => p.id === productId);

    if (!product) {
        console.error("❌ Producto no encontrado en el carrito.");
        return;
    }

    product.quantity = Math.max(1, product.quantity + change);
    if (product.quantity === 0 && change < 0) {
        cart = cart.filter(p => p.id !== productId);
    }

    saveCart(cart);
    loadCart();
    updateCartCount();
}

function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(product => product.id !== productId);

    saveCart(cart);
    loadCart();
    updateCartCount();
}

function updateShippingCost() {
    const shippingInput = document.querySelector(".cart-postal-code-input");
    const shippingCostDisplay = document.querySelector(".cart-shipping-cost");
    let shippingCost = 0;

    if (shippingInput.value.trim().length === 4 && /^\d+$/.test(shippingInput.value)) {
        const postalCode = parseInt(shippingInput.value.trim());

        if (postalCode >= 75000) {
            shippingCost = 0;
        } else if (shippingInput.value.startsWith("1") || shippingInput.value.startsWith("2")) {
            shippingCost = 7000;
        } else if (shippingInput.value.startsWith("3") || shippingInput.value.startsWith("4")) {
            shippingCost = 9000;
        } else {
            shippingCost = 15000;
        }
    }

    updateSummary(shippingCost);
}

function updateSummary(shippingCost = 0) {
    let cart = getCart();
    let subtotal = cart.reduce((sum, product) => {
        let finalPrice = product.price * (1 - product.discount / 100);
        return sum + (finalPrice * product.quantity);
    }, 0);

    let total = subtotal + shippingCost;

    document.querySelector(".cart-subtotal-price").textContent = `$${subtotal.toFixed(2)}`;
    document.querySelector(".cart-shipping-cost").textContent = shippingCost > 0 ? `$${shippingCost}` : "Gratis";
    document.querySelector(".cart-total-price").textContent = `$${total.toFixed(2)}`;
}

function setupCartButtons() {
    const checkoutButton = document.querySelector(".checkout-button");
    const continueShoppingButton = document.querySelector(".continue-shopping");
    const cartLogo = document.querySelector(".cart-link");

    if (continueShoppingButton) {
        continueShoppingButton.addEventListener("click", () => {
            window.location.href = "product_grid.html";
        });
    }

    if (checkoutButton) {
        checkoutButton.addEventListener("click", () => {
            alert("Procediendo al pago...");
        });
    }

    if (cartLogo) {
        cartLogo.addEventListener("click", () => {
            window.location.href = "cart.html";
        });
    }
}

document.addEventListener("DOMContentLoaded", updateCartCount);

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    let cartCountElement = document.getElementById("cart-count");

    if (totalItems > 0) {
        cartCountElement.textContent = totalItems;
        cartCountElement.style.display = "flex";
    } else {
        cartCountElement.style.display = "none";
    }
}

document.addEventListener("click", function (event) {
    if (event.target.classList.contains("add-to-cart") || event.target.classList.contains("remove")) {
        updateCartCount();
    }
});

