import { Component, OnInit } from '@angular/core';
import { DatosPService } from '../../services/datos-pservice.service';
import { DatosPModel } from '../../models/datosPModel';

@Component({
  selector: 'app-pais',
  templateUrl: './pais.component.html',
  styleUrls: ['./pais.component.css']
})
export class PaisComponent implements OnInit {
  datosPaises: DatosPModel[] = [];

  constructor(private paisService: DatosPService) { }

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
}
