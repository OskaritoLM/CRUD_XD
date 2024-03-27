import { Component, OnInit } from '@angular/core';
import { AutosService } from 'src/app/services/autos.service';
import { AutoModel } from '../../models/datosPModel';
import { LugarService } from 'src/app/services/lugar.service';
import { EnviaDatosService } from 'src/app/services/enviadatos.service';

@Component({
  selector: 'app-autos',
  templateUrl: './autos.component.html',
  styleUrls: ['./autos.component.css']
})


export class AutosComponent implements OnInit {
  auto: AutoModel[] = [];
  autosFiltrados: AutoModel[] = [];
  lugares: any[] = [];

  constructor(
      private autosService: AutosService,
      private lugarService:LugarService,
      private enviaDatosService: EnviaDatosService) {
}

  ngOnInit(): void {
    this.obtenerDatosAutos();
    this.cargarLugares();
    this.enviaDatosService.selectedAuto$.subscribe((auto: AutoModel) => {
      console.log('Auto seleccionado en el componente de reserva:', auto);
    });
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
  seleccionarAuto(auto: AutoModel) :void{
    this.enviaDatosService.setAuto(auto);
    console.log('Auto seleccionado:', auto);
  }
}


