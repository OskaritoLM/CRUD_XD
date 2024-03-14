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
    // Aquí puedes agregar la lógica para mostrar los detalles de la reserva
    // Por ejemplo, podrías abrir un modal con los detalles de la reserva
    console.log('Detalles de la reserva:', reserva);
  }
}
