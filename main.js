// JUAN LUIS SILVA RIOS
//DESAFIO AJAX ---------------------------------------------------------------------------------------------------------------------------------------------------


//APLICACIÓN DE AJAX- UTILIZANDO UN API DE PERSONAS---------------------------------------------------------------------------------------------------------------


function clientesFrecuentes() {
    const URLGET = "https://reqres.in/api/users?page=2";
    $.get(URLGET).done(function(respuesta, estado) {
        console.log("La Api de Clientes Frecuentes es: " + estado);

        if (estado == "success") {
            let arrayLibros = respuesta.data;
            arrayLibros.forEach(empleado => {
                $("#equipo").append("<tr><td>" + empleado.first_name + "<tr><td>" + empleado.email + "</td><td><img src=" + empleado.avatar + "></td></tr>");
            });
        }
    });
}
clientesFrecuentes();




// MI JSON LOCAL DE MI EQUIPO DE TRABAJO-------------------------------------------------------------------------------------------------------------------------


const miJSON = "colaboradores.json";
$("#empleados").prepend('<button id="miBoton">CONOCE AL EQUIPO DE TRABAJO.</button>');
$("#miBoton").click(() => {
    $.getJSON(miJSON, function(respuesta, estado) {
        if (estado == "success") {
            let misEmpleados = respuesta.usuarios;
            for (const empleado of misEmpleados) {
                $("#empleados").prepend(`<div>
                <h3>${empleado.nombre}</h3>
                <p>${empleado.puesto}</p>
                </div>`);
            }
        }
    });
});



//APLICACIÓN DE ANIMACIÓN CON IMÁGEN DE SALUDO-----------------------------------------------------------------------------------------------------------------

$("#juancito27").hide();

$("#muestraOculta").click(function() {
    $("#juancito27").fadeToggle(1000, function() {
        if ($("#muestraOculta").html() == "Ocultar Imagen") {
            $("#muestraOculta").html("Mostrar Imagen");
        } else {
            $("#muestraOculta").html("Ocultar Imagen");
        }
    });
})


//ARRAY DE MIS SILICONAS CON JQUERY----------------------------------------------------------------------------------------------------------------------------
let carrito = [];

mostrarSiliconas();

$("#miSeleccion").on('change', function() {
    ordenar();
});
$("#miSeleccion option[value='pordefecto']").attr("selected", true);



//FUNCIÓN PARA MOSTRAR MIS PRODUCTOS---------------------------------------------------------------------------------------------------------------------------

function mostrarSiliconas() {
    for (const producto of productos) {
        $(".siliconasTop10").append(`<li class="col-sm-2 md-6 mx-3 my-4 list-group-item">
        <h3 style="display: none"> ID: ${producto.id} </h3>
        <img src=${producto.foto} class="col-sm-9 md-9 mx-4 my-4 width="200" height="200">
        <p> Producto: ${producto.nombre}</p>
        <p><strong> $ ${producto.precio} </strong></p>
        <button class='btn btn-danger' id='btn${producto.id}'>Comprar</button>
        </li>`);


        $(`#btn${producto.id}`).on('click', function() {
            agregarAlCarrito(producto);
        });
    }
}

//FUNCIÓN DE AGREGAR AL CARRITO USANDO LA LIBRERÍA DE JQUERY--------------------------------------------------------------------------------------------------

function agregarAlCarrito(productoNuevo) {
    carrito.push(productoNuevo);
    console.log(carrito);
    Swal.fire(
        'Nuevo producto agregado al carro',
        productoNuevo.nombre,
        'success'
    );
    $("#listaDeProductos").append(`
    <tr>
        <td>${productoNuevo.id}</td>
        <td>${productoNuevo.nombre}</td>
        <td>${productoNuevo.precio}</td>
    </tr>`);
}

//FUNCIÓN PARA ORDENAR MIS SILICONAS POR CATEGORÍAS----------------------------------------------------------------------------------------------------------

function ordenar() {
    let seleccion = $("#miSeleccion").val();

    if (seleccion == "menor") {

        productos.sort(function(a, b) { return a.precio - b.precio });
    } else if (seleccion == "mayor") {

        productos.sort(function(a, b) { return b.precio - a.precio });
    } else if (seleccion == "alfabetico") {

        productos.sort(function(a, b) {
            return a.nombre.localeCompare(b.nombre);
        });
    }
    $("li").remove();
    mostrarSiliconas();
}


//BOTÓN PARA FINALIZAR LA COMPRA DE MI CARRITO, USANDO LA LIBRERÍA DE JQUERY--------------------------------------------------------------------------------

$("#boton").prepend("<button class='btn btn-danger' onclick='finalizar();'>FINALIZAR COMPRA.</button>");

const finalizar = () => {
    Swal.fire(
        'DIOS JESÚS Te Bendiga =) Gracias por tu compra!',
    )
}


//APLIACIÓN DE ANIMACIÓN CONCATENADA EN INFORMACIÓN DE SILICONAS--------------------------------------------------------------------------------------------


$("#muestraParrafo").click(function() {
    $("#parrafo").fadeIn("slow");
});

$("#ocultaParrafo").click(function() {
    $("#parrafo").fadeOut("fast", function() {});
});