function comandosBasicos() {

        // BASICOS

    show dbs // muestra las BBDD
    use personas //cambiar a la base de datos , si no existe la estaremos creamos (no terminara de crearse hasta que le creemos una coleccion (nos mete dentro de personas para que podamos crearle coleccion))
    db.createCollection("persona") // creamos la coleccion 

    db // mostrar base de datos actual
    db.dropDatabase() //borramos todas las bases de datos 
    db.usuarios.drop(); // eliminar una coleccion completa
    db.usuarios.exists() || db.getCollectionNames().includes("usuarios") // comprobar que exista
   
    show coleccions // mostrar colecciones

    db.usuarios.remove({nombre:"nacho"}) // eliminar lo buscado
    db.usuarios.remove() // error
    db.usuarios.remove({}) //b eliminar todos los objetos
    db.usuarios.remove({ nombre:/a/ }, true) // eliminar primer objeto que cumpla la condicion

    db.usuarios.getIndexes(); // ver indexes
    db.usuarios.createIndex({ nombre:1 }); // crear index
    db.usuarios.createIndex({ nombre:"text" }); // crear index
        //llamada a la linea anterior
        db.usuarios.find({$text:{$search:"isla"}}); // ,$caseSensitive:false puede o no añadirse

    db.usuarios.createIndex({ nombre:1 },{ unique:true, name:"indiceNombres" }); // el campo tiene que ser unico
    db.usuarios.createIndex({ nombre:1 },{ background:true }); // crea indice en segundo plano
    db.usuarios.createIndex({ nombre:1 },{ background:true, name:"indiceNombre" }); // crea indice en segundo plano
    db.usuarios.createIndex({ nombre:1, apellido:1 },{ unique:true, name:"indiceNombreApellido" }); // crea indice compuesto (para mas de un campo)
        // para usar el index necesitamos hacer las busqieda especifica. por ejemplo:
        db.usuarios.find({nombre:"nacho"}) // no usa el indide
        db.usuarios.find({apellido:"isla"}) // no usa el indice
        db.usuarios.find({nombre:"nacho", apellido:"isla"}) // si usa el indice
    db.usuarios.createIndex({ nombre:1 },{ space:true, name:"indiceNombre" }); // el indice ignora los documentos que no tienen el vcampo indexado ( nomnbre en este caso )
    db.usuarios.createIndex({edad:1},{partialFilterExpression:{edad:{$gt:18}}}) // un indice con condicion
    db.usuarios.createIndex({nombre:1},{collation:{locate:"en",strength:2}}) // le damos una condicion para que ignore las mayusculas y minisculas
        //llamada a la linea anterior
        db.usuarios.find({nombre:"nacho"}).collation({locale:"en",strength:2})



    

    db.usuarios.dropIndex({ nombre:1 }); // borrar index



        // INSERTAR

    insertOne() // Inserta un solo documento
    db.usuarios.insertOne({ nombre: "Nacho", edad: 30, ciudad: "Madrid" });

    insertMany() // Inserta múltiples documentos
    db.usuarios.insertMany([
        { nombre: "Nacho", edad: 30, ciudad: "Madrid" },
        { nombre: "Nacho", edad: 25, ciudad: "Sevilla" }
    ]);

        // BUSQUEDA

    find() // Encuentra documentos (todos o con filtros)
    db.usuarios.find({ nombre: "Nacho" });

    hint() // Encuentra lo que tenag el parametro como indice
    db.usuarios.find().hint({ nombre:1 });
    db.usuarios.find().hint({ natural:true }); // ignora el indice
    db.usuarios.find({nombre:"amy"})

    findOne() // Encuentra un solo documento
    db.usuarios.findOne({ nombre: "Nacho" });

    find().limit() // Limita la cantidad de documentos
    db.usuarios.find({ nombre: "Nacho" }).limit(1);

    find().sort() // Ordena los documentos
    db.usuarios.find({ nombre: "Nacho" }).sort({ edad: -1 }); // Ordena por edad descendente
    db.usuarios.find({ nombre: "Nacho" }).sort({ edad: 1 }); // Ordena por edad ascendente

    find().count() // Cuenta los documentos que coinciden
    db.usuarios.countDocuments({ nombre: "Nacho" });

    pretty() // poner mas entendible
    b.usuarios.find({ nombre: "Nacho" }).pretty();

    db.usuarios.find({ gustos: { $elemMatch: { $eq: "Programar" } } }); // Buscar donde el capo gustos sea programar (en un array)



        // ACTUALIZAR

    updateOne() || update() // Actualiza el primer documento que coincida con la propiedad indicada (si no tiene esa propiedad la agrega)
    db.usuarios.updateOne(
        { nombre: "Nacho" }, // recomendable hacerlo por el _id ya que simepre sera un valor irrepetible
        { $set: { edad: 31 } }
    );

    db.usuarios.updateOne(
        { nombre: "Nacho" }, // recomendable hacerlo por el _id ya que simepre sera un valor irrepetible
        { $unset: { creditos: "" } } // Actualiza la propiedad borrandola
    );

    db.usuarios.updateOne(
        { nombre: "Nacho" }, // recomendable hacerlo por el _id ya que simepre sera un valor irrepetible
        { $set: { edad: 31 } },
        { upset:true }
    );

    db.usuarios.update(
        { nombre: "Nacho" }, // recomendable hacerlo por el _id ya que simepre sera un valor irrepetible
        { $rename: { nombre: "nombreAlumno" } },
    );


    updateMany() // Actualiza todos los documentos que coincidan
    db.usuarios.updateMany(
        { nombre: "Nacho" },
        { $set: { ciudad: "Sevilla" } }
    );

    db.usuarios.updateMany(
        {  }, // para todos
        { $set: { ciudad: "Sevilla" } }
    );


    replaceOne() // Reemplaza completamente un documento
    db.usuarios.replaceOne(
        { nombre: "Nacho" },
        { nombre: "Nacho", edad: 27, ciudad: "Sevilla" }
    );

    $push // Agrega un elemento a un array
    db.usuarios.updateOne(
        { nombre: "Nacho" },
        { $push: { hobbies: "Fútbol" } }
    );

    $each // Agrega un array de elementos a un array si no estaban ya
    db.usuarios.updateOne(
        { nombre: "Nacho" },
        { $push: { hobbies: { $each:["Fútbol" , "Baloncesto"]} } }
    );

    db.usuarios.updateOne(
        { nombre: "Nacho" },
        { $push: { notas: { $each:[2 , 6, 19, 1], $sort:1} } } // ademas lo ordenamos
    );

    db.usuarios.updateOne(
        { nombre: "Nacho" },
        { $push: { notas: { $each:[1 , 2, 3], $position:0} } } // lo añadimos en la posicion que queramos
    );

    $addToSet // Agrega un elemento a un array solo si no existe
    db.usuarios.updateOne(
        { nombre: "Nacho" },
        { $addToSet: { hobbies: "Fútbol" } }
    );

    $pull // Elimina un elemento de un array
    db.usuarios.updateOne(
        { nombre: "Nacho" },
        { $pull: { hobbies: "Fútbol" } }
    );

    $pullAll // Elimina varios elementos de un array
    db.usuarios.updateOne(
        { nombre: "Nacho" },
        { $pullAll: { notas: [2 , 6, 19, 1] } }
    );

    $pop // elimina el primer elemento (-1) o el ultimo elemento (1)
    db.usuarios.updateOne(
        { nombre: "Nacho" },
        { $pop: { notas: -1 } } 
    );


        // OPERACIONES


    $inc // Incrementa un valor numérico
    db.usuarios.updateOne(
        { nombre: "Nacho" },
        { $inc: { edad: 1 } } // Suma 1 a la edad
    );

    $mul // Multiplica un valor numérico
    db.usuarios.updateOne(
        { nombre: "Nacho" },
        { $mul: { edad: 2 } } // Multiplica por 2 el valor (0.5 para dividir a la mitad)
    );
    
    $max // Actualiza un valor numérico
    db.usuarios.updateOne(
        { nombre: "Nacho" },
        { $max: { record: 1000 } } // Actualiza si el valor dado es menor al actual
    );

    $min // Actualiza un valor numérico
    db.usuarios.updateOne(
        { nombre: "Nacho" },
        { $max: { record: 1000 } } // Actualiza si el valor dado es mayor al actual
    );

    $mod // Obtener resto al operar
    db.usuarios.find(
        { $edad: { $mod: [2,0] } } // pares (al dividir entre 2 el resto es 0)
    );

        // BORRAR

    deleteOne() // Elimina el primer documento que coincida
    db.usuarios.deleteOne({ nombre: "Nacho" });

    deleteMany() // Elimina todos los documentos que coincidan
    db.usuarios.deleteMany({ nombre: "Nacho" });

        // consultar documentos dentro de documentos

    db.usuarios.find(
        { "apoderado.nombre": /a$/ }
    );
    db.usuarios.find().sort(
        {"apoderado.nombre":1}
    );
    


        // COMPARADORES


    $gt, $gte, $lt, $lte, $eq, $ne // Comparaciones numéricas

    db.usuarios.find({ edad: { $gt: 25 } }); // Usuarios mayores de 25 años
    db.usuarios.aggregate([
        { $project: { nombre:1, edad:1, esMayorEdad:{ $gt:[ "$edad",17 ] } } } 
    ]);

    db.usuarios.find({ edad: { $gte: 30 } }); // Usuarios de 30 años o más
    db.usuarios.aggregate([
        { $project: { nombre:1, edad:1, esMayorEdad:{ $gte:[ "$edad",18 ] } } } 
    ]);


    db.usuarios.find({ edad: { $lt: 25 } }); // Usuarios menores de 25 años
    db.usuarios.aggregate([
        { $project: { nombre:1, edad:1, esMenorEdad:{ $lt:[ "$edad",18 ] } } } 
    ]);


    db.usuarios.find({ edad: { $lte: 30 } }); // Menores o iguales a 30
    db.usuarios.aggregate([
        { $project: { nombre:1, edad:1, esMenorEdad:{ $lte:[ "$edad",17 ] } } } 
    ]);


    db.usuarios.find({ edad: { $eq: 30 } }); // Usuarios con edad 30
    db.usuarios.aggregate([
        { $project: { nombre:1, esHombre:{ $eq:[ "$sexo","Masculino" ] } } } 
    ]);

    db.usuarios.find({ edad: { $ne: 30 } }); // Usuarios con edad distinta de 30



    $in // Usuarios que SI están en Madrid o Barcelona
    db.usuarios.find({ ciudad: { $in: ["Madrid", "Barcelona"] } });

    $nin // Usuarios que NO están en Madrid ni Barcelona
    db.usuarios.find({ ciudad: { $nin: ["Madrid", "Barcelona"] } });

    $not // (para expresiones regulares) Usuarios que NO terminen con "o"
    db.usuarios.find({ nombre: { $not: /0$/ } });

    $exists // Usuarios que tengan "nombre"
    db.usuarios.find({ nombre: { $exists:true } });

    $or // // filtrar con que se cumpla una de las condiciones 
    db.usuarios.find({ $or: [{ ciudad: "Madrid" }, { edad: 25 }] });

    $and // filtrar cuando se cumplan varias condiciones 
    db.usuarios.find({ $and: [{ ciudad: "Madrid" }, { edad: {$gt:30} },{ edad: {$lt:40} }] });
    db.usuarios.aggregate([
        { $project: { nombre:1, sexo:1, edad:1, seleccionable:{$and:[{$eq:["sexo","Femenino"]},{$gt:["edad",17]}]} } } 
    ]);


            //FECHAS
    db.usuarios.aggregate([
        { $project: { vencimiento:1, año:{$year:"vencimiento"} } }
    ]);
    db.usuarios.aggregate([
        { $project: { vencimiento:1, mes:{$month:"vencimiento"} } }
    ]);
    db.usuarios.aggregate([
        { $project: { vencimiento:1, numeroSemana:{$week:"vencimiento"} } }
    ]);
    db.usuarios.aggregate([
        { $project: { vencimiento:1, numeroDiaAño:{$dayOfYear:"vencimiento"} } }
    ]);
    db.usuarios.aggregate([
        { $project: { vencimiento:1, numeroDiaMes:{$dayOfMonth:"vencimiento"} } }
    ]);
    db.usuarios.aggregate([
        { $project: { vencimiento:1, numeroDiaSemana:{$dayOfweek:"vencimiento"} } }
    ]);
    db.usuarios.aggregate([
        { $project: { vencimiento:1, fechaVencimiento:{$dateToString:{format:"%d-%m-%y", "vencimiento"}} } }
    ]);



        //GESTION ARRAYS
    db.usuarios.aggregate([
        { $project: { notas:1, primeraNota:{$arrayElemAt:["notas",0]}, segundaNota:{$arrayElemAt:["notas",1]} } }
    ]);

    db.usuarios.aggregate([
        { $project: { notasNuevo:{ $concatArrays:["$notas", [20]]} } }
    ]);

    db.usuarios.aggregate([
        { $project: { nombre:1, notasNuevo:{ $reverseArrays:"$notas"} } }
    ]);
    
    db.usuarios.aggregate([
        { $project: { nombre:1, notas:{ $slice:["$notas",0,2]} } }
    ]);

    db.usuarios.aggregate([
        { $project: { nombre:1, longitud:{ $size:"$notas"} } }
    ]);

    db.usuarios.aggregate([
        { $project: { nombre:1, edad:{ $toString:"$edad"} } }
    ]);

    db.usuarios.aggregate([
        { $project: { nombre:1, edad:{ $toLong:"$edad"} } }
    ]);

    db.usuarios.aggregate([
        { $project: { nombre:1, edad:{ $toDecimal:"$edad"} } }
    ]);

    // switch

    db.usuarios.aggregate([
        { $project: { nombre:1, promedio:{$avg:"$notas"}, mensaje:{ 
            $switch:{
                branches:[
                    {case:{$gte:[{$avg:"$notas"},11]},then:"aprobado"},
                    {case:{$lt:[{$avg:"$notas"},11]},then:"suspenso"}
                ],
                default:"error"
            }
        } } }
    ]);

    // group

    db.usuarios.aggregate([
        { $group:{_id:"sexo" , sumaEdades:{$sum:"$edad"}} }
    ]);

    db.usuarios.aggregate([
        { $group:{_id:null , count:{$sum:1}} }
    ]);

    //count

    db.usuarios.aggregate([]).toArray().length;

    db.usuarios.aggregate([]).itcount();


    db.usuarios.aggregate([
        {$match: {nombre: /o$/ }},
        {$group:{_id:{$year:"$vencimiento"}, num:{$sum:1}, sumaCantidades:{$sum:"$cantidad"}}}
    ]).itcount();

    //limit

    db.usuarios.aggregate([
        {$project:{nombre:1,apellido:1}},
        {$limit:2},
        {$sort:{nombre:-1}}
    ])

    
    db.usuarios.aggregate([
        {$limit:5},
        {$group:{_id:"sexo",cantidad:{$sum:1}}}
    ])

    // agrupacion de destruccion

    db.usuarios.aggregate([
        {$unwind:"$notas"},
        {$project:{nombre:1,notas:1}}
    ])

    db.usuarios.aggregate([
        {$project:{typeNombre:{$type:"$nombre"}}}
    ])

    // crear coleccion personaFemenino a partir de otra coleccion
    db.usuarios.aggregate([
        {$match:{sexo:"Femenino"}},
        {$out:"personaFemenino"}
    ])

    //join
    
    db.usuarios.aggregate([
        {$lookup:{
            from:"Categorias",
            localField:"isTipoCategoria",
            foreignField:"_id",
            as:"productos_Categoria"
        }},
        {$project:{nombreCat:"$productos.Categoria.nombre"}}
    ])




    $regex // Búsqueda por expresión regular
    db.usuarios.find({ nombre: /^N/ }); // Nombres que empiezan con "N" 
    db.usuarios.find({ nombre: /o$/ }); // Nombres que acaben con "o" 
    db.usuarios.find({ nombre: /ch/ }); // Nombres que contengan "ch" 
    db.usuarios.find({ nombre: { $regex: "^N", $options: "i" } }); // Nombres que empiezan con "N" 
    // options
    // "i"	Ignora mayúsculas/minúsculas (Ejemplo: "nacho" y "NACHO" serán iguales)
    // "m"	Modo multilínea, hace que ^ y $ funcionen línea por línea en textos largos
    // "s"	Permite que . coincida con saltos de línea (\n)
    // "x"	Ignora espacios en la expresión regular, útil para expresiones complejas
    // "l"	Usa reglas de mayúsculas/minúsculas del idioma actual (poco común)
    // "u"	Interpreta la expresión como Unicode


    // varios operadores
    db.usuarios.find({
        edad: { $gte: 25, $lte: 35 },  // Edad entre 25 y 35 años
        ciudad: { $nin: ["Sevilla", "Valencia"] } // Excluyendo Sevilla y Valencia
    });



    $unset
    // Eliminar un campo
    db.usuarios.updateOne(
        { nombre: "Nacho" },
        { $unset: { edad: "" } } // Elimina el campo "edad"
    );

    // Eliminar varios campos a la vez
    db.usuarios.updateOne(
        { nombre: "Nacho" },
        { $unset: { edad: "", ciudad: "" } } // Elimina los campos "edad" y "ciudad"
    );

    // Eliminar un campo en varios documentos
    db.usuarios.updateMany(
        { nombre: "Nacho" },
        { $unset: { ciudad: "" } }
    );

    // Para contar
    db.usuarios.find({ apellido: /er/ }).size();
    db.personas.find().skip(1).size();
    db.usuarios.count();
    db.usuarios.countDocuments();
    db.usuarios.estimatedDocumentCount();



        // RELACCIONES

    // de 1 a M (Embed)
    persona = {
        _id: 1,
        nombre: "Nacho",
        comentarios: [
            { texto: "¡Me encanta programar!", fecha: "2025-04-01" },
            { texto: "Hoy aprendí MongoDB", fecha: "2025-04-02" }
        ]

    }

    // de 1 a M (Reference)
    persona = {
        _id: 1,
        nombre: "Nacho"
    }

    opinion = {
        _id: 101,
        contenido: "MongoDB es una base de datos NoSQL...",
        usuarioId: 1

    }

    // de 1 a 1 
    persona = {
        _id: 1,
        nombre: "Nacho",
        perfilId: 1001
    }


    perfil = {
        _id: 1001,
        descripcion: "Desarrollador de software",
        edad: 30
    }

    // de M a M 
    persona = {
        _id: 1,
        nombre: "Nacho",
        cursos: [101, 102]  // Referencias a los IDs de los cursos
    }

    cursos = {
        _id: 101,
        nombre: "MongoDB Básico"
    },
    {
        _id: 102,
            nombre: "JavaScript Avanzado"
    }

            // CREAR VISTAS


    db.createView("vistasMasculino", "personas", [{$match:{sexo:"masculino"}}]) // filtrar personas a solo personas con sexo masculino
    db.createView("vistasNombre", "vistasMasculino", [{$match:{nombre:"nacho"}}])
    db.vistasMasculino.find().pretty() // ver la lista filtrada



            //AGREGACIONES



        aggregate() // Agrupaciones y estadísticas
        db.usuarios.aggregate([
            { $match: { nombre: "Nacho" } },
            { $group: { _id: "$ciudad", total: { $sum: 1 } } }
        ]);

        //$project (le decimos cual queremos mostrar)
        db.usuarios.aggregate([
            { $project: { nombre: 1, edad: 1, nombreEscuela:"EasyPro" } }
        ]);
        //$sum ()
        db.usuarios.aggregate([
            { $project: { nombre: 1, sumaNotas: {$sum: "$notas" } } }
        ]);
        //$avg ()
        db.usuarios.aggregate([
            { $project: { nombre: 1, sumaNotas: {$sum: "$notas" }, avgNotas: {$avg: "$notas" } } }
        ]);
        //$ceil (redondea hacia arriba)
        db.usuarios.aggregate([
            { $project: { nombre: 1, sumaNotas: {$sum: "$notas" }, promedioSinRedondeo: {$avg: "$notas" }, promedioConRedondeo: {$ceil: {$avg: "$notas" } } } }
        ]);
        //$floor (solo parte entera (ignora decimales))
        db.usuarios.aggregate([
            { $project: { nombre: 1, sumaNotas: {$sum: "$notas" }, promedioSinRedondeo: {$avg: "$notas" }, promedioSinDecimal: {$floor: {$avg: "$notas" } } } }
        ]);
        //$multiply (multiplica)
        db.productos.aggregate([
            { $project: { cantidad:1, precio:1, total:{ $floor:{ $multiply:["$cantidad","$precio"]} } } }
        ]);
        //$substract (aplicar descuento (100 en este caso sobre el multiply))
        db.productos.aggregate([
            { $project: { cantidad:1, precio:1, totalDesc:{ $multiply:["$cantidad","$precio"] } ,totalDesc:{ $substract:[{ $multiply:["$cantidad","$precio"]},100] } } }
        ]);
        //$toLower (convertir todo a minisculas)
        db.productos.aggregate([
            { $project: { nombreMayus:{ $toLower:"$nombre" } } }
        ]);
        //$toUpper (convertir todo a mayusculas)
        db.productos.aggregate([
            { $project: { nombreMayus:{ $toUpper:"$nombre" } } }
        ]);
        //$trim (elimina espacios principio y final)
        db.productos.aggregate([
            { $project: { nombre:{ $trim:{$input:"nombre"}} } } 
        ]);
        //$ltrim (elimina espacios principio )
        db.productos.aggregate([
            { $project: { nombre:{ $ltrim:{$input:"nombre"}} } } 
        ]);
        //$rtrim (elimina espacios final)
        db.productos.aggregate([
            { $project: { nombre:{ $trim:{$input:"nombre"}} } } 
        ]);
        //$rtrim (coger una porcion (desde la posicion0 y 3 caracteres))
        db.productos.aggregate([
            { $project: { nombre:{ $substrCP:["$nombre",0,3]} } } 
        ]);
        //$strLenCP (devuelve el numero de caracterres que tiene una cadena)
        db.productos.aggregate([
            { $project: { nombre:1, numeroCaracter:{ $strLenCP:"$nombre"} } } 
        ]);
        //$concat (concatenar cadenas)
        db.productos.aggregate([
            { $project: { nombreCompleto:{ $concat:[{$substrCP:["$nombre",0,3]},{$substrCP:["$apellido",0,3]} ] } } } 
        ]);
}

function ejemplos() {

    db.personas.find({ nombre: /o$/ }, { nombre: 1, _id: 0 });
    db.personas.find({ edad: { $gt: 0 } }).map(persona => "el nombre es " + persona.nombre + " y mi edad es " + persona.edad);
    db.personas.find({ edad: { $gt: 0 } }).forEach(persona => print("el nombre es " + persona.nombre + " y mi edad es " + persona.edad));
    db.personas.find().sort({ edad: -1 }).limit(1);
    db.personas.find().skip(1);
    db.personas.find().toArray().filter(persona => persona.edad > 18).map(persona => "mi nombre es " + persona.nombre);

}

function sacarNombrePrimeraMayus() {
    db.personas.aggregate([
        {
            $project: {
                _id: 0,
                gender: 1,
                NombreCompleto: {
                    $concat: [
                        { $toUpper: { $substrCP: ["$name.first", 0, 1] } },
                        { $substrCP: ["$name.first", 1, { $substract: [{ $strLenCP: "$name.first" }, 1] }] },
                        " ",
                        { $toUpper: { $substrCP: ["$name.last", 0, 1] } },
                        { $substrCP: ["$name.last", 1, { $substract: [{ $strLenCP: "$name.last" }, 1] }] }
                    ]
                }
            }
        }
    ])
}

function crearSquemaRelaccion() {
    db.createCollection("categoriaEsquema",{
        validator:{
            $jsonSchema:{
                bsonType:"object",
                required:["idCategoria","nombre"],
                propierties:{
                    idCategoria:{
                        bsonType:"number",
                        description:"id de la categoria"
                    },
                    nombre:{
                        bsonType:"string",
                        description:"nombre de la categoria"
                    },
                    habilitado:{
                        bsonType:"number",
                        description:"indicara si la categoria esta existente"
                    }
                }
            }
        }
    })


    db.categoriaEsquema.insertOne({idCategoria:200,nombre:"nacho"});






    db.createCollection("productosEsquema",{
        validator:{
            $jsonSchema:{
                bsonType:"object",
                required:["nombre","idCategoria","idMarca"],
                propierties:{
                    nombre:{
                        bsonType:"string",
                        description:"nombre del producto"
                    },
                    precio:{
                        bsonType:"number",
                        description:"nombre de la categoria"
                    },
                    idCategoria:{
                        bsonType:"number",
                        description:"id de la categoria"
                    },
                    idMarca:{
                        bsonType:"number",
                        description:"id de la marca"
                    }
                }
            }
        }
    })

    db.productosEsquema.insertOne({nombre:"galletas",idCategoria:200,idMarca:1});

    db.createCollection("marcaEsquema",{
        validator:{
            $jsonSchema:{
                bsonType:"object",
                required:["nombre","idMarca"],
                propierties:{
                    nombre:{
                        bsonType:"string",
                        description:"nombre del producto"
                    },
                    idMarca:{
                        bsonType:"number",
                        description:"id de la marca"
                    },
                    bhabilitado:{
                        bsonType:"number",
                        description:"campo de existencia"
                    }
                }
            }
        }
    })

    db.marcaEsquema.insertOne({nombre:"marca1",idMarca:1,descripcion:"primera marca"});

    db.productosEsquema.insertOne({nombre:"coche",idCategoria:200,idMarca:1});


    db.createCollection("reservasEsquema",{
        validator:{
            $jsonSchema:{
                bsonType:"object",
                required:["idPersona","cantidadPersonas"],
                propierties:{
                    idPersona:{
                        bsonType:"number",
                        description:"id de la persona"
                    },
                    cantidadPersonas:{
                        bsonType:"number",
                        description:"cantidad personas"
                    },
                    fechaReserva:{
                        bsonType:"date",
                        description:"fecha de la reserva"
                    },
                    telefonoContacto:{
                        bsonType:"number",
                        description:"numero de la reserva"
                    },
                    productosReservas:{
                        bsonType:"array",
                        description:"productos a comprar"
                    }
                }
            }
        }
    })

    db.reservasEsquema.insertOne({idPersona:30,cantidadPersonas:25,productosReservas:[3,4,6]});




    db.createCollection("personasEsquema",{
        validator:{
            $jsonSchema:{
                bsonType:"object",
                required:["idPersona"],
                propierties:{
                    idPersona:{
                        bsonType:"number",
                        description:"id de la persona"
                    },
                    edad:{
                        bsonType:"number",
                        minimun:0,
                        maximumm:150,
                        description:"id de la persona"
                    },
                    sexo:{
                        enum:["Masculino","Femenino"],
                        description:"sexo"
                    }
                }
            }
        }
    })

    db.reservasEsquema.insertOne({idPersona:4,edad:27,sexo:"Masculino"});

}


function agruparYOrdenar() {
    db.personas.aggregate([
        { $match: { gender: "female" } },
        { $group: { _id: { ciudad: "$location.city" }, personas: { $sum: 1 } } },
        { $sort: { personas: -1 } }
    ]).pretty()

}


function tipoDeDatos(){
    objectID="identificador unico "
}