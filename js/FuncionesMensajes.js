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
function autoInicioRelacionRoom(){

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


function autoInicioMensaje(){
    console.log("En ejecución")
    $.ajax({
        url:"http://129.151.111.246:8080/api/Message/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaMensajes(respuesta); 
        }
    })
}

function pintarRespuestaMensajes(respuesta){

    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].messageText+"</td>";
        myTable+="<td>"+respuesta[i].room.name+"</td>";
        myTable+="<td>"+respuesta[i].client.name+"</td>";
        myTable+="<td> <button onclick=' actualizarInformacionMensajes("+respuesta[i].idMessage+")'>Actualizar</button>";
        myTable+="<td> <button onclick='borrarMensaje("+respuesta[i].idMessage+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado4").html(myTable);
}

function guardarInformacionMensajes(){
    if ($("#messageText").val().length==0 ){

        alert("Los campos son obligatorios");
    }else{
        
    let var5 = {
        messageText:$("#messageText").val(),
        room: {id: +$("#select-room").val()},
        client: {idClient:+$("#select-client").val()},
        };
      
        console.log(var5);
        $.ajax({
        type:"POST",
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
        data: JSON.stringify(var5),
        
        url:"http://129.151.111.246:8080/api/Message/save",
       
        
        success:function(response) {
                console.log(response);
            console.log("Mensaje guardado correctamente");
            alert("Mensaje guardado correctamente");
            window.location.reload()
    
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
              window.location.reload()
            alert("Mensaje NO guardado correctamente");
    
    
        }
        });

}
}

function actualizarInformacionMensajes(idElemento){
    if ($("#messageText").val().length==0 ){

        alert("Los campos son obligatorios");
    }else{

    let myData={
        idMessage:idElemento,
        messageText:$("#messageText").val(),
        room:{id: +$("#select-client").val()},
        client:{idClient: +$("#select-room").val()},

    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.111.246:8080/api/Message/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado4").empty();
            $("#messageText").val("");
            autoInicioMensaje();
            alert("Mensaje actualizado correctamente")
        }
    });

}}

function borrarMensaje(idElemento){
    let myData={
        idMessage:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    console.log(dataToSend);
    $.ajax({
        url:"http://129.151.111.246:8080/api/Message/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado4").empty();
            autoInicioMensaje();
            alert("Mensaje Eliminado")
        }
    });

}
