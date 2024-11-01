let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Agregar producto al carrito
function agregarAlCarrito(productoID) {
    let producto;

    switch (productoID) {
        case 1:
            producto = { id: 1, nombre: 'Carta Pikachu', precio: 200, cantidad: 1 };
            break;
        case 2:
            producto = { id: 2, nombre: 'Carta Charizard', precio: 500, cantidad: 1 };
            break;
        case 3:
            producto = { id: 3, nombre: 'Carta Bulbasaur', precio: 300, cantidad: 1 };
            break;
        case 4:
            producto = { id: 4, nombre: 'Carta Squirtle', precio: 250, cantidad: 1 };
            break;
        case 5:
            producto = { id: 5, nombre: 'Carta Meowth', precio: 150, cantidad: 1 };
            break;
        case 6:
            producto = { id: 6, nombre: 'Carta Jigglypuff', precio: 180, cantidad: 1 };
            break;
        case 7:
            producto = { id: 7, nombre: 'Carta Eevee', precio: 220, cantidad: 1 };
            break;
        default:
            return;
    }

    // Verificar si el producto ya está en el carrito
    const productoExistente = carrito.find(p => p.id === productoID);
    
    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        carrito.push(producto);
    }

    // Guardar el carrito actualizado en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Actualizar la vista del carrito en la misma página
    actualizarCarrito();

    // Mostrar el modal
    mostrarModal();
}

function mostrarModal() {
    const modal = document.getElementById('modal');
    const span = document.getElementsByClassName("close")[0];

    modal.style.display = "block";

    // Cerrar el modal cuando se hace clic en la X
    span.onclick = function() {
        modal.style.display = "none";
    }

    // Cerrar el modal cuando se hace clic fuera de él
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Cerrar el modal automáticamente después de 3 segundos
    setTimeout(function() {
        modal.style.display = "none";
    }, 3000);
}

// Actualizar la vista del carrito en la misma página
function actualizarCarrito() {
    carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    const carritoItems = document.querySelector('#carrito-items tbody');
    carritoItems.innerHTML = '';

    let total = 0;

    carrito.forEach((producto) => {
        const fila = document.createElement('tr');

        fila.innerHTML = `
            <td>${producto.nombre}</td>
            <td>${producto.cantidad}</td>
            <td>$${producto.precio}</td>
            <td>$${producto.precio * producto.cantidad}</td>
            <td>
                <button onclick="eliminarDelCarrito(${producto.id})">Eliminar</button>
                <button onclick="incrementarCantidad(${producto.id})">+</button>
                <button onclick="decrementarCantidad(${producto.id})">-</button>
            </td>
        `;

        carritoItems.appendChild(fila);
        total += producto.precio * producto.cantidad;
    });

    document.getElementById('total-pagar').textContent = total;
}

// Eliminar un producto del carrito
function eliminarDelCarrito(productoID) {
    carrito = carrito.filter(producto => producto.id !== productoID);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
}

// Incrementar la cantidad de un producto en el carrito
function incrementarCantidad(productoID) {
    const producto = carrito.find(p => p.id === productoID);
    if (producto) {
        producto.cantidad += 1;
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
}

// Decrementar la cantidad de un producto en el carrito
function decrementarCantidad(productoID) {
    const producto = carrito.find(p => p.id === productoID);
    if (producto && producto.cantidad > 1) {
        producto.cantidad -= 1;
    } else if (producto && producto.cantidad === 1) {
        eliminarDelCarrito(productoID);
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
}

// Cargar el carrito cuando la página esté lista
document.addEventListener('DOMContentLoaded', function() {
    actualizarCarrito();
});


// Procesar la compra
function procesarCompra() {
    if (carrito.length > 0) {
        alert('Compra realizada con éxito.');
        carrito = [];
        actualizarCarrito();
    } else {
        alert('No hay productos en el carrito.');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    actualizarCarrito();
});


