const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = []

listaCursos.addEventListener('click', agregarCursoCarrito);
carrito.addEventListener('click', eliminarCursoCarrito);

vaciarCarritoBtn.addEventListener('click', () => {
    articulosCarrito = [];
    mostrarArticulosCarrito()
})

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
        const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
        if(existe) {
            //Actualizamos la cantidad
            const cursos = articulosCarrito.map( curso => {
                if(curso.id === infoCurso.id) {
                    curso.cantidad++
                    return curso;
                } else {
                    return curso
                }
            });
            articulosCarrito = [...cursos]
        } else {
            articulosCarrito = [...articulosCarrito, infoCurso]
        }
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

function eliminarCursoCarrito(e) {

    if(e.target.classList.contains("borrar-curso")) {
        const cursoId = e.target.getAttribute('data-id');

        articulosCarrito = articulosCarrito.filter( curso => curso.id != cursoId);

        mostrarArticulosCarrito()
    }
}