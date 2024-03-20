import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservaModel } from '../../models/datosPModel';
import { ReservasService } from '../../services/reserva.service';

@Component({
  selector: 'app-ver-reserva',
  templateUrl: './ver-reserva.component.html',
  styleUrls: ['./ver-reserva.component.css']
})
export class VerReservaComponent implements OnInit {
  reserva: ReservaModel = new ReservaModel();

  constructor(
    private route: ActivatedRoute,
    private reservasService: ReservasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.reservasService.getReservaById(id).subscribe(
        (reserva: ReservaModel) => {
          this.reserva = reserva;
        },
        (error) => {
          console.error('Error al cargar la reserva:', error);
          this.router.navigate(['/']); // Redirigir a la página de inicio en caso de error
        }
      );
    }
  }

  volver() {
    this.router.navigate(['/']); // Navegar de nuevo a la página de inicio
  }
}
