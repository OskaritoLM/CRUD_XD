import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatosPService } from '../../services/datos-pservice.service';
import { DatosPModel } from '../../models/datosPModel';

@Component({
  selector: 'app-pais',
  templateUrl: './pais.component.html',
  styleUrls: ['./pais.component.css']
})
export class PaisComponent implements OnInit {
  datosPaises: DatosPModel[] = [];
  paisForm: FormGroup;

  constructor(private paisService: DatosPService, private fb: FormBuilder) {
    this.paisForm = this.fb.group({
      _id: [''],
      nombre: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.cargarDatosP();
  }

  cargarDatosP() {
    this.paisService.getDatosP().subscribe(
      data => {
        this.datosPaises = data;
      },
      error => {
        console.error('Error al cargar datos de países:', error);
      }
    );
  }

  agregarPais() {
    if (this.paisForm.valid) {
      this.paisService.addDatosP(this.paisForm.value).subscribe(
        () => {
          this.cargarDatosP();
          this.paisForm.reset();
        },
        error => {
          console.error('Error al agregar país:', error);
        }
      );
    }
  }

  actualizarPais() {
    if (this.paisForm.valid) {
      this.paisService.updateDatosP(this.paisForm.value).subscribe(
        () => {
          this.cargarDatosP();
          this.paisForm.reset();
        },
        error => {
          console.error('Error al actualizar país:', error);
        }
      );
    }
  }

  eliminarPais(id: string) {
    this.paisService.deleteDatosP(id).subscribe(
      () => {
        this.datosPaises = this.datosPaises.filter(pais => pais._id !== id);
      },
      error => {
        console.error('Error al eliminar país:', error);
      }
    );
  }

  editarPais(pais: DatosPModel) {
    this.paisForm.patchValue(pais);
  }
}
