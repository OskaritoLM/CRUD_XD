import { Component, OnInit } from '@angular/core';
import { ReservasService } from 'src/app/services/reserva.service';
@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {
  reservas: any[] = [];

  constructor(private reservasService: ReservasService) { }

  ngOnInit(): void {
    this.reservasService.getReservas().subscribe(
      (reservas: any[]) => {
        this.reservas = reservas;
      },
      (error) => {
        console.error('Error al obtener las reservas:', error);
      }
    );
  }

  verReserva(reserva: any) {
    alert(`Cliente: ${reserva.cliente}\nTeléfono: ${reserva.telefono}\nLugar: ${reserva.lugarS}\nEstatus: ${reserva.estatusR}`);
  }
}
