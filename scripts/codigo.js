//search
document.addEventListener('DOMContentLoaded', function () {
    const searchButton = document.querySelector('.search-button');
    const searchInput = document.querySelector('.search-wrapper input');
    const searchWrapper = document.querySelector('.search-wrapper');
    const headerIcons = document.querySelector('.header-icons');
    const logo = document.querySelector('.logo h1');


    searchButton.addEventListener('click', function (event) {
        event.preventDefault(); 
        if (window.innerWidth <= 768) {
            searchWrapper.classList.toggle('active');
            headerIcons.classList.toggle('hidden');
        } else {
            search(); 
        }
    });


    searchInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault(); 
            search();
        }
    });


    function search() {
        const query = searchInput.value.trim();
        if (query) {
            window.location.href = `search_results.html?query=${encodeURIComponent(query)}`;
        } else {
            alert('Por favor, introduce un término de búsqueda.');
        }
    }


    document.addEventListener('click', function (event) {
        if (!searchWrapper.contains(event.target) && !searchButton.contains(event.target) && searchWrapper.classList.contains('active')) {
            searchWrapper.classList.remove('active');
            headerIcons.classList.remove('hidden');
        }
    });
});


//LOGIN

var loginModal = document.getElementById("loginModal");
var recoverPasswordModal = document.getElementById("recoverPasswordModal");
var resetPasswordPage = document.getElementById("resetPasswordPage");
var registerModal = document.getElementById("registerModal");


var loginModalTrigger = document.getElementById("loginModalTrigger");
var openRecoverPasswordModal = document.querySelector("#openRecoverPasswordModal");
var openRegisterModalFromLogin = document.getElementById("openRegisterModalFromLogin");
var closeButtons = document.getElementsByClassName("close");


var loginButton = document.getElementById("loginButton");
var emailInput = document.getElementById("loginEmail");
var passwordInput = document.getElementById("loginPassword");
var recoverButton = document.getElementById("recoverButton");
var recoverEmailInput = document.getElementById("recoverEmail");
var resetButton = document.getElementById("resetButton");
var newPasswordInput = document.getElementById("newPassword");
var confirmPasswordInput = document.getElementById("confirmPassword");

var registerFirstNameInput = document.getElementById("registerFirstName");
var registerLastNameInput = document.getElementById("registerLastName");
var registerEmailInput = document.getElementById("registerEmail");
var registerPasswordInput = document.getElementById("registerPassword");
var registerConfirmPasswordInput = document.getElementById("registerConfirmPassword");
var registerSubmitButton = document.getElementById("registerSubmitButton");

function showModal(modal) {
    modal.style.display = "block";
}


function hideAllModals() {
    loginModal.style.display = "none";
    recoverPasswordModal.style.display = "none";
    resetPasswordPage.style.display = "none";
    registerModal.style.display = "none";
}


loginModalTrigger.onclick = function (event) {
    event.preventDefault();
    showModal(loginModal);
};


openRecoverPasswordModal.onclick = function (event) {
    event.preventDefault();
    hideAllModals();
    showModal(recoverPasswordModal);
};


openRegisterModalFromLogin.onclick = function (event) {
    event.preventDefault();
    hideAllModals();
    showModal(registerModal);
};


function addCloseEventListeners() {
    for (var i = 0; i < closeButtons.length; i++) {
        closeButtons[i].onclick = function () {
            hideAllModals();
        };
    }
}
addCloseEventListeners();


window.onclick = function (event) {
    if (event.target == loginModal || event.target == recoverPasswordModal || event.target == resetPasswordPage || event.target == registerModal) {
        hideAllModals();
    }
};


document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        if (loginModal.style.display === "block") {
            loginUser();
        } else if (registerModal.style.display === "block") {
            registerUser();
        }
    }
});

function loginUser() {
    var email = emailInput.value;
    var password = passwordInput.value;

    if (email && password) {
        // Aquí puedes agregar la lógica para autenticar al usuario
        alert("Intento de inicio de sesión con:\nCorreo: " + email + "\nContraseña: " + password);
        hideAllModals();
    } else {
        alert("Por favor, completa ambos campos.");
    }
}

// RECUPERACIÓN DE CONTRASEÑA
recoverButton.onclick = recoverPassword;

function recoverPassword() {
    var email = recoverEmailInput.value;

    if (email) {
        // Aquí puedes agregar la lógica para enviar el enlace de recuperación
        alert("Se ha enviado un enlace de recuperación al correo: " + email);
        hideAllModals();
    } else {
        alert("Por favor, ingresa tu correo electrónico.");
    }
}

// RESTABLECIMIENTO
resetButton.onclick = resetPassword;

function resetPassword() {
    var newPassword = newPasswordInput.value;
    var confirmPassword = confirmPasswordInput.value;

    if (newPassword && confirmPassword && newPassword === confirmPassword) {
        // Aquí puedes agregar la lógica para restablecer la contraseña
        alert("Contraseña restablecida exitosamente.");
        window.location.href = 'index.html';
    } else {
        alert("Las contraseñas no coinciden o están vacías.");
    }
}


registerSubmitButton.onclick = registerUser;

document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        registerUser();
    }
});

function registerUser() {
    var firstName = registerFirstNameInput.value;
    var lastName = registerLastNameInput.value;
    var email = registerEmailInput.value;
    var password = registerPasswordInput.value;
    var confirmPassword = registerConfirmPasswordInput.value;

    if (firstName && lastName && email && password && confirmPassword) {
        if (password === confirmPassword) {
            // Aquí puedes agregar la lógica para enviar los datos al servidor
            var userData = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            };

            fetch('https://TU_SERVIDOR/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert("Registro exitoso. Por favor, inicia sesión.");
                        hideAllModals();
                    } else {
                        alert("Error en el registro: " + data.message);
                    }
                })
                .catch(error => {
                    console.error("Error:", error);
                    alert("Hubo un error en el registro. Por favor, intenta nuevamente.");
                });

        } else {
            alert("Las contraseñas no coinciden.");
        }
    } else {
        alert("Por favor, completa todos los campos.");
    }
}

//CARRUSELL OFERTAS

document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.querySelector('.carousel');
    const items = document.querySelectorAll('.carousel-item');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');

    let currentIndex = 0;
    const totalItems = items.length;
    const intervalTime = 3000;
    let interval;

    function showSlide(index) {
        carousel.style.transform = `translateX(-${index * 100}%)`;
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalItems;
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        showSlide(currentIndex);
    }

    function startAutoSlide() {
        interval = setInterval(nextSlide, intervalTime);
    }

    function stopAutoSlide() {
        clearInterval(interval);
    }

    prevButton.addEventListener('click', function () {
        stopAutoSlide();
        prevSlide();
        startAutoSlide();
    });

    nextButton.addEventListener('click', function () {
        stopAutoSlide();
        nextSlide();
        startAutoSlide();
    });

    startAutoSlide();
});

document.addEventListener("DOMContentLoaded", function () {
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            function findProductById(id) {
                return data.products.find(product => product.id === id);
            }

            function generateProductHTML(product, isBestSeller = false) {
                const priceWithDiscount = product.price - (product.price * product.discount / 100);
                return `
                    <div class="${isBestSeller ? 'best-seller-carousel-item' : 'weekly-carousel-item'}">
                        <div class="product-image">
                            <a href="product_card.html?id=${product.id}" class="product-image"><img src="${product.images[0]}" alt="${product.name}"></a>
                        </div>
                        <div class="product-details">
                            <p class="carousel-category">${product.category[0]}</p>
                            <a href="product_card.html?id=${product.id}" class="related-product-card-h3"><p>${product.name}</p></a>
                            <hr class="divider-block">
                            <div class="carousel-price">
                            ${product.discount > 0 ? `<p class="carousel-discount">-${product.discount}%</p>` : ''}
                            ${product.discount > 0 ? `<p class="carousel-original-price">${product.price}</p>` : ''}
                            <span class="${isBestSeller ? 'BS-price' : 'price'}">$${priceWithDiscount.toFixed(2)}</span>
                            </div>
                            <p class="cuotas">3 cuotas sin interés de $${((priceWithDiscount) / 3).toFixed(0)}</p>
                            <button class="${isBestSeller ? 'add-cart' : 'add-to-cart'}" data-id="${product.id}">AÑADIR AL CARRITO</button>
                        </div>
                    </div>
                `;
            }

            // Función p generar el carrusel
            function generateCarousel(containerId, productIds, isBestSeller = false) {
                const container = document.querySelector(`#${containerId} .${isBestSeller ? 'best-seller-carousel' : 'weekly-carousel'}`);
                container.innerHTML = '';

                productIds.forEach(id => {
                    const product = findProductById(id);
                    if (product) {
                        container.innerHTML += generateProductHTML(product, isBestSeller);
                    }
                });
            }


            generateCarousel('weekly-featured', data.weekly_featured);
            generateCarousel('best-sellers', data.best_sellers, true);

            function setupCarousel(carouselClass, leftBtnId, rightBtnId) {
                const carousel = document.querySelector(`.${carouselClass}`);
                const leftBtn = document.getElementById(leftBtnId);
                const rightBtn = document.getElementById(rightBtnId);
                const items = document.querySelectorAll(`.${carouselClass}-item`);
                const itemWidth = 220;
                let scrollAmount = 0;
                const visibleItems = 4;

                const allItems = [...items, ...items];
                carousel.innerHTML = ""; 
                allItems.forEach(item => carousel.appendChild(item.cloneNode(true)));

                const totalItems = allItems.length;
                const maxScroll = (totalItems - visibleItems) * itemWidth;

                function scrollRight() {
                    if (scrollAmount < maxScroll) {
                        scrollAmount += itemWidth;
                        carousel.style.transition = 'transform 0.5s ease';
                        carousel.style.transform = `translateX(-${scrollAmount}px)`;
                    }

                    if (scrollAmount >= maxScroll) {
                        setTimeout(() => {
                            scrollAmount = visibleItems * itemWidth;
                            carousel.style.transition = 'none';
                            carousel.style.transform = `translateX(-${scrollAmount}px)`;
                        }, 500); 
                    }
                }

                function scrollLeft() {
                    if (scrollAmount > 0) {
                        scrollAmount -= itemWidth;
                        carousel.style.transition = 'transform 0.5s ease';
                        carousel.style.transform = `translateX(-${scrollAmount}px)`;
                    }

                    if (scrollAmount <= 0) {
                        setTimeout(() => {
                            scrollAmount = (maxScroll - (totalItems - visibleItems) * itemWidth);
                            carousel.style.transition = 'none';
                            carousel.style.transform = `translateX(-${scrollAmount}px)`;
                        }, 500); 
                    }
                }

                let autoScroll;

                function startAutoScroll() {
                    autoScroll = setInterval(scrollRight, 5000);
                }

                function stopAutoScroll() {
                    clearInterval(autoScroll);
                }

                rightBtn.addEventListener("click", () => {
                    stopAutoScroll();
                    scrollRight();
                    startAutoScroll();
                });

                leftBtn.addEventListener("click", () => {
                    stopAutoScroll();
                    scrollLeft();
                    startAutoScroll();
                });

                startAutoScroll();
            }

            setupCarousel('weekly-carousel', 'left-btn', 'right-btn');
            setupCarousel('best-seller-carousel', 'bs-left-btn', 'bs-right-btn');
        })
        .catch(error => console.error('Error al cargar el JSON:', error));
});


document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", (event) => {
        if (event.target.classList.contains("add-to-cart") || event.target.classList.contains("add-cart")) {
            let productId = parseInt(event.target.getAttribute("data-id"));
            if (!isNaN(productId)) {
                addToCart(productId);
            }
        }
    });
});

//marcas

let currentIndex = 0;

function moveLeft() {
    const brandContainer = document.querySelector('.brand-container');
    const items = document.querySelectorAll('.brand-item');
    const itemWidth = items[0].clientWidth + 20;

    if (currentIndex > 0) {
        currentIndex = Math.max(currentIndex - 1, 0);
        brandContainer.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }
}

function moveRight() {
    const brandContainer = document.querySelector('.brand-container');
    const items = document.querySelectorAll('.brand-item');
    const itemWidth = items[0].clientWidth + 20; 
    const maxIndex = items.length - 6; 

    if (currentIndex < maxIndex) {
        currentIndex = Math.min(currentIndex + 1, maxIndex);
        brandContainer.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }
}

const autoScroll = setInterval(() => {
    const items = document.querySelectorAll('.brand-item');
    const maxIndex = items.length - 6; 

    if (currentIndex < maxIndex) {
        moveRight();
    } else {
        clearInterval(autoScroll);
    }
}, 3000);


//PRODUCT CARD//

document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById("view-all-products").addEventListener("click", () => {
        window.location.href = "./product_grid.html";
    });
});