function autoInicioCategoria(){
    console.log("En Ejecución")
    $.ajax({
        url:"http://129.151.111.246:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-category");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id);
            }); 
        }
    
    })
}

function traerInformacionRoom() {
    $.ajax({
        url:"http://129.151.111.246:8080/api/Room/all",
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            console.log(response);
            pintarRespuestaHabitaciones(response);
        }

    });

}

function pintarRespuestaHabitaciones(response){

    let myTable="<table>";
    myTable+="<tr>";
        myTable+="<td>Nombre</td>";
        myTable+="<td>Hotel</td>";
        myTable+="<td>Estrellas</td>";
        myTable+="<td>Descripcion</td>";
        myTable+="<td>Categoria</td>";
    "</tr>";

    for(i=0;i<response.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+response[i].name+"</td>";
        myTable+="<td>"+response[i].hotel+"</td>";
        myTable+="<td>"+response[i].stars+"</td>";
        myTable+="<td>"+response[i].description+"</td>";
        myTable+="<td>"+response[i].category.name+"</td>";
        myTable+='<td><button class = "botonRoom2" onclick="borrarRoom(' + response[i].id + ')">Borrar</button></td>';
        myTable+='<td><button class = "botonRoom2" onclick="cargarDatosRoom(' + response[i].id + ')">Editar</button></td>';
        myTable+='<td><button class = "botonRoom2" onclick="actualizarRoom(' + response[i].id + ')">Actualizar</button></td>';
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#ListaRoom").html(myTable);
}


function cargarDatosRoom(id) {
    $.ajax({
        dataType: 'json',
        url:"http://129.151.111.246:8080/api/Room/"+id,
        type: 'GET',

        success: function (response) {
            console.log(response);
            var item = response;

            $("#id").val(item.id);
            $("#name2").val(item.name);
            $("#hotel").val(item.hotel);
            $("#stars").val(item.stars);
            $("#description2").val(item.description);

        },

        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}


function agregarRoom() {

    if($("#name2").val().length == 0 || $("#hotel").val().length == 0 || $("#stars").val().length == 0 || $("#description2").val().length == 0){
       alert("Los campos son obligatorios")
    }else{

            let elemento = {
                name: $("#name2").val(),
                hotel: $("#hotel").val(),
                stars: $("#stars").val(),
                description: $("#description2").val(),
                category:{id: +$("#select-category").val()},
            }

            let dataToSend = JSON.stringify(elemento);
            console.log(elemento);

            $.ajax({
                type: "POST",
                contentType: "application/json",
                url:"http://129.151.111.246:8080/api/Room/save",
                data: dataToSend,
                datatype: "JSON",

                success: function (response) {
                    console.log(response);
                    console.log("Habitación guardada correctamente");
                    //Limpiar Campos
                    $("#resultado2").empty();
                    $("#name2").val("");
                    $("#hotel").val("");
                    $("#stars").val("");
                    $("#description2").val("");                    

                    //Listar Tabla

                    alert("Habitación guardada correctamente")
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert("Habitación NO guardada correctamente")
                }
            });
    }
}


function actualizarRoom(idElemento){

    if($("#name2").val().length == 0 || $("#hotel").val().length == 0 || $("#stars").val().length == 0 || $("#description2").val().length == 0){
        alert("Los campos son obligatorios")
    }else{

    let elemento = {
        id:idElemento,
        name:$("#name2").val(),
        hotel:$("#hotel").val(),
        stars:$("#stars").val(),
        description:$("#description2").val(),
        category: {id:+$("#select-category").val()},

    }
    console.log(elemento);
    let dataToSend=JSON.stringify(elemento);
    $.ajax({
        datatype:"JSON",
        data:dataToSend,
        contentType:"application/JSON",
        url:"http://129.151.111.246:8080/api/Room/update",
        type:"PUT",
               
        success:function(response){
            console.log(response);
            $("#listaRoom").empty();
            
            alert("Habitación actualizada correctamente")
            $("#resultado2").empty();
            $("#id").val("");
            $("#name2").val("");
            $("#hotel").val("");
            $("#stars").val("");
            $("#description2").val("");
            traerInformacionRoom();
            
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Habitación NO actualizada correctamente")
        }
    });

}
}

function borrarRoom(idElemento){
    var elemento = {
        id:idElemento
    }
    var dataToSend = JSON.stringify(elemento);
console.log(dataToSend);
    $.ajax(
        {
        dataType: "JSON",
        data:dataToSend,
        url:"http://129.151.111.246:8080/api/Room/"+idElemento,
        type: "DELETE",       
        contentType:"application/JSON",
        success:function(response){
            console.log(response);
            $("#ListaRoom").empty();
            traerInformacionRoom();
            alert("Habitación eliminada")
        },
        
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Habitación NO eliminada")
        }
    });

}