import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReservaModel } from '../../models/datosPModel';
import { ReservasService } from '../../services/reserva.service';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {
  reservas: ReservaModel[] = [];
  filterpost: string = '';

  constructor(private reservasService: ReservasService,    public auth: AuthService,private router: Router) { }

  ngOnInit(): void {
    this.cargarReservas();
  }
  login(){
    this.auth.logout()
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
    this.router.navigate(['/ver-reserva', reserva._id]);
  }
}
