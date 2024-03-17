import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { ReservasService } from 'src/app/services/reserva.service';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.css']
})
export class HomeUserComponent {
  reservaForm: FormGroup;

  constructor(private reservasService: ReservasService, private fb: FormBuilder) {
    this.reservaForm = this.fb.group({
      lugarSalida: [''],
      fechaSalida: [''],
      horaSalida: [''],
      fechaEntrega: [''],
      horaEntrega: [''],
      edad: [''],
      usarCupon: [false],
      cupon: ['']
    });
  }
  onSubmit() {
    if (this.reservaForm.valid) {
      console.log('Formulario enviado');
      console.log(this.reservaForm.value); // Puedes acceder a los valores del formulario aquí
    } else {
      console.error('El formulario no es válido');
    }
  }
}
