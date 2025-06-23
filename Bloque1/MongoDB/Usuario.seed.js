db.Usuario.insertMany([
    {
      nombre: "Nombre1",
      apellidos: "Apellido1",
      correoElectronico: "Email1@example.com",
      contrasenna: "$2y$10$vMPfMHDMPUWXw48L/1uROuSTerucLj0jopR38NXv3P8LqfFe.XSsy",
      fechaCreacion: new Date(),
      fechaUltimoAcceso: new Date(),
      polizas: [
        {
          numero: "POL1",
          modalidad: "Todo Riesgo",
          prima: 520.50
        }
      ]
    },
    {
      nombre: "Nombre2",
      apellidos: "Apellido2",
      correoElectronico: "Email2@example.com",
      contrasenna: "$2y$10$/xp/a94Zowr8UXulDLJdUOwaVkaOpsQWyvyvzxIsnkSMVImLc2286",
      fechaCreacion: new Date(),
      fechaUltimoAcceso: new Date(),
      polizas: [
        {
          numero: "POL2",
          modalidad: "Terceros",
          prima: 310.75
        },
        {
          numero: "POL3",
          modalidad: "Viaje",
          prima: 95.30
        }
      ]
    }
  ]);
  