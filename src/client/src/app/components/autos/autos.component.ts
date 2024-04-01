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
  
  seleccionarAuto(auto: AutoModel): void {
    if (auto.cantVehiculos > 0) {
      auto.cantVehiculos--;
  
      // Llamar al servicio para actualizar la cantidad
      this.autosService.updateCantidadAuto(auto._id, auto.cantVehiculos).subscribe(
        () => {
          console.log('Cantidad de auto actualizada:', auto);
          // Notificar el cambio a través del servicio
          this.enviaDatosService.setAuto(auto);
  
          // Actualizar la lista de autos filtrados
          if (auto.cantVehiculos === 0) {
            // Si la cantidad llega a cero, eliminar el auto de la lista
            this.autosFiltrados = this.autosFiltrados.filter(a => a !== auto);
          }
        },
        error => {
          console.error('Error al actualizar cantidad de auto:', error);
          // Manejar el error de actualización, si es necesario
        }
      );
    } else {
      console.log('No hay existencias de este auto.');
      // Puedes agregar un mensaje o una notificación para informar al usuario que no hay existencias.
    }
  }
  
  
}


