// autos.component.ts
import { Component, OnInit } from '@angular/core';
import { AutosService } from 'src/app/services/autos.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutoModel } from '../../models/datosPModel';


@Component({
  selector: 'app-autos',
  templateUrl: './autos.component.html',
  styleUrls: ['./autos.component.css']
})
export class AutosComponent implements OnInit {
  auto: AutoModel[] = [];
  autosFiltrados: AutoModel[] = [];

  constructor(private autosService: AutosService,private fb: FormBuilder, private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.obtenerDatosAutos();
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

  // agregarPais() {
  //   if (this.autos.valid) {
  //     this.autosService.addAuto(this.paisForm.value).subscribe(
  //       () => {
  //         this.toastrService.success(`Pais agregado con exito!`,'Aviso') 
  //         this.obtenerDatosAutos();
  //         this.paisForm.reset();
  //       },
  //       error => {
  //         console.error('Error al agregar país:', error);
  //         this.toastrService.error('Error al agregar país', 'Error');

  //       }
  //     );
  //   }
  // }

  // actualizarPais() {
  //   if (this.autos.valid) {
  //     this.autosService.updateAuto(this.paisForm.value).subscribe(
  //       () => {
  //         this.toastrService.success(`País Actualizado con exito!`,'Aviso') 
  //         this.obtenerDatosAutos();
  //         this.paisForm.reset();
  //       },
  //       error => {
  //         console.error('Error al actualizar país:', error);
  //         this.toastrService.error('Error al actualizar país', 'Error');
  //       }
  //     );
  //   }
  // }

  // eliminarPais(id: string) {
  //   this.autosService.deleteAuto(id).subscribe(
  //     () => {
  //       this.autos = this.autos.filter(auto => auto._id !== id);
  //       this.toastrService.success(`País eliminado con exito!`,'Aviso')
  //     },
  //     error => {
  //       console.error('Error al eliminar país:', error);
  //       this.toastrService.error('Error al eliminar país', 'Error');
  //     }
  //   );
  // }

  // editarPais(pais: DatosPModel) {
  //   this.paisForm.patchValue(pais);
  // }
}


