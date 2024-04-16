import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { CuidadModel } from '../models/datosPModel';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {
  private domain: string = "http://localhost:3001";

  constructor(private http: HttpClient) { }

  getDatosP() {
    return this.http.get<CuidadModel[]>(`${this.domain}/api/Estado`).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  addDatosP(newDatosP: CuidadModel) {
    return this.http.post<CuidadModel>(`${this.domain}/api/Estado`, newDatosP).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  deleteDatosP(id: string) {
    return this.http.delete<CuidadModel>(`${this.domain}/api/Estado/${id}`).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  updateDatosP(newDatosP: CuidadModel) {
    return this.http.put(`${this.domain}/api/Estado/${newDatosP._id}`, newDatosP).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError('Something went wrong, please try again later.');
  }
}
