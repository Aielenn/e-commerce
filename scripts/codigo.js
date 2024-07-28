//search
document.addEventListener('DOMContentLoaded', function() {
    // Selecciona el botón de búsqueda y el campo de entrada de búsqueda
    const searchButton = document.querySelector('.search-button');
    const searchInput = document.querySelector('.search-wrapper input');

    // Añade un escuchador de eventos al botón de búsqueda
    searchButton.addEventListener('click', function(event) {
        event.preventDefault(); // Previene el envío del formulario
        search(); // Llama a la función de búsqueda
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
