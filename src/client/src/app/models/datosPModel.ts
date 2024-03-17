export class DatosPModel {
    _id?: string;
    nombre: string="";
}
export class CuidadModel {
    _id?: string;
    nombre: string="";
    pais: string="";
}
export class ReservaModel {
    _id?: string;
    cliente: string = "";
    correo: string = "";
    telefono: number = 0;
    lugarS: string = "";
    fechasS: Date = new Date();
    horasS: string = "";
    fechasE: Date = new Date();
    horasE: string = "";
    lugarE: string = "";
    estatusR: string = "";
    total: string = "";
    vehiculo: string = "";
}
export class EstadoModel{
    _id?: string;
    nombre: string="";
    pais: string="";
    ciudad : string="";
}
