const { stringify } = require("querystring");

window.onload=function(){
listar();

    
}


function listar(){
    fetch("listarProductos").then(res=>{
        res.json().then(json=>{
            listaProductos(json);
        })
    })
}

function listarProductos(res){
    var contenido=`
        <table class='table'>
        <thead>
            <tr>
                <th>id</th>
                <th>nombre</th>
                <th>fecha</th>
                <th>operaciones</th>
            </tr>
        </thead>
    `;

    contenido+=`<tbody>`;

        for(var i=0; res.length; i++){
            data = res[i];
            contenido+=`
            <tr>
                <th>${data._id}</th>
                <th>${data.nombre}</th>
                <th>${data.fechaCaducidad}</th>
                <th>
                <button onclick='verFormulario(${data._id})' class='btn btn-primary'>editar</button>
                <button onclick='eliminar(${data._id})' class='btn btn-danger'>eliminar</button>
                </th>
            </tr>
            `;
        }

    contenido+=`</tbody></table>`;
    document.getElementById("divProducto").innerHTML=contenido;
}


function verFomulario(id){
    document.getElementById("error").style.display="none";
    limpiarFomulario()
    if (id!=null) {
        recuperarInformacion(id);
        
    document.getElementById("divFormulario").style.display="block";
        
    }else{
    document.getElementById("divFormulario").style.display="block";
    }
}

function recuperarInformacion(id){
    fetch("/recuperarProducto"+id).then(res=>{
        res.json().then(json=>{
            var data=json[0];
            document.getElementById("textId").value=data._id;
            document.getElementById("textNombre").value=data.nombre;
            document.getElementById("textFecha").value=data.fechaCaducidad;
        })
    }).catch(err=>{
        alert("error")
    })
}

function ocultarFomulario(){
    document.getElementById("divFormulario").style.display="none";
}

function limpiarFomulario(){
    document.getElementById("textId").value="";
    document.getElementById("textNombre").value="";
    document.getElementById("textFecha").value="";
}

function eliminar(id){
if (confirm("estas seguro?")==1) {
    fetch("/eliminarProducto/"+id,{
        method:"PUT"
    }).then(res=>{
        res.json().then(rspa=>{
            if (rspa.estado=="OK") {
                alert("eliminado");
                listar();
            }else{
                alert("error");
            }
        })
    }).catch(err=>{
        alert("error")
    })
}
}

function enviarDatos(){
    var ruta="";
    var id =  document.getElementById("textId").value;
    var nombre =  document.getElementById("textNombre").value=data.nombre;
    var fecha =  document.getElementById("textFecha").value=data.fechaCaducidad;

    // validar informacion
    var contenido = `<ul>`;
    var exito = true;
    if (nombre=="") {
        contenido += `<li>debe completar el nombre</li>`;
        exito = false;
    }
    if (fecha=="") {
        contenido += `<li>debe completar la fecha</li>`;
        exito = false;
    }
    contenido += `</ul>`;

    if (exito == false) {
        document.getElementById("error").style.display="block";
        document.getElementById("error").innerHTML=contenido;
        return
    }



    if (id=="") {
        ruta="/insertarProductos";
    }else{
        ruta="/actualizarProductos";
    }

    fetch(ruta,{
        method:"POST",
        headers:{
            'Content-Type':"application/json"
        },
        body:JSON.stringify({
            "_id":id,
            "nombre":nombre,
            "fecha":fecha
        })
    }).then(res=>{
        res.json().then(obj=>{
            if (obj.estado=="OK") {
                alert("actualizado");
                ocultarFomulario();
                listar();
            }else{
                alert("error");

            }
        })
       
    }).catch(err=>{
        alert("error");

    })




}