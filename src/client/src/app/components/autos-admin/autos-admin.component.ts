import { Component, OnInit } from '@angular/core';
import { AutosService } from 'src/app/services/autos.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutoModel } from '../../models/datosPModel';

@Component({
  selector: 'app-autos-admin',
  templateUrl: './autos-admin.component.html',
  styleUrls: ['./autos-admin.component.css']
})
export class AutosAdminComponent implements OnInit {
  autoForm: FormGroup; // Definir FormGroup
  auto: AutoModel[] = [];
  autosFiltrados: AutoModel[] = [];
  filterpost: string = '';
  constructor(
    private autosService: AutosService,
    private fb: FormBuilder,
    private toastrService: ToastrService
  ) {
    this.autoForm = this.fb.group({
      _id: [null], // Cambiado de '""' a 'null'
      imagen: ['', Validators.required],
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      placas: ['', Validators.required],
      asientos: ['', Validators.required],
      maletas: ['', Validators.required],
      tipoCaja: ['', Validators.required],
      tipoVehiculo: ['', Validators.required],
      cantVehiculos: ['', Validators.required],
      categoria: ['', Validators.required],
      precioDia: ['', Validators.required],
      anio: [null, Validators.required], // Agregar control para el año
    });
    
  }

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

  filtrarPorCategoria(event: any) {
    const categoria = event.target.value;
    if (categoria === 'todo') {
        // Mostrar todos los autos sin filtrar
        this.autosFiltrados = this.auto;
    } else {
        // Filtrar por la categoría seleccionada
        this.autosFiltrados = this.auto.filter(auto => auto.categoria === categoria);
    }
  }

  agregarAuto() {
    if (this.autoForm.valid) {
      this.autosService.addAuto(this.autoForm.value).subscribe(
        (data) => {
          this.toastrService.success('Auto agregado correctamente', 'Éxito');
          this.obtenerDatosAutos(); // Recargar la lista de autos después de agregar uno nuevo
          this.autoForm.reset(); // Reiniciar el formulario
        },
        (error) => {
          this.toastrService.error('Error al agregar el auto', 'Error');
          console.error('Error al agregar el auto:', error);
        }
      );
    }
  }

  eliminarAuto(id: string) {

      this.autosService.deleteAuto(id).subscribe(
        () => {
          this.toastrService.success('Auto eliminado correctamente', 'Éxito');
          this.obtenerDatosAutos(); // Recargar la lista de autos después de eliminar uno
        },
        (error) => {
          this.toastrService.error('Error al eliminar el auto', 'Error');
          console.error('Error al eliminar el auto:', error);
        }
      );
    
  }
  
  editarCiudad(auto: AutoModel) {
    this.autoForm.patchValue(auto);
    console.log(auto)
  }

  actualizarAuto() {
    
      this.autosService.updateAuto(this.autoForm.value).subscribe(
        () => {
          this.toastrService.success('Auto actualizado correctamente', 'Éxito');
          this.obtenerDatosAutos(); 
          this.autoForm.reset();
        },
        (error) => {
          this.toastrService.error('Error al actualizar el auto', 'Error');
          console.error('Error al actualizar el auto:', error);
        }
      );
    
  }
}
