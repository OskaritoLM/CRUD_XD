import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ReservaModel } from 'src/app/models/datosPModel';
import { EnviaDatosService } from 'src/app/services/enviadatos.service';
import { ReservasService } from 'src/app/services/reserva.service';
import { ToastrService } from 'ngx-toastr';
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

  // Propiedades para los archivos de licencia e identificación
   licenseFile: File | null = null;
   identificationFile: File | null = null;

  constructor(private fb: FormBuilder,private enviaDatosService: EnviaDatosService, private reservasService: ReservasService,private toastrService: ToastrService,) {
    this.reservaForm = this.fb.group({
      cliente: [''], 
      //edad: ['',[Validators.required, Validators.min(21)]],
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
    }
    
  
  
}

  
  
