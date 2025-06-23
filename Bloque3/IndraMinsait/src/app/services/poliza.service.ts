import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Poliza } from '../../app/models/poliza.model';

@Injectable({
  providedIn: 'root',
})
export class PolizaService {
  private apiUrl = 'http://localhost:8080/api/polizas';

  constructor(private http: HttpClient) {}

  getPolizas(): Observable<Poliza[]> {
    return this.http.get<Poliza[]>(this.apiUrl);
  }

  getPoliza(id: number): Observable<Poliza> {
    return this.http.get<Poliza>(`${this.apiUrl}/${id}`);
  }

  crearPoliza(poliza: Poliza): Observable<Poliza> {
    return this.http.post<Poliza>(this.apiUrl, poliza);
  }

actualizarPoliza(id: number, poliza: Poliza): Observable<Poliza> {
  return this.http.put<Poliza>(`${this.apiUrl}/${id}`, poliza);
}


  eliminarPoliza(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}



