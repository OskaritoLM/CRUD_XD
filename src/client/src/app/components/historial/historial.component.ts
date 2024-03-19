import { Component, OnInit, Input, ViewChild,ElementRef} from '@angular/core';
import { ReservasService } from 'src/app/services/reserva.service';
import { ReservaModel } from 'src/app/models/datosPModel';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent  implements OnInit{
  @ViewChild('noReservaInput')
  noReservaInput!: ElementRef<HTMLInputElement>;
  reservaEncontrada: ReservaModel = new ReservaModel();

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
