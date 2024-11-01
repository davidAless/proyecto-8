document.addEventListener('DOMContentLoaded', function() {
    const categoriaLista = document.querySelector('.categoria-lista');
    const buscador = document.getElementById('buscar-categoria');
    let todasLasCategorias = [];

    // Función para cargar las categorías
    function cargarCategorias() {
        const categorias = [
            { id: 1, nombre: "Pokémon Básicos", descripcion: "Cartas de Pokémon en su forma inicial" },
            { id: 2, nombre: "Pokémon Evolucionados", descripcion: "Cartas de Pokémon en sus formas evolucionadas" },
            { id: 3, nombre: "Pokémon Legendarios", descripcion: "Cartas de Pokémon legendarios y raros" },
            { id: 4, nombre: "Pokémon Míticos", descripcion: "Cartas de Pokémon míticos y ultra raros" },
            { id: 5, nombre: "Pokémon de Tipo Fuego", descripcion: "Cartas de Pokémon de tipo fuego" },
            { id: 6, nombre: "Pokémon de Tipo Agua", descripcion: "Cartas de Pokémon de tipo agua" },
            { id: 7, nombre: "Pokémon de Tipo Planta", descripcion: "Cartas de Pokémon de tipo planta" },
            { id: 8, nombre: "Pokémon de Tipo Eléctrico", descripcion: "Cartas de Pokémon de tipo eléctrico" },
            { id: 9, nombre: "Pokémon de Tipo Psíquico", descripcion: "Cartas de Pokémon de tipo psíquico" },
            { id: 10, nombre: "Pokémon de Tipo Lucha ", descripcion: "Cartas de Pokémon de tipo lucha" },
            { id: 11, nombre: "Pokémon de Tipo Dragón", descripcion: "Cartas de Pokémon de tipo dragón" },
            { id: 12, nombre: "Pokémon de Tipo Siniestro", descripcion: "Cartas de Pokémon de tipo siniestro" },
            { id: 13, nombre: "Pokémon de Tipo Hada", descripcion: "Cartas de Pokémon de tipo hada" },
            { id: 14, nombre: "Entrenadores", descripcion: "Cartas de entrenadores y personajes humanos" },
            { id: 15, nombre: "Energías", descripcion: "Cartas de energía para potenciar Pokémon" },
            { id: 16, nombre: "Estadios", descripcion: "Cartas de estadio que afectan el campo de batalla" },
            { id: 17, nombre: "Pokémon Shiny", descripcion: "Cartas de Pokémon en su variante brillante" },
            { id: 18, nombre: "Pokémon Antiguos", descripcion: "Cartas de Pokémon de generaciones anteriores" },
            { id: 19, nombre: "Pokémon Gigantamax", descripcion: "Cartas de Pokémon en su forma Gigantamax" },
            { id: 20, nombre: "Coleccionables Raros", descripcion: "Cartas ultra raras y ediciones limitadas" }
        ];

        todasLasCategorias = categorias;

        categorias.forEach(categoria => {
            const categoriaElement = document.createElement('div');
            categoriaElement.classList.add('categoria-item');
            categoriaElement.innerHTML = `
                <h2>${categoria.nombre}</h2>
                <p>${categoria.descripcion}</p>
                <a href="productos.html?categoria=${categoria.id} ">Ver productos</a>
            `;
            categoriaLista.appendChild(categoriaElement);
        });
    }

    // Función para buscar categorías
    function buscarCategoria(event) {
        const textoBuscado = event.target.value.toLowerCase();
        const categoriasFiltradas = todasLasCategorias.filter(categoria => {
            return categoria.nombre.toLowerCase().includes(textoBuscado);
        });

        categoriaLista.innerHTML = '';

        categoriasFiltradas.forEach(categoria => {
            const categoriaElement = document.createElement('div');
            categoriaElement.classList.add('categoria-item');
            categoriaElement.innerHTML = `
                <h2>${categoria.nombre}</h2>
                <p>${categoria.descripcion}</p>
                <a href="productos.html?categoria=${categoria.id} ">Ver productos</a>
            `;
            categoriaLista.appendChild(categoriaElement);
        });
    }

    // Agregamos el evento de búsqueda
    buscador.addEventListener('input', buscarCategoria);

    cargarCategorias();
});