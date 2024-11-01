document.addEventListener('DOMContentLoaded', function() {
    const productosLista = document.querySelector('.productos-lista');
    const buscador = document.getElementById('buscar-producto');
    let todosLosProductos = [];

    // Función para cargar los productos existentes en HTML
    function cargarProductosExistentes() {
        todosLosProductos = Array.from(document.querySelectorAll('.producto')).map(el => ({
            id: parseInt(el.querySelector('button').getAttribute('onclick').match(/\d+/)[0]),
            nombre: el.querySelector('h3').textContent,
            precio: parseInt(el.querySelector('p').textContent.match(/\d+/)[0]),
            imagen: el.querySelector('img').getAttribute('src')
        }));
    }

    // Función para buscar productos
    function buscarProducto(event) {
        const textoBuscado = event.target.value.toLowerCase();
        const productosFiltrados = todosLosProductos.filter(producto => {
            return producto.nombre.toLowerCase().includes(textoBuscado);
        });

        mostrarProductosFiltrados(productosFiltrados);
    }

    // Función para mostrar productos filtrados
    function mostrarProductosFiltrados(productos) {
        const todosLosProductosElements = document.querySelectorAll('.producto');
        todosLosProductosElements.forEach(el => {
            const nombre = el.querySelector('h3').textContent;
            if (productos.some(p => p.nombre === nombre)) {
                el.style.display = '';
            } else {
                el.style.display = 'none';
            }
        });
    }

    // Agregamos el evento de búsqueda
    buscador.addEventListener('input', buscarProducto);

    // Cargamos los productos existentes en HTML
    cargarProductosExistentes();
});