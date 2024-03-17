// estado.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {
  private domain: string = "http://localhost:3000"; // Reemplaza con la URL correcta de tu API

  constructor(private http: HttpClient) { }

  getEstados() {
    return this.http.get<any[]>(`${this.domain}/api/estado`).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  addEstado(newEstado: any) {
    return this.http.post<any>(`${this.domain}/api/estado`, newEstado).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  deleteEstado(id: string) {
    return this.http.delete<any>(`${this.domain}/api/estado/${id}`).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  updateEstado(newEstado: any) {
    return this.http.put(`${this.domain}/api/estado/${newEstado._id}`, newEstado).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError('Something went wrong, please try again later.');
  }
}
