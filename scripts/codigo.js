//search
document.addEventListener('DOMContentLoaded', function() {
    // Selecciona el botón de búsqueda y el campo de entrada de búsqueda
    const searchButton = document.querySelector('.search-button');
    const searchInput = document.querySelector('.search-wrapper input');
    const searchWrapper = document.querySelector('.search-wrapper');
    const headerIcons = document.querySelector('.header-icons');
    const logo = document.querySelector('.logo h1');

    // Añade un escuchador de eventos al botón de búsqueda
    searchButton.addEventListener('click', function(event) {
        event.preventDefault(); // Previene el envío del formulario
        if (window.innerWidth <= 768) {
            searchWrapper.classList.toggle('active');
            headerIcons.classList.toggle('hidden');
        } else {
            search(); // Llama a la función de búsqueda en pantallas grandes
        }
    });

    // Añade un escuchador de eventos al campo de entrada de búsqueda para detectar la tecla Enter
    searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Previene el envío del formulario al presionar Enter
            search(); // Llama a la función de búsqueda
        }
    });

    // Función de búsqueda
    function search() {
        // Obtiene el valor del campo de búsqueda y elimina espacios en blanco
        const query = searchInput.value.trim();
        if (query) {
            // Redirige a la página de resultados de búsqueda con la consulta como parámetro de la URL
            window.location.href = `search_results.html?query=${encodeURIComponent(query)}`;
        } else {
            alert('Por favor, introduce un término de búsqueda.');
        }
    }

    // Oculta la barra de búsqueda al hacer clic fuera de ella
    document.addEventListener('click', function(event) {
        if (!searchWrapper.contains(event.target) && !searchButton.contains(event.target) && searchWrapper.classList.contains('active')) {
            searchWrapper.classList.remove('active');
            headerIcons.classList.remove('hidden');
        }
    });
});


//LOGIN
// Obtener el modal de opciones y el modal de login
var optionsModal = document.getElementById("optionsModal");
var loginModal = document.getElementById("loginModal");
var recoverPasswordModal = document.getElementById("recoverPasswordModal");
var resetPasswordPage = document.getElementById("resetPasswordPage");
var registerModal = document.getElementById("registerModal");

// Obtener los botones que abren los modales
var loginModalTrigger = document.getElementById("loginModalTrigger");
var loginModalOpen = document.getElementById("loginModalOpen");
var openRecoverPasswordModal = document.querySelector("#openRecoverPasswordModal");
var openRegisterModalFromOptions = document.getElementById("openRegisterModalFromOptions");
var openRegisterModalFromLogin = document.getElementById("openRegisterModalFromLogin");
var closeButtons = document.getElementsByClassName("close");

// Obtener los campos de entrada y botones
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
var registerConfirmPasswordInput = document.getElementById("registerConfirmPassword")
var registerSubmitButton = document.getElementById("registerSubmitButton");

// Función para mostrar un modal específico
function showModal(modal) {
    modal.style.display = "block";
}

// Función para ocultar todos los modales
function hideAllModals() {
    optionsModal.style.display = "none";
    loginModal.style.display = "none";
    recoverPasswordModal.style.display = "none";
    resetPasswordPage.style.display = "none";
    registerModal.style.display = "none";
}
// Cuando el usuario hace clic en el botón de login, abre el modal de opciones
loginModalTrigger.onclick = function(event) {
    event.preventDefault(); // Prevenir comportamiento por defecto del enlace
    showModal(optionsModal);
}

// Cuando el usuario hace clic en el botón "ENTRAR A MI USUARIO", abre el modal de login
loginModalOpen.onclick = function(event) {
    event.preventDefault();
    hideAllModals();
    showModal(loginModal);
}

// Abrir el modal de recuperación de contraseña
openRecoverPasswordModal.onclick = function(event) {
    event.preventDefault();
    hideAllModals();
    showModal(recoverPasswordModal);
};

// Abrir el modal de registro desde el link en el modal de opciones
openRegisterModalFromOptions.onclick = function(event) {
    event.preventDefault();
    hideAllModals();
    showModal(registerModal);
};

// Abrir el modal de registro desde el link en el modal de login
openRegisterModalFromLogin.onclick = function(event) {
    event.preventDefault();
    hideAllModals();
    showModal(registerModal);
};

// Cerrar modales
function addCloseEventListeners() {
    for (var i = 0; i < closeButtons.length; i++) {
        closeButtons[i].onclick = function() {
            hideAllModals();
        };
    }
}
addCloseEventListeners();

// Cuando el usuario hace clic en cualquier parte fuera del modal, cierra el modal
window.onclick = function(event) {
    if (event.target == optionsModal || event.target == loginModal || event.target == recoverPasswordModal || event.target == resetPasswordPage) {
        hideAllModals();
    }
};

// Manejar el botón de ingresar y la tecla Enter en el modal de login
document.addEventListener("keydown", function(event) {
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

//RECUPERACION DE CONTRASENA
recoverButton.onclick = recoverPassword;

function recoverPassword() {
    var email = recoverEmailInput.value;

    if (email) {
        // Aquí puedes agregar la lógica para enviar el enlace de recuperación
        alert("Se ha enviado un enlace de recuperación al correo: " + email);
        hideAllModals();
        // Mostrar el modal de restablecimiento de contraseña si es necesario
        // showModal(resetPasswordPage); // Descomentar si se quiere mostrar el modal de restablecimiento después
    } else {
        alert("Por favor, ingresa tu correo electrónico.");
    }
}
//RESTABLECIMIENTO

resetButton.onclick = resetPassword;

function resetPassword() {
    var newPassword = newPasswordInput.value;
    var confirmPassword = confirmPasswordInput.value;

    if (newPassword && confirmPassword && newPassword === confirmPassword) {
        // Aquí puedes agregar la lógica para restablecer la contraseña
        alert("Contraseña restablecida exitosamente.");
        // Redirigir al usuario a la página de inicio de sesión
        window.location.href = '/login';
    } else {
        alert("Por favor, asegúrate de que las contraseñas coincidan.");
    }
}

// Registro de usuario
registerSubmitButton.onclick = registerUser;

document.addEventListener("keydown", function(event) {
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

            // Ejemplo de envío de datos al servidor usando Fetch API
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

document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const items = document.querySelectorAll('.carousel-item');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');

    let currentIndex = 0;
    const totalItems = items.length;
    const intervalTime = 3000; // Cambia cada 3 segundos
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

    prevButton.addEventListener('click', function() {
        stopAutoSlide();
        prevSlide();
        startAutoSlide();
    });

    nextButton.addEventListener('click', function() {
        stopAutoSlide();
        nextSlide();
        startAutoSlide();
    });

    startAutoSlide();
});


//MAIN PRODUCTOS
// botones

document.addEventListener("DOMContentLoaded", function() {
    const carousel = document.querySelector(".weekly-carousel");
    const leftBtn = document.getElementById("left-btn");
    const rightBtn = document.getElementById("right-btn");
    const items = document.querySelectorAll(".weekly-carousel-item");
    const itemWidth = 220; // Ancho de cada elemento incluyendo margen
    let scrollAmount = 0;
    const visibleItems = 4;

    // Duplicar los elementos al inicio y al final para lograr el efecto de bucle
    const allItems = [...items, ...items];
    carousel.innerHTML = ""; // Limpiar el carrusel
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
            }, 500); // Tiempo de la transición en ms
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
            }, 500); // Tiempo de la transición en ms
        }
    }

    rightBtn.addEventListener("click", scrollRight);
    leftBtn.addEventListener("click", scrollLeft);

    // Auto-desplazamiento cada 4 segundos
    setInterval(() => {
        if (scrollAmount < maxScroll) {
            scrollRight();
        } else {
            scrollAmount = 0;
            carousel.style.transition = 'none';
            carousel.style.transform = `translateX(0px)`;
        }
    }, 4000);
});




//buscar por marcas

let currentIndex = 0;

function moveLeft() {
    const brandContainer = document.querySelector('.brand-container');
    const items = document.querySelectorAll('.brand-item');
    const itemWidth = items[0].clientWidth + 20; // Ancho del item más margen

    if (currentIndex > 0) {
        currentIndex = Math.max(currentIndex - 1, 0);
        brandContainer.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }
}

function moveRight() {
    const brandContainer = document.querySelector('.brand-container');
    const items = document.querySelectorAll('.brand-item');
    const itemWidth = items[0].clientWidth + 20; // Ancho del item más margen
    const maxIndex = items.length - 7; // Mostrar 7 elementos a la vez

    if (currentIndex < maxIndex) {
        currentIndex = Math.min(currentIndex + 1, maxIndex);
        brandContainer.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }
}

// Desplazamiento automático cada 5 segundos
const autoScroll = setInterval(() => {
    const items = document.querySelectorAll('.brand-item');
    const maxIndex = items.length - 7; // Mostrar 7 elementos a la vez

    if (currentIndex < maxIndex) {
        moveRight();
    } else {
        clearInterval(autoScroll);
    }
}, 3000);


//MAS VENDIDOS
// botones

document.addEventListener("DOMContentLoaded", function() {
    const carousel = document.querySelector(".best-seller-carousel");
    const leftBtn = document.getElementById("bs-left-btn");
    const rightBtn = document.getElementById("bs-right-btn");
    const items = document.querySelectorAll(".best-seller-carousel-item");
    const itemWidth = 220; // Ancho de cada elemento incluyendo margen
    let scrollAmount = 0;
    const visibleItems = 4;

    // Duplicar los elementos al inicio y al final para lograr el efecto de bucle
    const allItems = [...items, ...items];
    carousel.innerHTML = ""; // Limpiar el carrusel
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
            }, 500); // Tiempo de la transición en ms
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
            }, 500); // Tiempo de la transición en ms
        }
    }

    rightBtn.addEventListener("click", scrollRight);
    leftBtn.addEventListener("click", scrollLeft);

    // Auto-desplazamiento cada 4 segundos
    setInterval(() => {
        if (scrollAmount < maxScroll) {
            scrollRight();
        } else {
            scrollAmount = 0;
            carousel.style.transition = 'none';
            carousel.style.transform = `translateX(0px)`;
        }
    }, 4000);
});

//PRODUCT CARD//

document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById("view-all-products").addEventListener("click", () => {
        // Redirigir a la página donde se muestra la grilla completa de productos
        window.location.href = "./product_grid.html";
    });
}); 