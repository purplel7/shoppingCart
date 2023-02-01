//Variable
const listaCursos = document.querySelector("#lista-cursos");
const listaCarrito = document.querySelector("#lista-carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const carrito = document.querySelector("#lista-carrito");
const todoCarrito = document.querySelector("#vaciar-carrito");


let articulosCarrito = [];

//addEvenListener
cargarEventListener();

function cargarEventListener() {
  listaCursos.addEventListener("click", agregarCurso);
  carrito.addEventListener("click", cancelarPedido);
  todoCarrito.addEventListener("click", ()=>{
    articulosCarrito=[];
    limpiarHTML();
    console.log(articulosCarrito);

  });

}

//Funciones
function agregarCurso(e) {
  //console.log("Haciendo clic en cursos")
  if (e.target.classList.contains("agregar-carrito")) {
    //console.log("tiene la clase argegar");
    //console.log(e.target.parentElement.parentElement);
    cursoSleccionado = e.target.parentElement.parentElement;

    leerDatosCurso(cursoSleccionado);
  }
}

function leerDatosCurso(cursoSleccionado) {
  //console.log(cursoSleccionado);

  //Creamos un objetocon el contenido del curso actual
  const infoCurso = {
    imagen: cursoSleccionado.querySelector("img").src,
    nombre: cursoSleccionado.querySelector("h4").textContent,
    precio: parseFloat(
      cursoSleccionado.querySelector(".precio span").textContent
    ),
    id: cursoSleccionado.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };
  //console.log(typeof infoCurso.precio);

  //console.log(infoCurso);

  //Verificamos si el nuevo infocurso existe en el array articulos curso
  const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);
  if (existe) {
    const cursos = articulosCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.precio = curso.precio + infoCurso.precio;
        curso.cantidad++;
        return curso;
      } else {
        return curso;
      }
    });

    articulosCarrito = [...cursos];
  } else {
    articulosCarrito = [...articulosCarrito, infoCurso];
    console.log(articulosCarrito);
  }

  carritoHTML();
}

function carritoHTML() {
  limpiarHTML();

  //console.log("desd ecarrito html");
  articulosCarrito.forEach((curso) => {
    const { imagen, nombre, precio, id, cantidad } = curso;
    //console.log(nombre);

    const row = document.createElement("tr");
    row.innerHTML = `
        <td><img src="${imagen}" width=100></td>
        <td>${nombre}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}"> X</a>
        </td>
        
        `;

    contenedorCarrito.appendChild(row);
  });
}

function cancelarPedido (e){
 
  
  if(e.target.classList.contains("borrar-curso")){
    console.log("Eliminando carrito")
    idCursoRepe=e.target.getAttribute("data-id");
    articulosCarrito=articulosCarrito.filter(curso =>curso.id!= idCursoRepe)
    console.log(articulosCarrito);

    carritoHTML();
  }
}

function limpiarHTML() {
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
