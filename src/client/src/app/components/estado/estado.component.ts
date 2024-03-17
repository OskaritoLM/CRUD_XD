// estado.component.ts
import { Component, OnInit } from '@angular/core';
import { CuidadModel, DatosPModel, EstadoModel } from '../../models/datosPModel';
import { EstadoService } from '../../services/estado.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-estado',
  templateUrl: './estado.component.html',
  styleUrls: ['./estado.component.css']
})
export class EstadoComponent implements OnInit {
  estados: EstadoModel[] = [];
  paises: DatosPModel[] = [];
  datosPaises: DatosPModel[] = [];
  ciudades: CuidadModel[] = [];
  datosCiudad: DatosPModel[] = [];
  estadoForm: FormGroup;
  editingEstadoId: string | null = null; // Inicializado como null

  constructor(
    private estadoService: EstadoService,
    private fb: FormBuilder,
    private toastrService: ToastrService
  ) {
    this.estadoForm = this.fb.group({
      _id: [null],
      nombre: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.cargarEstados();
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
        ciudad: this.estadoForm.value.pais,
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

  editarEstado(estado: EstadoModel) {
    this.estadoForm.patchValue(estado);
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
