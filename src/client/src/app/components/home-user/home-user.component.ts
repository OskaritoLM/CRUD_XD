import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LugarService } from 'src/app/services/lugar.service';
import { ReservasService } from 'src/app/services/reserva.service';
import { EnviaDatosService } from 'src/app/services/enviadatos.service';
import { ReservaLugarModel } from 'src/app/models/datosPModel';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { Subscriber, subscribeOn } from 'rxjs';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.css']
})
export class HomeUserComponent implements OnInit  {
  reservaForm: FormGroup;
  reserva: ReservaLugarModel[]=[];
  lugares: any[] = [];
  codigoCupon: string = 'CODIGO123';
  isAuth :boolean = false;
  constructor(
    private fb: FormBuilder,
    private lugarService: LugarService,
    private toastrService: ToastrService,
    private enviaDatosService: EnviaDatosService,
    public auth: AuthService,
    private router:Router
  ) {
    

    this.reservaForm = this.fb.group({
      lugarS: ['',Validators.required],
      fechasS: [null, [Validators.required, this.fechaActualValida()]],
      horasS: ['',Validators.required],
      lugarE: ['',Validators.required],
      fechasE: [null, [Validators.required, this.fechaActualValida()]],
      horasE: ['',Validators.required],
      //edad: ['',[Validators.required, Validators.min(21)]],
      // usarCupon: [false],
      // cupon: ['']
    });
  }
  fechaActualValida() {
    return (control: AbstractControl) => {
      const selectedDate = new Date(control.value);
      const currentDate = new Date();
  
      if (selectedDate < currentDate) {
        return { fechaInvalida: true };
      }
      return null;
    };
  }

  ngOnInit(): void {
    
    this.auth.isAuthenticated$.subscribe(isAuthenticated =>{
      if(isAuthenticated){
        this.router.navigate(['/home-admin'])
        this.isAuth = true;
        console.log(isAuthenticated)
      } else 
        {
          this.router.navigate(['/home'])
          this.isAuth = false;
          console.log(isAuthenticated)
        }
    })
    this.cargarLugares();
    this.enviaDatosService.reserva$.subscribe((reserva: ReservaLugarModel) => {
      console.log('Reserva seleccionado en el componente de reserva:', reserva);
    });
  
    
  }
  
  login () {
    this.auth.loginWithRedirect();
  }
  onSubmit() {
    if (this.reservaForm?.valid) {
      const edad = this.reservaForm.get('edad')?.value;
      if (edad < 21) {
        this.toastrService.warning('Debes tener al menos 21 años para reservar un auto.', 'Advertencia');
        return;
      }
      if (this.reservaForm.get('usarCupon')?.value) {
        const cuponIngresado = this.reservaForm.get('cupon')?.value;
        this.aplicarDescuento(cuponIngresado);
      }
    } else {
      this.toastrService.error('Por favor, complete todos los campos correctamente.', 'Error');
    }

    const reserva: ReservaLugarModel = {
      lugarS: this.reservaForm.get('lugarS')?.value,
      fechasS: this.reservaForm.get('fechasS')?.value,
      horasS: this.reservaForm.get('horasS')?.value,
      lugarE: this.reservaForm.get('lugarE')?.value,
      fechasE: this.reservaForm.get('fechasE')?.value,
      horasE: this.reservaForm.get('horasE')?.value,
    };
    this.onClick(reserva);
  }

  onClick(reserva: ReservaLugarModel): void {
    this.enviaDatosService.setReserva(reserva);
    console.log('Reserva enviada:', reserva);
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
