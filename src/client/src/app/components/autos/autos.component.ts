// autos.component.ts
import { Component, OnInit } from '@angular/core';
import { AutosService } from 'src/app/services/autos.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutoModel, ReservaModel } from '../../models/datosPModel';
import { LugarService } from 'src/app/services/lugar.service';
import { ReservasService } from '../../services/reserva.service';


@Component({
  selector: 'app-autos',
  templateUrl: './autos.component.html',
  styleUrls: ['./autos.component.css']
})
export class AutosComponent implements OnInit {
  auto: AutoModel[] = [];
  autosFiltrados: AutoModel[] = [];
  lugares: any[] = [];
  reservaForm: FormGroup;

  constructor(private autosService: AutosService,
     private toastrService:ToastrService,
      private lugarService:LugarService,
      private fb: FormBuilder,
      private reservasService: ReservasService) { { 
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
}

  ngOnInit(): void {
    this.obtenerDatosAutos();
    this.cargarLugares();
  }

  obtenerDatosAutos() {
    this.autosService.getAutos().subscribe(
      data => {
        this.auto = data;
        this.autosFiltrados = [...this.auto];
      },
      error => {
        console.error('Error al cargar datos de autos:', error);
      }
    );
  }
  filtrarPorCategoria(categoria: string) {
    this.autosFiltrados = this.auto.filter(auto => auto.categoria === categoria);
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

  onSubmit() {
    if (this.reservaForm?.valid) {
      const edad = this.reservaForm.get('edad')?.value;
      if (edad < 21) {
        this.toastrService.warning('Debes tener al menos 21 años para reservar un auto.', 'Advertencia');
        return; 
      }
  
    } else {
      this.toastrService.error('Por favor, complete todos los campos correctamente.', 'Error');
    }
  }

  agregarReserva() {
    if (this.reservaForm.valid) {
      const reserva: ReservaModel = {
        cliente: this.reservaForm.value.cliente,
        correo: this.reservaForm.value.correo,
        telefono: this.reservaForm.value.telefono,
        lugarS: this.reservaForm.value.lugarS,
        fechasS: this.reservaForm.value.fechasS,
        horasS: this.reservaForm.value.horasS,
        fechasE: this.reservaForm.value.fechaE,
        horasE: this.reservaForm.value.horaE,
        lugarE: this.reservaForm.value.lugarE,
        estatusR: this.reservaForm.value.estatusR,
        total: this.reservaForm.value.total,
        vehiculo: this.reservaForm.value.vehiculo,
        cupon: this.reservaForm.value.cupon
      };

      this.reservasService.addReserva(reserva).subscribe(
        () => {
          this.toastrService.success('Reserva agregada exitosamente.', 'Éxito');
          // Puedes realizar cualquier acción adicional aquí, como limpiar el formulario
          this.reservaForm.reset();
        },
        error => {
          console.error('Error al agregar reserva:', error);
          this.toastrService.error('Hubo un error al agregar la reserva. Por favor, inténtalo de nuevo más tarde.', 'Error');
        }
      );
    } else {
      this.toastrService.error('Por favor, complete todos los campos correctamente.', 'Error');
    }
  }
}


