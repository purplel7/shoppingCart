//Variables

//
const listaCursos = document.querySelector("#lista-cursos");

const listaCarrito = document.querySelector("#lista-carrito tbody");

const carrito = document.querySelector("#carrito");


let articulosCarrito = [];




//EvenListener
evenlistener();
function evenlistener(){
    listaCursos.addEventListener("click",agregarCurso);
    listaCarrito.addEventListener("click",eliminarCurso);
    carrito.addEventListener("click",vaciarCarrito);
    


}










//Funciones

function agregarCurso(e){
    

    if(e.target.classList.contains("agregar-carrito")){

        console.log("tiene la clase carrito")
        //Obtendo el html con la informacio que necesito
        const datosArticulo = e.target.parentElement.parentElement;
        //console.log(datosArticulo)

        leerDatosCurso(datosArticulo);

    }
    //console.log(e.target.classList);
    
}

function leerDatosCurso(articulo){
    console.log(articulo);

    //Creamos un objetocon el contenido del curso actual
    let infoCurso ={
        img:articulo.querySelector("img").src,
        nombre:articulo.querySelector(".info-card h4").textContent,
        precio:parseInt(articulo.querySelector("#span").textContent),
        id:articulo.querySelector("a").getAttribute("data-id"),
        cantidad:1
        
    }

    //Revisa si un elemento ya exite el el carrito
    // . some permite iterar sobre un arreglo de obejtos y verificar
    // si existe
    const existe =articulosCarrito.some(articulo=>articulo.id===infoCurso.id)//Devuelve true o false
    if(existe){
        //Actualizamos la cantidad
        const cursos = articulosCarrito.map(articulo=>{

            if(articulo.id===infoCurso.id){
                articulo.cantidad++;
                articulo.precio=articulo.precio + articulo.precio;
                return articulo;
            }else{
                return articulo;
            }

        })
        articulosCarrito = [...cursos];

    }else{
        // Areggamos el objeto con valores al array articulosCarrito
         articulosCarrito =[...articulosCarrito,infoCurso];
    }


    

    console.log(articulosCarrito);

    carritoHTML();

}

function carritoHTML(){
    

    //limpiamos el HTML antes de volver a crearlos
    limpiarHTML();

    //Recorre el carrito y genera el HTML

    articulosCarrito.forEach(articulo=>{

        const row = document.createElement("tr");
        row.innerHTML=`
        <td><img src="${articulo.img}" width="100"> </td>
        <td>${articulo.nombre} </td>
        <td>${articulo.precio} </td>
        <td>${articulo.cantidad} </td>
        <button class="borrar" data-id="${articulo.id}" >eliminar </button>
                    
        `

        listaCarrito.appendChild(row);

    })
    

}

function limpiarHTML(){
    while(listaCarrito.firstChild){
        listaCarrito.removeChild(listaCarrito.firstChild)

    }
}

function eliminarCurso(e){
    //console.log(e.target.classList)
    if(e.target.classList.contains("borrar")){
        const cursoId = e.target.getAttribute("data-id")

        articulosCarrito= articulosCarrito.filter((curso)=>curso.id!==cursoId);

        carritoHTML();

    }
}

function vaciarCarrito(e){
    if(e.target.classList.contains("button")){
        articulosCarrito=[];
        limpiarHTML();
    }
    
}



