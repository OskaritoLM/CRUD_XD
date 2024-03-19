import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LugarModel  } from '../models/datosPModel';

@Injectable({
  providedIn: 'root'
})
export class LugarService {

  private domain: string = "http://localhost:3000"; // Reemplaza con la URL correcta de tu API

  constructor(private http: HttpClient) { }

  getLugars() {
    return this.http.get<LugarModel[]>(`${this.domain}/api/Lugar`).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  addLugar(newLugar: LugarModel) {
    return this.http.post<LugarModel>(`${this.domain}/api/Lugar`, newLugar).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  deleteLugar(id: string) {
    return this.http.delete<LugarModel>(`${this.domain}/api/Lugar/${id}`).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }


  updateLugar(newDatosP: LugarModel) {
    return this.http.put(`${this.domain}/api/Lugar/${newDatosP._id}`, newDatosP).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  private handleError(error: LugarModel) {
    console.error('An error occurred:', error);
    return throwError('Something went wrong, please try again later.');
  }
}
