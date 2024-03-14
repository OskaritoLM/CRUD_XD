// autos.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutosService {
  private apiUrl = 'http://localhost:3000'; // Reemplaza 'tu-servidor' con la URL de tu servidor Node.js

  constructor(private http: HttpClient) { }

  obtenerDatos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}

