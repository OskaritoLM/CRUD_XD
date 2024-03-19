import { Component } from '@angular/core';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent {


  constructor(private reservasService: ReservasService,private toastrService:ToastrService) { }
  ngOnInit(): void {
  }

  obtenReserva(noReserva: string) {
    this.reservasService.getReservaById(noReserva).subscribe(
      (reserva: ReservaModel) => {
        this.reservaEncontrada = reserva;
      },
      (error) => {
        console.error('Error al obtener reserva:', error);
        this.toastrService.error('Reserva no encontrada. Verifica tus datos', 'Error');
      }
    );
  }

}
