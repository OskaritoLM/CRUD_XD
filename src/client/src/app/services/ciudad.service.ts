import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { CuidadModel } from '../models/datosPModel';

@Injectable({
  providedIn: 'root'
})
export class CiudadService {
  private domain: string = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  getDatosP() {
    return this.http.get<CuidadModel[]>(`${this.domain}/api/Ciudad`).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  addDatosP(newDatosP: CuidadModel) {
    return this.http.post<CuidadModel>(`${this.domain}/api/Ciudad`, newDatosP).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  deleteDatosP(id: string) {
    return this.http.delete<CuidadModel>(`${this.domain}/api/Ciudad/${id}`).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  updateDatosP(newDatosP: CuidadModel) {
    return this.http.put(`${this.domain}/api/Ciudad/${newDatosP._id}`, newDatosP).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError('Something went wrong, please try again later.');
  }
}
