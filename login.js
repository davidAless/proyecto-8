// Función para iniciar sesión
function loginUser(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Aquí iría la lógica para validar los datos y autenticar al usuario
    // En este ejemplo, simulamos una autenticación básica
    if (email === 'user@ejemplo.com' && password === '123456') {
        alert('Inicio de sesión exitoso');
        window.location.href = 'index.html'; // Redirige a la página principal
    } else {
        alert('Correo electrónico o contraseña incorrectos');
    }
}

// Función para registrar un nuevo usuario
function registerUser(event) {
    event.preventDefault();
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return false;
    }

    // Aquí iría la lógica para registrar el usuario
    alert('Usuario registrado exitosamente');
    // Puedes redirigir a la página principal después del registro exitoso
    window.location.href = 'index.html';
}

// Función para mostrar el formulario de registro
function showRegisterForm() {
    document.getElementById('register-container').style.display = 'block';
}

// Función para validar contraseña segura
function validarContraseñaSegura(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const errores = [];

    if (password.length < minLength) {
        errores.push(`La contraseña debe tener al menos ${minLength} caracteres`);
    }
    if (!hasUpperCase) {
        errores.push("Debe contener al menos una letra mayúscula");
    }
    if (!hasLowerCase) {
        errores.push("Debe contener al menos una letra minúscula");
    }
    if (!hasNumbers) {
        errores.push("Debe contener al menos un número");
    }
    if (!hasSpecialChars) {
        errores.push("Debe contener al menos un carácter especial (!@#$%^&*(),.?\":{}|<>)");
    }

    return {
        esValida: errores.length === 0,
        errores: errores
    };
}

// Función modificada para registrar usuario
function registerUser(event) {
    event.preventDefault();
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return false;
    }

    // Validar contraseña segura
    const validacion = validarContraseñaSegura(password);
    if (!validacion.esValida) {
        alert('No se puede completar el registro. La contraseña debe cumplir con los siguientes requisitos:\n\n' + 
              validacion.errores.join('\n'));
        return false;
    }

    // Si la contraseña es segura y todo está correcto, proceder con el registro
    alert('Usuario registrado exitosamente');
    window.location.href = 'index.html';
}

// Validación en tiempo real mientras se escribe la contraseña
document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('register-password');
    const submitButton = document.querySelector('#register-form button[type="submit"]');

    passwordInput.addEventListener('input', function(e) {
        const password = e.target.value;
        const validacion = validarContraseñaSegura(password);
        
        // Crear o actualizar el mensaje de validación
        let mensajeValidacion = document.getElementById('mensaje-validacion');
        if (!mensajeValidacion) {
            mensajeValidacion = document.createElement('div');
            mensajeValidacion.id = 'mensaje-validacion';
            mensajeValidacion.style.marginTop = '5px';
            e.target.parentNode.appendChild(mensajeValidacion);
        }

        if (password.length > 0) {
            if (!validacion.esValida) {
                mensajeValidacion.innerHTML = '<strong>La contraseña debe cumplir:</strong><br>' + 
                    validacion.errores.map(error => `• ${error}`).join('<br>');
                mensajeValidacion.style.color = '#FFD700';
                submitButton.disabled = true; // Deshabilita el botón si la contraseña no es segura
            } else {
                mensajeValidacion.innerHTML = '✓ Contraseña segura';
                mensajeValidacion.style.color = '#4CAF50';
                submitButton.disabled = false; // Habilita el botón si la contraseña es segura
            }
        } else {
            mensajeValidacion.innerHTML = '';
            submitButton.disabled = true;
        }
    });
});

// Función para mostrar el formulario de registro (mantenemos tu función original)
function showRegisterForm() {
    document.getElementById('register-container').style.display = 'block';
}

// Función para iniciar sesión (mantenemos tu función original)
function loginUser(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email === 'user@ejemplo.com' && password === '123456') {
        alert('Inicio de sesión exitoso');
        window.location.href = 'index.html';
    } else {
        alert('Correo electrónico o contraseña incorrectos');
    }
}
document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('register-password');
    const progressBar = document.querySelector('.progress');
    const strengthText = document.querySelector('.strength-text');

    passwordInput.addEventListener('input', function() {
        const password = this.value;
        const strength = medirFuerzaPassword(password);
        actualizarBarraProgreso(strength);
    });

    function medirFuerzaPassword(password) {
        let score = 0;
        
        // Longitud
        if (password.length >= 8) score += 20;
        if (password.length >= 12) score += 10;
        
        // Letras minúsculas
        if (/[a-z]/.test(password)) score += 10;
        
        // Letras mayúsculas
        if (/[A-Z]/.test(password)) score += 15;
        
        // Números
        if (/\d/.test(password)) score += 15;
        
        // Caracteres especiales
        if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 15;
        
        // Combinaciones
        if (/([a-zA-Z0-9!@#$%^&*(),.?":{}|<>])\1\1/.test(password)) score -= 10; // Penalizar repeticiones
        
        // Variedad de caracteres
        const uniqueChars = new Set(password).size;
        score += Math.min(uniqueChars * 2, 15);

        return score;
    }

    function actualizarBarraProgreso(score) {
        let strength = '';
        let color = '';
        let width = '';

        if (score >= 90) {
            strength = 'Muy fuerte';
            color = 'muy-fuerte';
            width = '100%';
        } else if (score >= 70) {
            strength = 'Fuerte';
            color = 'fuerte';
            width = '80%';
        } else if (score >= 50) {
            strength = 'Media';
            color = 'medio';
            width = '60%';
        } else if (score >= 30) {
            strength = 'Débil';
            color = 'debil';
            width = '40%';
        } else {
            strength = 'Muy débil';
            color = 'muy-debil';
            width = '20%';
        }

        // Remover clases anteriores
        progressBar.className = 'progress';
        // Agregar nueva clase
        progressBar.classList.add(color);
        // Actualizar ancho
        progressBar.style.width = width;
        // Actualizar texto
        strengthText.textContent = `Fuerza de la contraseña: ${strength}`;

        // Actualizar el estado del botón de envío
        const submitButton = document.querySelector('#register-form button[type="submit"]');
        if (submitButton) {
            submitButton.disabled = score < 50; // Deshabilitar si la puntuación es menor a 50
        }
    }
});