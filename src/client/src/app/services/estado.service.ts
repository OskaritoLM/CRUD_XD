// estado.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CuidadModel, EstadoModel } from '../models/datosPModel';

@Injectable({
  providedIn: 'root'
})
export class CiudadService {
  private domain: string = "http://localhost:3000"; // Reemplaza con la URL correcta de tu API

  constructor(private http: HttpClient) { }

  getEstados() {
    return this.http.get<EstadoModel[]>(`${this.domain}/api/Ciudad`).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  addEstado(newEstado: EstadoModel) {
    return this.http.post<EstadoModel>(`${this.domain}/api/Ciudad`, newEstado).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  deleteEstado(id: string) {
    return this.http.delete<EstadoModel>(`${this.domain}/api/Ciudad/${id}`).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  updateEstado(newEstado: EstadoModel) {
    return this.http.put(`${this.domain}/api/Ciudad/${newEstado._id}`, newEstado).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  private handleError(error: EstadoModel) {
    console.error('An error occurred:', error);
    return throwError('Something went wrong, please try again later.');
  }
}
