import { Injectable } from '@angular/core';
import { AutoModel, ReservaLugarModel, ReservaModel } from '../models/datosPModel';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class EnviaDatosService {
 private auto$ = new BehaviorSubject<AutoModel>(iniAuto);
 private reservaLugar$ = new BehaviorSubject<ReservaLugarModel>(initLugarR);
 private reservaComp$ = new BehaviorSubject<ReservaModel>(initReserva);
 constructor(){
 
 }

 get selectedAuto$(): Observable<AutoModel>{
  return this.auto$.asObservable();
 }
 get reserva$(): Observable<ReservaLugarModel>{
  return this.reservaLugar$.asObservable();
 }

 get reservaCompleta$(): Observable<ReservaModel>{
  return this.reservaComp$.asObservable();
 }

 setReserva(reserva:ReservaLugarModel): void{
  this.reservaLugar$.next(reserva);
 }

 setReservaCompleta(reservaCompleta:ReservaModel): void{
  this.reservaComp$.next(reservaCompleta);
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
  descuento: 0
 };

 const initReserva: ReservaModel = {
  _id: '',
  cliente: '',
  edad: 0,
  correo: '',
  telefono: 0,
  lugarS: '',
  fechasS: new Date(),
  horasS: '',
  lugarE: '',
  fechasE: new Date(),
  horasE: '',
  estatusR: '',
  total: 0,
  vehiculo: '',
  descuento: 0,
  license: '',
  identification: '',
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