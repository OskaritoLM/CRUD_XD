// estado.component.ts
import { Component, OnInit } from '@angular/core';
import { CuidadModel, DatosPModel, EstadoModel } from '../../models/datosPModel';
import { CiudadService } from '../../services/estado.service';
import { DatosPService } from '../../services/datos-pservice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EstadoService } from '../../services/ciudad.service';
@Component({
  selector: 'app-estado',
  templateUrl: './estado.component.html',
  styleUrls: ['./estado.component.css']
})
export class EstadoComponent implements OnInit {
  estados: EstadoModel[] = []; // Cambia el tipo de datos aquí
  paises: DatosPModel[] = [];
  datosPaises: DatosPModel[] = [];
  ciudades: CuidadModel[] = [];
  datosCiudad: DatosPModel[] = [];
  estadoForm: FormGroup;
  editingEstadoId: string | null = null; // Inicializado como null

  constructor(
    private estadoService: CiudadService,
    private fb: FormBuilder,
    private estadoService1: EstadoService,
    private paisService: DatosPService,
    private toastrService: ToastrService
  ) {
    this.estadoForm = this.fb.group({
      _id: [null],
      nombre: ['', Validators.required],
      pais: ['', Validators.required], // Add form control for 'pais'
      estado: ['', Validators.required] // Add form control for 'ciudad'
    });
  }
  

  ngOnInit() {
    this.cargarEstados();
    this.cargarPaises();
    this.cargarCiudades();
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

  cargarCiudades() {
    this.estadoService1.getDatosP().subscribe(
      data => {
        this.ciudades = data;
        console.log('Ciudades cargadas:', this.ciudades);
      },
      error => {
        console.error('Error al cargar ciudades:', error);
      }
    );
  }



  cargarEstados() {
    this.estadoService.getEstados().subscribe(
      data => {
        this.estados = data;
        console.log('Estados cargados:', this.estados);
      },
      error => {
        console.error('Error al cargar estados:', error);
      }
    );
  }

  crearEstado(event: Event) {
    event.preventDefault();

    if (this.estadoForm.valid) {
      const nuevoEstado: EstadoModel = {
        nombre: this.estadoForm.value.nombre,
        pais: this.estadoForm.value.pais,
        estado: this.estadoForm.value.estado,
      };

      this.estadoService.addEstado(nuevoEstado).subscribe(
        data => {
          console.log('Estado creado:', data);
          this.estadoForm.reset();
          this.cargarEstados();
          this.toastrService.success('Estado creado correctamente', 'Aviso');
        },
        error => {
          console.error('Error al crear estado:', error);
          this.toastrService.error('Error al crear el estado', 'Error');
        }
      );
    } else {
      console.error('Formulario no válido. Por favor, complete todos los campos requeridos.');
      this.toastrService.warning('Formulario no válido. Por favor, complete todos los campos requeridos.', 'Advertencia');
    }
  }

  eliminarEstado(id: string | undefined) {
    if (id) {
      this.estadoService.deleteEstado(id).subscribe(
        data => {
          console.log('Estado eliminado:', data);
          this.cargarEstados();
          this.toastrService.success('Estado eliminado correctamente', 'Aviso');
        },
        error => {
          console.error('Error al eliminar estado:', error);
          this.toastrService.error('Error al eliminar el estado', 'Error');
        }
      );
    }
  }

  editarEstado( estado: EstadoModel) {
    this.estadoForm.patchValue(estado);
    console.log(estado)
  }

  actualizarEstado() {
    if (this.estadoForm.valid) {
      this.estadoService.updateEstado(this.estadoForm.value).subscribe(
        () => {
          this.cargarEstados();
          this.estadoForm.reset();
          this.toastrService.success('Estado actualizado correctamente', 'Aviso');
        },
        error => {
          console.error('Error al actualizar estado:', error);
          this.toastrService.error('Error al actualizar el estado', 'Error');
        }
      );
    }
  }
}
