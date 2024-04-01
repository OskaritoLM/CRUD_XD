import { Component, OnInit} from '@angular/core';
import { EnviaDatosService } from 'src/app/services/enviadatos.service';
import { ReservaModel } from 'src/app/models/datosPModel';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-mensaje',
  templateUrl: './mensaje.component.html',
  styleUrls: ['./mensaje.component.css']
})
export class MensajeComponent {

  reservaForm: FormGroup;
  reservaComp$ = this.enviaDatosService.reservaCompleta$;

  constructor(private fb: FormBuilder,private enviaDatosService: EnviaDatosService) { 
    this.reservaForm = this.fb.group({
      cliente: [''], 
      edad: [''],
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

  ngOnInit(){
    this.reservaComp$.subscribe(reservaComp => {
      this.reservaForm.patchValue(reservaComp);
    })
  }
}
