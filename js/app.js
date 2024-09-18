const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = []

listaCursos.addEventListener('click', agregarCursoCarrito)

function agregarCursoCarrito(e) {
    // Se revisa que al elemento que se esta dando click, tenga la clase agregar-carrito
    if(e.target.classList.contains("agregar-carrito")) {
        let cursoSeleccionado = e.target.parentElement.parentElement;

        let infoCurso = {
            id: cursoSeleccionado.querySelector('a').getAttribute('data-id'),
            cantidad: 1,
            imagen: cursoSeleccionado.querySelector('img').src,
            nombre: cursoSeleccionado.querySelector('h4').textContent,
            precio: cursoSeleccionado.querySelector('.precio span').textContent
        }
        articulosCarrito = [...articulosCarrito, infoCurso]
        mostrarArticulosCarrito()
    }
}

function mostrarArticulosCarrito() {
    // Limpiar el HTML
    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }

    articulosCarrito.forEach( articulo => {
        const filaArticulo = document.createElement('tr');
        filaArticulo.innerHTML = `
        <td> 
            <img src="${articulo.imagen}" width="100"> 
        </td>
        <td> ${articulo.nombre} </td>
        <td> ${articulo.precio} </td>
        <td> ${articulo.cantidad} </td>
        <td> 
            <a href="#" class="borrar-curso" data-id="${articulo.id}"> X </a>
        </td>
        `
        // Mostrar en el carrito
        contenedorCarrito.appendChild(filaArticulo);
    })
}