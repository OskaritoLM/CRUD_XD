import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';

import{DatosPModel} from'../models/datosPModel';

@Injectable({
  providedIn: 'root'
})
export class DatosPService {

  constructor(private http: HttpClient) { }
  domain: string="http://localhost:3000";
  getDatosP() {
    return this.http.get<DatosPModel[]>(`${this.domain}/api/datosP`).pipe(
      map(res => res)
    );
  }

  addDatosP(newDatosP: DatosPModel){
    return this.http.post<DatosPModel>(`${this.domain}/api/datosP`,newDatosP).pipe(
      map(res => res)
      );
  }

  deleteDatosP(id: string){
    return this.http.delete<DatosPModel>(`${this.domain}/api/datosP/${id}`).pipe(
      map(res => res)
      );
  }
  updateDatosP(newDatosP: DatosPModel) {
    return this.http.put(`${this.domain}/api/datosP/${newDatosP._id}`, newDatosP).pipe(
      map(res => res)
    );
  }
}
