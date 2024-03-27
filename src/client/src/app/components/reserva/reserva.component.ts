import { Component, OnInit } from '@angular/core';
import { ReservaLugarModel } from 'src/app/models/datosPModel';
import { EnviaDatosService } from 'src/app/services/enviadatos.service';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit{

  reservas: ReservaLugarModel[]=[];
  selectedAuto$ = this.enviaDatosService.selectedAuto$;
  reservaLugar$= this.enviaDatosService.reserva$;

  constructor(private enviaDatosService: EnviaDatosService) {}

  ngOnInit() {
  }
}
