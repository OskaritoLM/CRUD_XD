import { Injectable } from '@angular/core';
import { AutoModel, ReservaLugarModel } from '../models/datosPModel';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class EnviaDatosService {
 private auto$ = new BehaviorSubject<AutoModel>(iniAuto);
 private reservaLugar$ = new BehaviorSubject<ReservaLugarModel>(initLugarR);

 constructor(){
 
 }

 get selectedAuto$(): Observable<AutoModel>{
  return this.auto$.asObservable();
 }
 get reserva$(): Observable<ReservaLugarModel>{
  return this.reservaLugar$.asObservable();
 }

 setReserva(reserva:ReservaLugarModel): void{
  this.reservaLugar$.next(reserva);
 }

 setAuto(auto: AutoModel): void {
  this.auto$.next(auto);
 }

}

const initLugarR: ReservaLugarModel = {
  lugarS: '',
  fechasS: new Date(),
  horasS: '',
  fechasE: new Date(),
  horasE: '',
  lugarE: '',
 };

 const iniAuto: AutoModel = {
  _id: '',
  imagen: '',
  marca: '',
  modelo: '',
  anio: 0,
  placas: '',
  asientos: 0,
  maletas: 0,
  tipoCaja: '',
  tipoVehiculo: '',
  cantVehiculos: 0,
  categoria: '',
  precioDia: 0  
 };