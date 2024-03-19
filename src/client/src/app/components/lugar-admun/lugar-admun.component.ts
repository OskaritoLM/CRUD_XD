import { Component, OnInit } from '@angular/core';
import { CuidadModel, DatosPModel, EstadoModel, LugarModel } from '../../models/datosPModel';
import { DatosPService } from '../../services/datos-pservice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LugarService } from '../../services/lugar.service';
import { EstadoService } from 'src/app/services/ciudad.service';
import { CiudadService } from 'src/app/services/estado.service';

@Component({
  selector: 'app-lugar-admun',
  templateUrl: './lugar-admun.component.html',
  styleUrls: ['./lugar-admun.component.css']
})

export class LugarComponent implements OnInit {
  lugares: LugarModel[] = [];
  paises: DatosPModel[] = [];
  datosPaises: DatosPModel[] = [];
  ciudades: CuidadModel[] = [];
  lugarForm: FormGroup;
  estados: EstadoModel[] = []; 
  editingLugarId: string | null = null;
// Crea un FormGroup
  constructor(
    private lugarService: LugarService,
    private estadoService: CiudadService,
    private fb: FormBuilder,
    private datosPService: DatosPService,
    private estadoService1: EstadoService,
    private toastrService: ToastrService,
    

  ) {
    this.lugarForm = this.fb.group({
      _id: [null],
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      pais: ['', Validators.required],
      ciudad: ['', Validators.required],
      Estado: ['', Validators.required] // Asegúrate de tener este control definido en el FormGroup
    });
    
  }

  ngOnInit(): void {
    this.cargarLugares();
    this.cargarPaises();
    this.cargarCiudades('');
    this.cargarEstados(''); // Carga los estados
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

  cargarPaises(): void {
    this.datosPService.getDatosP().subscribe(
      data => {
        this.datosPaises = data;
        console.log('Datos de países cargados:', this.datosPaises);
      },
      error => {
        console.error('Error al cargar datos de países:', error);
      }
    );
  }


  filtrarEstadosPorPais(event: any) {
    const nombrePais = event.target.value;
    if (nombrePais) {
      // Filtrar los estados según el país seleccionado
      this.ciudades = this.ciudades.filter(ciudades => ciudades.pais === nombrePais);
      // Cargar las ciudades correspondientes al país seleccionado
      this.cargarCiudades(nombrePais);
    } else {
      // Si no se selecciona ningún país, cargar todos los estados y todas las ciudades

      this.cargarCiudades('');
    }
  }

  filtrarEstadosPorEstado(event: any) {
    // No necesitas realizar ningún filtrado aquí, ya que los estados ya se han cargado previamente
  }
  

  filtrarEstadosPorCiudad(event: any) {
    const nombreCiudad = event.target.value;
    if (nombreCiudad) {
      // Filtrar los estados según la ciudad seleccionada
      this.cargarEstados(nombreCiudad);
      // Actualizar la lista de ciudades
      this.ciudades = this.ciudades.filter(ciudad => ciudad.nombre === nombreCiudad);
    } else {
      // Si no se selecciona ninguna ciudad, cargar todos los estados
      this.cargarEstados('');
    }
  }
  
  

  
  
  cargarCiudades(paisSeleccionado: string) {
    if (paisSeleccionado) {
      // Obtener las ciudades del país seleccionado
      this.estadoService1.getDatosP().subscribe(
        data => {
          // Filtrar las ciudades según el país seleccionado
          this.ciudades = data.filter(ciudad => ciudad.pais === paisSeleccionado);
          console.log('Ciudades cargadas para', paisSeleccionado + ':', this.ciudades);
        },
        error => {
          console.error('Error al cargar ciudades:', error);
        }
      );
    } else {
      // Si no se selecciona ningún país, cargar todas las ciudades
      this.estadoService1.getDatosP().subscribe(
        data => {
          this.ciudades = data;
          console.log('Todas las ciudades cargadas:', this.ciudades);
        },
        error => {
          console.error('Error al cargar ciudades:', error);
        }
      );
    }
  }
  
  cargarEstados(nombreCiudad: string) {
    if (nombreCiudad) {
      // Obtener los estados de la ciudad seleccionada
      this.estadoService.getEstados().subscribe(
        data => {
          // Filtrar los estados según la ciudad seleccionada
          this.estados = data.filter(estado => estado.estado === nombreCiudad);
        },
        error => {
          console.error('Error al cargar estados por ciudad:', error);
        }
      );
    } else {
      // Si no se proporciona ninguna ciudad, cargar todos los estados
      this.estadoService.getEstados().subscribe(
        data => {
          this.estados = data;
          console.log('Estados cargados:', this.estados);
        },
        error => {
          console.error('Error al cargar estados:', error);
        }
      );
    }
  }
  






  crearLugar(event: Event): void {
    event.preventDefault();

    if (this.lugarForm.valid) {
      const nuevoLugar: LugarModel = {
        nombre: this.lugarForm.value.nombre,
        direccion: this.lugarForm.value.direccion,
        pais: this.lugarForm.value.pais,
        ciudad: this.lugarForm.value.ciudad,
        Estado: this.lugarForm.value.Estado
      };

      this.lugarService.addLugar(nuevoLugar).subscribe(
        data => {
          console.log('Lugar creado:', data);
          this.lugarForm.reset();
          this.cargarLugares();
          this.toastrService.success('Lugar creado correctamente', 'Aviso');
        },
        error => {
          console.error('Error al crear lugar:', error);
          this.toastrService.error('Error al crear el lugar', 'Error');
        }
      );
    } else {
      console.error('Formulario no válido. Por favor, complete todos los campos requeridos.');
      this.toastrService.warning('Formulario no válido. Por favor, complete todos los campos requeridos.', 'Advertencia');
    }
  }

  eliminarLugar(id: string | undefined): void {
    if (id) {
      this.lugarService.deleteLugar(id).subscribe(
        data => {
          console.log('Lugar eliminado:', data);
          this.cargarLugares();
          this.toastrService.success('Lugar eliminado correctamente', 'Aviso');
        },
        error => {
          console.error('Error al eliminar lugar:', error);
          this.toastrService.error('Error al eliminar el lugar', 'Error');
        }
      );
    }
  }

  editarLugar(lugar: LugarModel): void {
    this.lugarForm.patchValue(lugar);
    console.log(lugar);
  }

  actualizarLugar(): void {
    if (this.lugarForm.valid) {
      this.lugarService.updateLugar(this.lugarForm.value).subscribe(
        () => {
          this.cargarLugares();
          this.lugarForm.reset();
          this.toastrService.success('Lugar actualizado correctamente', 'Aviso');
        },
        error => {
          console.error('Error al actualizar lugar:', error);
          this.toastrService.error('Error al actualizar el lugar', 'Error');
        }
      );
    }
  }
}
