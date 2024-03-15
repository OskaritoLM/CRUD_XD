// autos.component.ts
import { Component, OnInit } from '@angular/core';
import { AutosService } from 'src/app/services/autos.service';

@Component({
  selector: 'app-autos',
  templateUrl: './autos.component.html',
  styleUrls: ['./autos.component.css']
})
export class AutosComponent implements OnInit {
  autos: any[] = [];

  constructor(private autosService: AutosService) { }

  ngOnInit(): void {
    this.obtenerDatosAutos();
  }

  obtenerDatosAutos() {
    this.autosService.obtenerDatos().subscribe(
      (data: any[]) => {
        // Filtramos los datos para mostrar solo los campos necesarios
        this.autos = data.map(auto => ({
          marca: auto.marca,
          modelo: auto.modelo,
          placas: auto.placas,
          asientos: auto.asientos,
          maletas: auto.maletas,
          tipoCaja: auto.tipoCaja
        }));
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

