const carrito =document.querySelector("#carrito");

//aqui se va a inyectar los articulos
const contenedorCarrito = document.querySelector("#lista-carrito tbody");

// esto es el bloque donde se encuentra todo los cursos
const listaCursos = document.querySelector("#lista-cursos");

// El boton para limpiar carrito d compras 
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");

let articulosCarrito =[];
console.log(contenedorCarrito);


// una funcion para registrar todos los evenlistener
cargarEventListener();
function cargarEventListener(){
    // Cuando agregas un curso presionando "Agregar carrito"
    listaCursos.addEventListener("click",agregarCurso);

    // Elimina cursos del carrito
    carrito.addEventListener("click",eliminarCurso)

    // Vacia el carrito por completo
    vaciarCarritoBtn.addEventListener("click",()=>{
        articulosCarrito =[];
        limpiarHTML();
    })


}

// Funciones
function agregarCurso(e){
    if(e.target.classList.contains("agregar-carrito")){
        const cursoSleccionado =e.target.parentElement.parentElement;
        leerDatosCurso(cursoSleccionado);
    }
    
}

function eliminarCurso(e){
    console.log(e.target.classList)
    if(e.target.classList.contains("borrar-curso")){
        const cursoId = e.target.getAttribute("data-id")

        //Eliminar del arreglo de articulosCarrito por el data-id
        articulosCarrito =articulosCarrito.filter(curso=> curso.id !==cursoId);
        console.log(articulosCarrito);
        
        carritoHTML(); //Itera sobre el carrito y muestra el HTML

    }

}




// Lee el contenido el HTML al que le dimos click y 
// extraes la inormacion del curso

function leerDatosCurso(cursoSleccionado){
    //console.log(cursoSleccionado);

    //Creamos un objetocon el contenido del curso actual
    const infoCurso={
        imagen: cursoSleccionado.querySelector("img").src,
        nombre: cursoSleccionado.querySelector("h4").textContent,
        precio: cursoSleccionado.querySelector(".precio span").textContent,
        id: cursoSleccionado.querySelector("a").getAttribute("data-id"),
        cantidad:1

    }

    //Revisa si un elemento ya exite el el carrito
    // . some permite iterar sobre un arreglo de obejtos y verificar
    // si existe

    const existe = articulosCarrito.some(curso=>curso.id === infoCurso.id);
    if(existe){
        //Actulizamos la cantidad
        const cursos = articulosCarrito.map((curso)=>{
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                
                return curso //retorna el objeto actulizado 
                
            }else{
                //console.log("hola")
                return curso;   // retorna los objetos ue no son duplicados
                
            }

        })
        articulosCarrito =[...cursos];
        


    }else{
        // Argega elementos al arreglo del carrito
        articulosCarrito =[...articulosCarrito,infoCurso];
        //console.log(articulosCarrito);

    }

    //console.log(infoCurso);

    

    carritoHTML();
}


//Muestra el carrito del compras (articuloCarrito)en el HTML
function carritoHTML(){

    // limpiar el html
    limpiarHTML();

    //Recorre el carritop y genera el HTML
    articulosCarrito.forEach(curso=>{
        const{imagen,nombre,precio,cantidad,id}=curso;

        const row = document.createElement("tr");
        row.innerHTML =`
            <td><img src="${imagen}" width=100></td>
            <td>${nombre}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}"> X</a>
            </td>
            

        `;

        //Agrega el HTML del carrito al tbody
        contenedorCarrito.appendChild(row);


    })

}

function limpiarHTML(){
    //contenedorCarrito.innerHTML=""; //Forma lenta
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }

}