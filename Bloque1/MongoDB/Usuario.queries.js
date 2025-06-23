db.Usuario.find({ nombre: "Nombre1" });
db.Usuario.aggregate({$project:({_id:0,nombre:1,numeroPolizas:{$size:"$polizas"}})},{$sort:{numeroPolizas:-1}});

