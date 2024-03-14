// ciudad.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CiudadService } from '../../services/ciudad.service';
import { DatosPService } from '../../services/datos-pservice.service';
import { CuidadModel } from '../../models/datosPModel';
import { DatosPModel } from '../../models/datosPModel';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ciudad',
  templateUrl: './ciudad.component.html',
  styleUrls: ['./ciudad.component.css']
})
export class CiudadComponent implements OnInit {
  ciudades: CuidadModel[] = [];
  paises: DatosPModel[] = [];
  datosPaises: DatosPModel[] = [];
  ciudadForm: FormGroup;
  editingCiudadId: string | null = null; // Inicializado como null

  constructor(
    private ciudadService: CiudadService,
    private paisService: DatosPService,
    private fb: FormBuilder,
    private toastrService:ToastrService
  ) {
    this.ciudadForm = this.fb.group({
      _id: [null], // Cambiado de '""' a 'null'
      nombre: ['', Validators.required],
      pais: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.cargarCiudades();
    this.cargarPaises();
  }

  cargarCiudades() {
    this.ciudadService.getDatosP().subscribe(
      data => {
        this.ciudades = data;
        console.log('Ciudades cargadas:', this.ciudades);
      },
      error => {
        console.error('Error al cargar ciudades:', error);
      }
    );
  }

  cargarPaises() {
    this.paisService.getDatosP().subscribe(
      data => {
        this.datosPaises = data; // Actualizar la propiedad datosPaises
        console.log('Datos de países cargados:', this.datosPaises);
      },
      error => {
        console.error('Error al cargar datos de países:', error);
      }
    );
  }

  crearCiudad(event: Event) {
    event.preventDefault();
  
    if (this.ciudadForm.valid) {
      const nuevaCiudad: CuidadModel = {
        nombre: this.ciudadForm.value.nombre,
        pais: this.ciudadForm.value.pais,
      };
  
      this.ciudadService.addDatosP(nuevaCiudad).subscribe(
        data => {
          console.log('Ciudad creada:', data);
          this.ciudadForm.reset();
          this.cargarCiudades();
          this.toastrService.success(`Cuidad guardada con exito!`,'Aviso') //notificación
        },
        error => {
          console.error('Error al crear ciudad:', error);
          this.toastrService.error(`No se guardo correctamente la Cuidad`,'Error')
        }
      );
    } else {
      console.error('Formulario no válido. Por favor, complete todos los campos requeridos.');
      this.toastrService.warning(`Formulario no válido. Por favor, complete todos los campos requeridos`,'Advertencia');
    }
  }

  seleccionarCiudad() {
    // Aquí puedes agregar la lógica que deseas al seleccionar una ciudad
    console.log('Ciudad seleccionada');
  }
  cargarDatosP() {
    this.paisService.getDatosP().subscribe(
      data => {
        this.datosPaises = data;
        console.log('Datos cargados:', this.datosPaises);
      },
      error => {
        console.error('Error al cargar datos:', error);
      }
    );
  }
  eliminarCiudad(id: string | undefined) {
    if (id) {
      this.ciudadService.deleteDatosP(id).subscribe(
        data => {
          console.log('Ciudad eliminada:', data);
          this.cargarCiudades();
          this.toastrService.success(`¡Cuidad eliminada con exito!`,'Aviso')
        },
        error => {
          console.error('Error al eliminar ciudad:', error);
          this.toastrService.error(`¡Atención! No se eliminó correctamente`, 'Error');
        }
      );
    }
  }

  editarCiudad(ciudad: DatosPModel) {
    this.ciudadForm.patchValue(ciudad);
  }
  
  actualizarCiudad() {
    if (this.ciudadForm.valid) {
      this.ciudadService.updateDatosP(this.ciudadForm.value).subscribe(
        () => {
          this.cargarCiudades();
          this.ciudadForm.reset();
          this.toastrService.success(`¡Cuidad actualizada con exito!`,'Aviso')
        },
        error => {
          console.error('Error al actualizar país:', error);
          this.toastrService.warning(`¡Atención! No se actualizo correctamente`, 'Advertencia');
        }
      );
    }
  }
}
