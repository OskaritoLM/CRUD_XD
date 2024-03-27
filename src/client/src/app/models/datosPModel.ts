export class DatosPModel {
    _id?: string;
    nombre: string="";
}
export class EstadoModel {
  _id?: string;
  nombre: string = "";
  pais: string = "";
  estado: string = ""; // Asegúrate de incluir esta propiedad
}


export class LugarModel {
    _id?: string;
    nombre: string = "";
    direccion: string = "";
    pais: string = "";
    ciudad: string = "";
    Estado: string = ""; 
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
    estatusR: string = "proceso";
    total: string = "";
    vehiculo: string = "";
    cupon:string = "";
    //licencia: string = "";
}

export class UsuarioModel {
  _id?: string;
  nombre: string = "";
  apellidos: string = "";
  correo: string = "";
  contrasena: string = "";
  telefono: number = 0;
  lugarS: string = "";
  rol: string = "";
}

// export class ReservaLugarModel {
//   lugarS: string = "";
//   fechasS: Date = new Date();
//   horasS: string = "";
//   fechasE: Date = new Date();
//   horasE: string = "";
//   lugarE: string = "";
// }

// export class ReservaLugarModel {
//   lugarS: string = "";
//   fechasS: Date = new Date();
//   horasS: string = "";
//   fechasE: Date = new Date();
//   horasE: string = "";
//   lugarE: string = "";
// }

export interface AutoModel {
    _id: string;
    imagen: String;
    marca: string;
    modelo: string;
    anio: number;
    placas: string;
    asientos: number;
    maletas: number;
    tipoCaja: string;
    tipoVehiculo: string;
    cantVehiculos: number;
    categoria:string;
    precioDia: number;
  }
  