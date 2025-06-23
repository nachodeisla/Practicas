import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuaro.model';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, FormsModule],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];


  nuevoUsuario: Usuario = {
    name: '',
    surname: '',
    email: '',
    password: '',
    createdAt: new Date(),
    lastAccessAt: new Date()
  };


  editando: boolean = false;
  filtroUsuario: string = '';


  get usuariosFiltrados(): Usuario[] {
    return this.usuarios.filter(usuario =>
      `${usuario.name} ${usuario.surname} ${usuario.email}`
        .toLowerCase()
        .includes(this.filtroUsuario.toLowerCase())
    );
  }


  constructor(private usuarioService: UsuarioService) {}


  ngOnInit(): void {
    this.getUsuarios();
  }


  getUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe({
      next: (data) => {
        console.log("usuarios: ", data);
        this.usuarios = data;
      },
      error: (err) => console.error('Error al cargar usuarios', err),
    });
  }


  eliminarUsuario(id: number): void {
    if (confirm('¿Seguro que quieres eliminar este usuario?')) {
      this.usuarioService.eliminarUsuario(id).subscribe(() => this.getUsuarios());
    }
  }


  guardarUsuario(): void {
    if (this.editando) {
      this.usuarioService.actualizarUsuario(this.nuevoUsuario).subscribe(() => {
        this.getUsuarios();
        this.resetFormulario();
      });
    } else {
      this.usuarioService.crearUsuario(this.nuevoUsuario).subscribe(() => {
        this.getUsuarios();
        this.resetFormulario();
      });
    }
  }


  editarUsuario(usuario: Usuario): void {
    console.log("editando usuario:", usuario);
    this.nuevoUsuario = { ...usuario };
    this.editando = true;
  }


  resetFormulario(): void {
    this.nuevoUsuario = {
      name: '',
      surname: '',
      email: '',
      password: '',
      createdAt: new Date(),
      lastAccessAt: new Date()
    };
    this.editando = false;
  }
}






