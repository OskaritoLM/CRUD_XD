import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ReservaModel } from 'src/app/models/datosPModel';
import { EnviaDatosService } from 'src/app/services/enviadatos.service';
import { ReservasService } from 'src/app/services/reserva.service';
import { ToastrService } from 'ngx-toastr';
import { AutoModel } from 'src/app/models/datosPModel';
@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit{

  reservaForm: FormGroup;
  nuevaReserva: ReservaModel = new ReservaModel();
  selectedAuto$ = this.enviaDatosService.selectedAuto$;
  reservaLugar$= this.enviaDatosService.reserva$;
  autoSeleccionado: AutoModel | null = null;

  // Propiedades para los archivos de licencia e identificación
   licenseFile: File | null = null;
   identificationFile: File | null = null;

  constructor(private fb: FormBuilder,private enviaDatosService: EnviaDatosService, private reservasService: ReservasService,private toastrService: ToastrService,) {
    this.reservaForm = this.fb.group({
      cliente: [''], 
      edad: ['',[Validators.required, Validators.min(21)]],
      correo: [''],
      telefono: [''],
      lugarS: [''],
      fechasS: [''],
      horasS: [''],
      lugarE: [''],
      fechasE: [''],
      horasE: [''],
      estatusR: [''],
      total: [''],
      vehiculo: [''],
      descuento: [''],
      license: [''],
      identification: ['']
    });
  }

  ngOnInit() {
    this.reservaLugar$.subscribe(reservaLugar => {
      this.reservaForm.patchValue(reservaLugar);
    });

    this.selectedAuto$.subscribe(autoSeleccionado => {
      this.reservaForm.patchValue({
        vehiculo: autoSeleccionado.modelo
      });
    });
  }

   onLicenseFileSelected(event: any) {
     this.licenseFile = event.target.files[0] as File;
   }

    onIdentificationFileSelected(event: any) {
      this.identificationFile = event.target.files[0] as File;
    }
    agregarReserva() {
      if (this.reservaForm.valid) {
        const reserva: ReservaModel = this.reservaForm.value;
        const licenseFile: File | null = this.licenseFile;
        const identificationFile: File | null = this.identificationFile; 
    
        console.log('Datos de la reserva:', reserva);
        console.log('Archivo de licencia:', licenseFile);
        console.log('Archivo de identificación:', identificationFile);
    
        this.reservasService.addReserva(reserva, licenseFile, identificationFile)
          .subscribe(
            (reserva: ReservaModel) => {
              console.log('Reserva creada:', reserva);
              // Manejar la respuesta del servidor
            },
            error => {
              console.error('Error al crear la reserva:', error);
              this.toastrService.error('Error al crear la reserva:', 'Error');
            }
          );
      } else {
        Object.keys(this.reservaForm.controls).forEach(field => {
          const control = this.reservaForm.get(field);
          if (control instanceof AbstractControl && control.errors) { 
            console.error(`Campo ${field} inválido: `, control.errors);
          }
        });
        console.error('Datos de reserva inválidos');
        this.toastrService.error('Datos de reserva inválidos','Error');
      }

      const reserva: ReservaModel = {
        _id:this.reservaForm.get('_id')?.value,
        cliente: this.reservaForm.get('cliente')?.value,
        edad: this.reservaForm.get('edad')?.value,
        correo: this.reservaForm.get('correo')?.value,
        telefono: this.reservaForm.get('telefono')?.value,
        lugarS: this.reservaForm.get('lugarS')?.value,
        fechasS: this.reservaForm.get('fechasS')?.value,
        horasS: this.reservaForm.get('horasS')?.value,
        lugarE: this.reservaForm.get('lugarE')?.value,
        fechasE: this.reservaForm.get('fechasE')?.value,
        horasE: this.reservaForm.get('horasE')?.value,
        estatusR: this.reservaForm.get('estatusR')?.value,
        total: this.reservaForm.get('total')?.value,
        vehiculo: this.reservaForm.get('vehiculo')?.value,
        descuento: this.reservaForm.get('descuento')?.value,
        license: this.reservaForm.get('license')?.value,
        identification: this.reservaForm.get('identification')?.value,
      };
      this.onClick(reserva);
    }

    onClick(reserva: ReservaModel): void {
      this.enviaDatosService.setReservaCompleta(reserva);
      console.log('Reserva enviada:', reserva);
    }
    
    calcularTotal() {
      const reservaForm = this.reservaForm;
  
      // Verifica si reservaForm es nulo o indefinido
      if (reservaForm) {
          const fechaInicioValue = reservaForm.get('fechasS')?.value;
          const fechaFinValue = reservaForm.get('fechasE')?.value;
  
          // Verifica si las fechas son nulas o no
          if (fechaInicioValue && fechaFinValue) {
              const fechaInicio = new Date(fechaInicioValue);
              const fechaFin = new Date(fechaFinValue);
              const diasDiferencia = Math.ceil((fechaFin.getTime() - fechaInicio.getTime()) / (1000 * 3600 * 24));
              const precioPorDia = this.getPrecioPorDia(); // Método para obtener el precio por día del vehículo seleccionado
              const descuento = reservaForm.get('descuento')?.value || 0; // Si no hay descuento, se asume 0
  
              const total = precioPorDia * diasDiferencia * (1 - descuento / 100);
              reservaForm.get('total')?.setValue(total);
              console.log('Precio por día:', precioPorDia);
              console.log(total)
          } else {
              console.error('Una de las fechas es nula');
              this.toastrService.error('Una de las fechas es nula','Error');
          }
      } else {
          console.error('reservaForm es nulo');
          this.toastrService.error('Error en el formulario','Error');
      }
  }
  
  
    // Método para obtener el precio por día del vehículo seleccionado
    getPrecioPorDia(): number {
      let precioDia = 0;
      if (this.autoSeleccionado && this.autoSeleccionado.precioDia) {
        precioDia = this.autoSeleccionado.precioDia;
    }

    return precioDia;
    }
  
  
}

  
  
