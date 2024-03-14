import { Component, OnInit } from '@angular/core';
import { ReservaModel } from '../../models/datosPModel';
import { ReservasService } from '../../services/reserva.service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {
  reservas: ReservaModel[] = [];

  constructor(private reservasService: ReservasService) { }

  ngOnInit(): void {
    this.cargarReservas();
  }

  cargarReservas() {
    this.reservasService.getReservas().subscribe(
      (data: ReservaModel[]) => {
        this.reservas = data;
        console.log('Reservas cargadas:', this.reservas);
      },
      (error) => {
        console.error('Error al cargar reservas:', error);
      }
    );
  }

  verReserva(reserva: ReservaModel) {
    // Construir el mensaje con los detalles de la reserva
    const mensaje = `
      Detalles de la reserva:
      -----------------------
      Cliente: ${reserva.cliente}
      Correo: ${reserva.correo}
      Teléfono: ${reserva.telefono}
      Lugar de salida: ${reserva.lugarS}
      Fecha de salida: ${new Date(reserva.fechasS).toLocaleDateString()}
      Hora de salida: ${reserva.horasS}
      Lugar de llegada: ${reserva.lugarE}
      Fecha de llegada: ${new Date(reserva.fechasE).toLocaleDateString()}
      Hora de llegada: ${reserva.horasE}
      Estatus: ${reserva.estatusR}
      Total: ${reserva.total}
      Vehículo: ${reserva.vehiculo}
    `;
  
    // Mostrar la alerta con los detalles de la reserva
    alert(mensaje);
  }
  
  
}
