function autoInicioRelacionCliente(){
    
    $.ajax({
        url:"http://129.151.111.246:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
          
            let $select = $("#select-client");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.idClient+'>'+name.name+'</option>');
            
            }); 
        }
    
    })
}
function autoInicioRoom(){

    $.ajax({
        url:"http://129.151.111.246:8080/api/Room/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
        
            let $select = $("#select-room");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
         
            }); 
        }
    
    })
}

//
function listarReservas(){
    $.ajax({
        url:"http://129.151.111.246:8080/api/Reservation/all",
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            console.log(response);
            pintarRespuestaReservas(response);
        }
    });
}

function pintarRespuestaReservas(response){

    let myTable="<table>";
    myTable+="<tr>";
    myTable+="<td>Fecha Inicio</td>";
    myTable+="<td>Fecha Devolucion</td>";
    myTable+="<td>Estado</td>";
    myTable+="<td>Habitacion</td>";
    myTable+="<td>Cliente</td>";
    "</tr>";

    for(i=0;i<response.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+response[i].startDate+"</td>";
        myTable+="<td>"+response[i].devolutionDate+"</td>";
        myTable+="<td>"+response[i].status+"</td>";
        myTable+="<td>"+response[i].room.name+"</td>";
        myTable+="<td>"+response[i].client.name+"</td>";
        myTable+='<td><button  onclick="borrarReservation(' + response[i].idReservation + ')">Borrar Reserva!</button></td>';
        myTable+='<td><button  onclick="cargarDatosReservation(' + response[i].idReservation + ')">Editar Reserva!</button></td>';
        myTable+='<td><button  onclick="actualizarReservation(' + response[i].idReservation + ')">Actualizar Reserva!</button></td>';
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#ListaReservation").html(myTable);
}

function agregarInformacionReservas(){
    if($("#startDate").val().length == 0 || $("#devolutionDate").val().length == 0 || $("#status").val().length == 0){
        alert("Los campos son Obligatorios")
    }else{ 
        let elemento = {
            startDate: $("#startDate").val(),
            devolutionDate: $("#devolutionDate").val(),
            status: $("#status").val(),
            room:{id: +$("#select-room").val()},
            client:{idClient: +$("#select-client").val()},
            
        }

        let dataToSend = JSON.stringify(elemento);

        $.ajax({
        type:"POST",
        contentType: "application/json; charset=utf-8",
        data: dataToSend,
        dataType: "JSON",
        
        url:"http://129.151.111.246:8080/api/Reservation/save",
               
        success:function(response) {
                console.log(response);
            console.log("Reserva agregada correctamente");
            $("#resultado5").empty();
            $("#startDate").val("");
            $("#devolutionDate").val("");
            $("#status").val("");
            alert("Reserva agregada correctamente");
            window.location.reload()
    
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
              window.location.reload()
            alert("Reserva NO agregada correctamente");
    
    
        }
        });

}}

//
function cargarDatosReservation(id) {
    $.ajax({
        dataType: "JSON",
        url:"http://129.151.111.246:8080/api/Reservation/"+id,
        type: "GET",

        success: function (response) {
            console.log(response);
            var item = response;

            $("#startDate").val(item.startDate);
            $("#devolutionDate").val(item.devolutionDate);
            $("#status").val(item.status);

        },

        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}
function actualizarInformacionReservas(idElemento){
    if($("#startDate").val().length == 0 || $("#devolutionDate").val().length == 0 || $("#status").val().length == 0){
        alert("Los campos deben estar llenos")
    }else{

    let elemento = {
        idReservation:idElemento,
        startDate:$("#startDate").val(),
        devolutionDate:$("#devolutionDate").val(),
        status:$("#status").val(),
        room:{id: +$("#select-room").val()},
        client:{idClient: +$("#select-client").val()},

    }
    let dataToSend=JSON.stringify(elemento);
    $.ajax({
        url:"http://129.151.111.246:8080/api/Reservation/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(response){
            console.log(response);
            $("#ListaReservation").empty();
            alert("Reserva actualizada correctamente")
            $("#resultado5").empty();
            $("#startDate").val("");
            $("#devolutionDate").val("");
            $("#status").val("");
            listarReservas();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Reserva NO actualizada correctamente")
        }
    });
}
}

function borrarMensaje(idElemento){
    let elemento={
        id:idElemento
    }
    let dataToSend=JSON.stringify(elemento);
    $.ajax({
        url:"http://129.151.111.246:8080/api/Message/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(response){
            console.log(response);
            $("#ListaReservation").empty();
            alert("Reserva Eliminada")
            listarReservas();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Reserva NO eliminada")
        }
    });

}