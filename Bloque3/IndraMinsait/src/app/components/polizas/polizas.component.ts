import { Component, OnInit } from '@angular/core';
import { Poliza } from '../../models/poliza.model';
import { PolizaService } from '../../services/poliza.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-polizas',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './polizas.component.html',
  styleUrls: ['./polizas.component.css']
})
export class PolizasComponent implements OnInit {
  polizas: Poliza[] = [];


nuevaPoliza: Poliza = {
  id: 0,
  numeroPoliza: '',
  tipoPoliza: '',
  fechaInicio: new Date().toISOString().split('T')[0],
  fechaFin: new Date().toISOString().split('T')[0],
  prima: 0,
  estado: 'ACTIVA', 
  usuarioId: 0
};








  editando: boolean = false;
  filtroPoliza: string = '';


  get polizasFiltradas(): Poliza[] {
    return this.polizas.filter(poliza =>
      `${poliza.numeroPoliza} ${poliza.tipoPoliza} ${poliza.usuarioId}`
        .toLowerCase()
        .includes(this.filtroPoliza.toLowerCase())
    );
  }


  constructor(private polizaService: PolizaService) {}


  ngOnInit(): void {
    this.getPolizas();
  }


  getPolizas(): void {
    this.polizaService.getPolizas().subscribe({
      next: (data) => {
        this.polizas = data;
      },
      error: (err) => console.error('Error al cargar pólizas', err)
    });
  }


  guardarPoliza(): void {
    if (this.editando && this.nuevaPoliza.id) {
      this.polizaService.actualizarPoliza(this.nuevaPoliza.id, this.nuevaPoliza).subscribe(() => {
        this.getPolizas();
        this.resetFormulario();
      });
    } else {
      const poliza = {...this.nuevaPoliza}
      delete poliza.id
      this.polizaService.crearPoliza(poliza).subscribe(() => {
        this.getPolizas();
        this.resetFormulario();
      });
    }
  }


  editarPoliza(poliza: Poliza): void {
    this.nuevaPoliza = { ...poliza };
    this.editando = true;
  }


  eliminarPoliza(id: number): void {
    if (confirm('¿Seguro que quieres eliminar esta póliza?')) {
      this.polizaService.eliminarPoliza(id).subscribe(() => this.getPolizas());
    }
  }


  resetFormulario(): void {
    this.nuevaPoliza = {
      id: 0,
      numeroPoliza: '',
      tipoPoliza: '',
      fechaInicio: '',
      fechaFin: '',
      prima: 0,
      estado: '',
      usuarioId: 0
    };
    this.editando = false;
  }
}





