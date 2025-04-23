var express = require("express");
var app= express();
// modulo path
var path= require("path");

var bodyParse=require("body-parser");
// le decimos al servidor que existe boostrap
app.use("/css",express.static("./node_modules/boostrap/dist/css"));
app.use("/files",express.static(path.join(__dirname,"files")));
app.use(bodyParse.json());

// recibimos el archivo conexion.js
var cn = require("./mongo/conexion.js")

// indicamos la pagina que saldra al inicar
app.get("/",(request,response)=>{
    response.sendFile(path.join(__dirname,"pages/persona.html"))
})

app.get("/listarProductos",(request,response)=>{
    // response.end("hola, esto es una salida");
    // response.json({nombre:"nacho"});
    cn.getAll(request,response);
})

app.get("/recuperarProductos/:id",(request,response)=>{
  cn.getFindId(request,response);
})

app.put("/eliminarProductos/:id",(request,response)=>{
    cn.eliminarId(request,response);
  })
  

app.post("/insertarProductos",(request,response)=>{
    cn.insertProducto(request,response);
})


app.post("/actualizarProductos",(request,response)=>{
    cn.updateProducto(request,response)
})

// indicamos el puerto
app.listen("9000",()=>{
    console.log("el servidor esta inciado");
})



// nodemon express.js