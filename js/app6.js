//variables
const listaCursos = document.querySelector("#lista-cursos");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const carrito = document.querySelector("#lista-carrito");
const todoCarrito = document.querySelector("#vaciar-carrito");
//const borrarCurso = document.querySelector("#borrar-curso");



let articulosCarrito = [];

//addEventLsitener
addEventLsitener();
function addEventLsitener() {
  listaCursos.addEventListener("click", listarCursos);
  carrito.addEventListener("click", cancelarPedido);
  todoCarrito.addEventListener("click",()=>{

    articulosCarrito=[];
    limpiarHTML();
    console.log(articulosCarrito);
  });

  
}

//funciones
function listarCursos(e) {
  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = e.target.parentElement.parentElement;

    capturarDatos(cursoSeleccionado);
  }
}

function capturarDatos(cursoSeleccionado) {
  //console.log(cursoSeleccionado);

  //objeto del articulo
  const curso = {
    imagen: cursoSeleccionado.querySelector("img").src,
    nombre:cursoSeleccionado.querySelector("h4").textContent,
    autor: cursoSeleccionado.querySelector("p").textContent,
    precio:parseInt(cursoSeleccionado.querySelector("span").textContent),
    cantidad: 1,
    id: cursoSeleccionado.querySelector("a").getAttribute("data-id") ,
  };

  //verificamos si el curso se repite

  const existe = articulosCarrito.some(cursoArt => cursoArt.id ===curso.id )
  console.log(existe)

  if(existe){
    const cursos = articulosCarrito.map(cursoArt=>{
        if(cursoArt.id===curso.id){
            cursoArt.precio = cursoArt.precio + curso.precio;
            cursoArt.cantidad++;
            return cursoArt;
        }else{
            return cursoArt
        }
    })

    articulosCarrito = [...cursos];
  }else{
    articulosCarrito=[...articulosCarrito, curso]
  }
  
    
    
    
   


    llenarHtml()
    
}

function llenarHtml(){
    limpiarHTML()
    articulosCarrito.forEach(curso=>{
        const{imagen,nombre,autor,precio,cantidad,id} = curso;

        const row = document.createElement("tr");
        row.innerHTML=`

        <td><img src="${imagen}" width=100></td>
        <td>${nombre}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}"> X</a>
        </td>
        
        `

        contenedorCarrito.appendChild(row)



    })

}

function limpiarHTML(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}
function cancelarPedido (e){
 
  
    if(e.target.classList.contains("borrar-curso")){
      console.log("Eliminando carrito")
      idCursoRepe=e.target.getAttribute("data-id");
      articulosCarrito=articulosCarrito.filter(curso =>curso.id!= idCursoRepe)
      console.log(articulosCarrito);
  
      llenarHtml();
    }
  }

