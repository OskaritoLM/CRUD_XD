import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

import { catchError, map } from 'rxjs/operators';

import { UsuarioModel } from '../models/datosPModel';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private domain = 'http://localhost:3001'; // Cambia "your_port" al puerto donde se ejecuta tu servidor

  constructor(private http: HttpClient) { }

  getusuarios() {
    return this.http.get<UsuarioModel[]>(`${this.domain}/api/usuario`).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  addusuario(newusuario: UsuarioModel) {
    return this.http.post<UsuarioModel>(`${this.domain}/api/usuario`, newusuario).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  deleteusuario(id: string) {
    return this.http.delete<UsuarioModel>(`${this.domain}/api/usuario/${id}`).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  getusuarioById(id: string) {
    return this.http.get<UsuarioModel>(`${this.domain}/api/usuario/${id}`).pipe(
      catchError(this.handleError)
    );
  }


  updateusuario(newusuario: UsuarioModel) {
    return this.http.put(`${this.domain}/api/usuario/${newusuario._id}`, newusuario).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }
  getusuariosByEmail(correo: string): Observable<UsuarioModel> {
    return this.http.get<UsuarioModel>(`${this.domain}/api/usuario?correo=${correo}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError('Something went wrong, please try again later.');
  }
}
