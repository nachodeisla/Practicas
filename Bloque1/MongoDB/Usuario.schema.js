
db.createCollection(
  "Usuario",
  {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: [
          'nombre',
          'apellidos',
          'correoElectronico',
          'contrasenna',
          'fechaCreacion'
        ],
        properties: {
          _id: {
            bsonType: 'objectId',
            description: 'ID único'
          },
          nombre: {
            bsonType: 'string',
            description: 'Nombre del usuario'
          },
          apellidos: {
            bsonType: 'string',
            description: 'Apellidos del usuario'
          },
          correoElectronico: {
            bsonType: 'string',
            description: 'Correo electrónico del usuario (único)',
            pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
          },
          contrasenna: {
            bsonType: 'string',
            description: 'One-way hash -https://bcrypt.online/- contraseña del usuario'
          },
          fechaCreacion: {
            bsonType: 'date',
            description: 'Fecha y hora de creación del usuario'
          },
          fechaUltimoAcceso: {
            bsonType: 'date',
            description: 'Fecha y hora del último acceso del usuario'
          },
          polizas: {
            bsonType: 'array',
            description: 'Lista de pólizas contratadas por el usuario',
            items: {
              bsonType: 'object',
              required: ['numero', 'modalidad', 'prima'],
              properties: {
                numero: {
                  bsonType: 'string',
                  description: 'Número único de la póliza'
                },
                modalidad: {
                  bsonType: 'string',
                  description: 'Modalidad de la póliza'
                },
                prima: {
                  bsonType: 'number',
                  description: 'Prima de la póliza'
                }
              }
            }
          }
        }
      }
    }
  });


  db.Usuario.createIndex({ correoElectronico:1 },{ unique:true, name:"EmailUnico" });