// ciudad.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatosPService } from '../../services/datos-pservice.service';
import { DatosPModel } from '../../models/datosPModel';

@Component({
  selector: 'app-ciudad',
  templateUrl: './ciudad.component.html',
  styleUrls: ['./ciudad.component.css']
})
export class CiudadComponent implements OnInit {
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
        console.log('Datos de países cargados:', this.datosPaises);
      },
      error => {
        console.error('Error al cargar datos de países:', error);
      }
    );
  }
}
