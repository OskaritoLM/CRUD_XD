// ciudad.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CiudadService } from '../../services/ciudad.service';
import { DatosPService } from '../../services/datos-pservice.service';
import { CuidadModel } from '../../models/datosPModel';
import { DatosPModel } from '../../models/datosPModel';

@Component({
  selector: 'app-ciudad',
  templateUrl: './ciudad.component.html',
  styleUrls: ['./ciudad.component.css']
})
export class CiudadComponent implements OnInit {
  ciudades: CuidadModel[] = [];
  paises: DatosPModel[] = [];
  datosPaises: DatosPModel[] = []; // Agregar esta línea
  ciudadForm: FormGroup;

  constructor(
    private ciudadService: CiudadService,
    private paisService: DatosPService,
    private fb: FormBuilder
  ) {
    this.ciudadForm = this.fb.group({
      _id: [''],
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
        },
        error => {
          console.error('Error al crear ciudad:', error);
        }
      );
    } else {
      console.error('Formulario no válido. Por favor, complete todos los campos requeridos.');
    }
  }
  

  editarCiudad(ciudad: CuidadModel) {
    // Implement the logic for editing a city
    // You can pre-fill the form with the selected city's data
    // For example: this.ciudadForm.setValue(ciudad);
  }

  eliminarCiudad(id: string | undefined) {
    if (id) {
      this.ciudadService.deleteDatosP(id).subscribe(
        data => {
          console.log('Ciudad eliminada:', data);
          this.cargarCiudades();
        },
        error => {
          console.error('Error al eliminar ciudad:', error);
        }
      );
    }
  }
}
