import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ReservaModel } from '../models/datosPModel';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {
  private domain: string = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  getReservas() {
    return this.http.get<ReservaModel[]>(`${this.domain}/api/Reserva`).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  addReserva(newReserva: ReservaModel, licenseFile: File | null = null, identificationFile: File | null = null) {
    const formData = new FormData();
    formData.append('cliente', newReserva.cliente);
    formData.append('correo', newReserva.correo);
    formData.append('telefono', String(newReserva.telefono));
    formData.append('lugarS', newReserva.lugarS);
    formData.append('fechasS',  String(newReserva.fechasS));
    formData.append('horasS', newReserva.horasS);
    formData.append('lugarE', newReserva.lugarE);
    formData.append('fechasE', String(newReserva.fechasE));
    formData.append('horasE', newReserva.horasE);
    formData.append('total', String(newReserva.total));
    formData.append('vehiculo', newReserva.vehiculo);
    formData.append('descuento', String(newReserva.descuento));
    
    if (licenseFile !== null) {
        formData.append('license', licenseFile, licenseFile.name);
    }
    
    if (identificationFile !== null) {
        formData.append('identification', identificationFile, identificationFile.name);
    }
    
    return this.http.post<ReservaModel>(`${this.domain}/api/Reserva`, formData).pipe(
        map(res => res),
        catchError(this.handleError)
    );
}

  
  

  deleteReserva(id: string) {
    return this.http.delete<ReservaModel>(`${this.domain}/api/Reserva/${id}`).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  getReservaById(id: string) {
    return this.http.get<ReservaModel>(`${this.domain}/api/Reserva/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  updateReserva(newReserva: ReservaModel) {
    return this.http.put(`${this.domain}/api/Reserva/${newReserva._id}`, newReserva).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError('Something went wrong, please try again later.');
  }
}
