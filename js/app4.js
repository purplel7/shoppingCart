//Variable

const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const listaCursos = document.querySelector("#lista-cursos");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");



let articuloCarrito = [];

//EventListener
cargarEventListener();

function cargarEventListener(){
    listaCursos.addEventListener("click",agregarCurso);
    carrito.addEventListener("click",eliminarCurso);
    vaciarCarritoBtn.addEventListener("click",()=>{
        articuloCarrito = [];
        limpiarHTML();
    })


}










//Funciones
function agregarCurso(e){

    //console.log(e.target)
    if(e.target.classList.contains("agregar-carrito")){

        //console.log("agregando al carrito")
        
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
        
    }


}


function eliminarCurso(e){
    if(e.target.classList.contains("borrar-curso")){
        const cursoId = e.target.getAttribute("data-id");
        

        //Eliminamos del arreglo de articulosCarrito por el data-id
        articuloCarrito = articuloCarrito.filter(curso=>curso.id !== cursoId);
        
        carritoHTML();
    }
}


function leerDatosCurso(cursoSeleccionado){
    const infoCurso={
        imagen: cursoSeleccionado.querySelector("img").src,
        nombre: cursoSeleccionado.querySelector("h4").textContent,
        precio: parseInt(cursoSeleccionado.querySelector(".precio span").textContent),
        id: cursoSeleccionado.querySelector("a").getAttribute("data-id"),
        cantidad:1

    }

    //Verificamos si existe o no
    const existe = articuloCarrito.some(curso =>curso.id === infoCurso.id )

    if(existe){
        cursos = articuloCarrito.map(curso=>{
            if(curso.id === infoCurso.id ){

                curso.cantidad++;
                curso.precio=curso.precio+curso.precio;
                return curso;
            }else{
                return curso;
            }

        })

        articulosCarrito =[...cursos];


    }else{
        
        articuloCarrito=[...articuloCarrito,infoCurso];
    }

    

    carritoHTML()
}

function carritoHTML(){

    limpiarHTML();



     
     //Recorre el carritop y genera el HTML
     articuloCarrito.forEach(curso=>{

        const {imagen,nombre,precio,cantidad,id} = curso

        const row = document.createElement("tr");
        row.innerHTML = `
            <td> <img src="${imagen}" width=100></td>
            <td>${nombre}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}"> X</a>
            </td>
        
        `

        contenedorCarrito.appendChild(row);
     })


}

function limpiarHTML(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}