import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AutoModel } from '../models/datosPModel';
@Injectable({
  providedIn: 'root'
})
export class AutosService {
  private domain = 'http://localhost:3001';

  constructor(private http: HttpClient) { }

  getAutos() {
    return this.http.get<AutoModel[]>(`${this.domain}/api/Vehiculo`).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  updateCantidadAuto(autoId: string, cantidad: number) {
    return this.http.put(`${this.domain}/api/Vehiculo/${autoId}`, { cantidad }).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  addAuto(newAuto: AutoModel) {
    return this.http.post<AutoModel>(`${this.domain}/api/Vehiculo`, newAuto).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  deleteAuto(id: string) {
    return this.http.delete<AutoModel>(`${this.domain}/api/Vehiculo/${id}`).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  updateAuto(newReserva: AutoModel) {
    return this.http.put(`${this.domain}/api/Vehiculo/${newReserva._id}`, newReserva).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError('Something went wrong, please try again later.');
  }
}

