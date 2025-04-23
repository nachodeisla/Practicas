var mongoose = require("mongoose");
var cadenaConexion="mongodb://localhost/Personas";
var Schema = mongoose.Schema;
mongoose.conect(cadenaConexion,{useNewUrlParse:true,useUnifiedTopology:true},(err,res)=>{
    if(err){
        console.log("error");
    }else{
        console.log("conectado correctamente"); 
    }
})

var objetoProducto=new schema({
    _id: Schema.Types.String,
    nombre: Schema.Types.String,
    fecha: Schema.Types.Date,
    fechaCaducidad: Schema.Types.String
})


var Productos = mongoose.model("Productos",objetoProducto);

class productoController{

    getAll(request,response){
        Productos.aggregate([
            {
                $project:{
                    _id:1,
                    nombre:"nacho",
                    fechaCaducidad:{$dateToString:{format:"%d-%m-%Y", date:"$fecha"}}
                }
            }
        ]).then(res=>{
            response.json(res);
        })
    }

    getFindId(request,response){
        var id = request.params.id;
        Productos.aggregate([{$match:{_id:id}},{
            $project:{
                _id:1,
                nombre:1,
                fechaCaducidad:{$dateToString:{format:"%Y-%m-%d", date:"$fecha"}}
            }
        }]).then(res=>{
            response.json(res)
        }).catch(err=>{
            response.end(err)
        })
    }

    eliminarId(request,response){
        var id = request.params.id;
        Productos.deleteOne({_id:id}).then(res=>{
            response.json({estado:"ok"});
        }).catch(err=>{
            response.json({estado:"error"});

        })
    }

    updateProducto(request,response){
       var id = request.body._id;           // npm install -S body-parser
       var nombre = request.body.nombre;
       var fecha = request.body.fecha;

       Productos.updateOne({_id:id},{

        $set:{
            nombre:nombre,
            fecha:fecha
        }
       }).then(res=>{
        response.json({estado:"OK"})
       }).catch(err=>{
        response.json({estado:"error"})
       })
    }


    insertProducto(request,response){
        var id = mongoose.Types.ObjectId();           // npm install -S body-parser
        var nombre = request.body.nombre;
        var fecha = request.body.fecha;

        var nuevoProducto=new Productos({
            _id:id,
            nombre:nombre,
            fechaCaducidad:fecha
        });
        
        nuevoProducto.save(function(err,res){
            if (err) {
                console.log("error");
            }else{
                console.log("OK");
                response.json({estado:"OK"})

            }
        })

     }

}

module.exports = new productoController;