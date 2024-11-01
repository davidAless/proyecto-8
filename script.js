// Variables para el carrito
let cart = [];
let total = 0;

// Evento personalizado
const cartUpdated = new CustomEvent('cartUpdated', { detail: { cart, total } });

// Función para agregar productos al carrito
function addToCart(product, price) {
    cart.push({ product, price });
    total += price;
    updateCart();
}

// Función para eliminar productos
function removeFromCart(index) {
    total -= cart[index].price;
    cart.splice(index, 1);
    updateCart();
}

// Actualización dinámica del carrito
function updateCart() {
    const cartList = document.getElementById('cart-list');
    cartList.innerHTML = '';
    cart.forEach((item, index) => {
        cartList.innerHTML += `<div>${item.product} - ${item.price} MXN <button onclick="removeFromCart(${index})">Eliminar</button></div>`;
    });
    document.getElementById('total').innerText = total;
    document.dispatchEvent(cartUpdated); // Evento personalizado
}

// Productos de ejemplo
const products = [
    { name: 'Carta Pikachu', price: 200 },
    { name: 'Carta Charmander', price: 150 },
    { name: 'Carta Bulbasaur', price: 180 },
];

// Renderizar productos
function renderProducts() {
    const productList = document.getElementById('product-list');
    products.forEach(product => {
        productList.innerHTML += `<div>${product.name} - ${product.price} MXN <button onclick="addToCart('${product.name}', ${product.price})">Agregar al carrito</button></div>`;
    });
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    document.addEventListener('cartUpdated', function(e) {
        console.log("El carrito ha sido actualizado:", e.detail);
    });
});
