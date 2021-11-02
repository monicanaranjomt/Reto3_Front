function autoInicioCliente(){
    console.log("En ejecución")
    $.ajax({
        url:"http://129.151.111.246:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaClientes(respuesta);
    
        }
    });
}

function pintarRespuestaClientes(respuesta){

    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].email+"</td>";
        myTable+="<td>"+respuesta[i].password+"</td>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].age+"</td>";
        myTable+="<td> <button onclick=' actualizarInformacionClientes("+respuesta[i].idClient+")'>Actualizar</button>";
        myTable+="<td> <button onclick='borrarCliente("+respuesta[i].idClient+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado3").html(myTable);
}

function guardarInformacionClientes(){
    if($("#CLemail").val().length == 0 || $("#CLpassword").val().length == 0 || $("#CLname").val().length == 0 || $("#CLage").val().length == 0){
        alert("Los campos son Obligatorios")
    }else{ 
    let var4 = {
        email:$("#CLemail").val(),
        password:$("#CLpassword").val(),
        name:$("#CLname").val(),
        age:$("#CLage").val(),
      
        };

        console.log(var4);
        $.ajax({
        type:"POST",
        contentType: "application/json; charset=utf-8",
        dataType: "JSON",
        data: JSON.stringify(var4),
        
        url:"http://129.151.111.246:8080/api/Client/save",
       
        
        success:function(response) {
                console.log(response);
            console.log("Cliente guardado correctamente");
            alert("Cliente guardado correctamente");
            window.location.reload()
    
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
              window.location.reload()
            alert("Cliente NO guardado correctamente");
    
    
        }
        });
    }
}

function actualizarInformacionClientes(idElemento){
    if($("#CLemail").val().length == 0 || $("#CLpassword").val().length == 0 || $("#CLname").val().length == 0 || $("#CLage").val().length == 0){
        alert("Los campos son Obligatorios")
    }else{ 
    let myData={
        idClient:idElemento,
        email:$("#CLemail").val(),
        password:$("#CLpassword").val(),
        name:$("#CLname").val(),
        age:$("#CLage").val(),
      
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.111.246:8080/api/Client/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado3").empty();
            $("#idClient").val("");
            $("#CLemail").val("");
            $("#CLpassword").val("");
            $("#CLname").val("");
            $("#CLage").val("");
            autoInicioCliente();
            alert("Cliente actualizado correctamente")
        }
    });
    }
}

function borrarCliente(idElemento){
    let myData={
        idClient:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://129.151.111.246:8080/api/Client/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado3").empty();
            autoInicioCliente();
            alert("Cliente Eliminado")
        }
    });

}
