import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LugarService } from 'src/app/services/lugar.service';
import { ReservasService } from 'src/app/services/reserva.service';
import { EnviaDatosService } from 'src/app/services/enviadatos.service';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.css']
})
export class HomeUserComponent implements OnInit  {
  reservaForm: FormGroup;
  lugares: any[] = [];
  codigoCupon: string = 'CODIGO123';

  constructor(
    private reservasService: ReservasService,
    private fb: FormBuilder,
    private lugarService: LugarService,
    private toastrService: ToastrService,
    private enviaDatosService: EnviaDatosService
  ) {
    this.reservaForm = this.fb.group({
      lugarSalida: [''],
      fechaSalida: [''],
      horaSalida: [''],
      fechaEntrega: [''],
      horaEntrega: [''],
      edad: ['',[Validators.required, Validators.min(21)]],
      usarCupon: [false],
      cupon: ['']
    });
  }
  onSubmit() {
    if (this.reservaForm?.valid) {
      const edad = this.reservaForm.get('edad')?.value;
      if (edad < 21) {
        this.toastrService.warning('Debes tener al menos 21 años para reservar un auto.', 'Advertencia');
        return; 
      }
      // Envia el formulario al servicio
      this.enviaDatosService.sendFormData(this.reservaForm.value);

      if (this.reservaForm.get('usarCupon')?.value) {
        const cuponIngresado = this.reservaForm.get('cupon')?.value; 
        this.aplicarDescuento(cuponIngresado);
    }
    
  
    } else {
      this.toastrService.error('Por favor, complete todos los campos correctamente.', 'Error');
    }
  }
  

  ngOnInit(): void {
    this.cargarLugares();
  }
  aplicarDescuento(cuponIngresado: string): void {
    let descuentoAplicado: number = 0;
  
    switch (cuponIngresado) {
      case 'FELI123':
        descuentoAplicado = 20;
        break;
      case 'TORR147':
        descuentoAplicado = 10;
        break;
      case 'EQUI789':
        descuentoAplicado = 5;
        break;
      default:
        this.toastrService.error('El código de cupón ingresado no es válido.', 'Error');
        return;
    }

    // Aquí puedes aplicar el descuento al formulario o realizar alguna acción adicional
    // Por ejemplo, podrías mostrar un mensaje de éxito con el descuento aplicado
    this.toastrService.success(`Se aplicó un descuento del ${descuentoAplicado}%`, 'Descuento Aplicado');
}


  cargarLugares(): void {
    this.lugarService.getLugars().subscribe(
      data => {
        this.lugares = data;
        console.log('Lugares cargados:', this.lugares);
      },
      error => {
        console.error('Error al cargar lugares:', error);
      }
    );
  }
}
