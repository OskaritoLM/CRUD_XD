import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Asegúrate de importar FormsModule
import { DatosPModel } from 'src/app/models/datosPModel';
import { DatosPService } from 'src/app/services/datos-pservice.service';

@Component({
  selector: 'app-datos-p',
  templateUrl: './datos-p.component.html',
  styleUrls: ['./datos-p.component.css']
})
export class DatosPComponent implements OnInit {
  
  datosP: DatosPModel[] = [];
  telefono: number = 0;
  dateNac: Date; // Se define como Date o null
  sexo: string = "";
  cp: number = 0;
  pais: string = "";
  estado: string = "";
  ciudad: string = "";
  isDone: boolean = false;


  constructor(private datosPService: DatosPService) {
    this.dateNac = new Date();
  }

  ngOnInit() {
    this.datosPService.getDatosP()
      .subscribe(datosP => {
        this.datosP = datosP;
      });
  }

  addDatosP() {
    const newDatosP: DatosPModel = {
      telefono: this.telefono,
      dateNac: new Date(this.dateNac),
      sexo: this.sexo,
      cp: this.cp,
      pais: this.pais,
      estado: this.estado,
      ciudad: this.ciudad,
      isDone: false,
      user: 0
    };

    this.datosPService.addDatosP(newDatosP).subscribe(response => {
      this.datosP.push(response); 
    });
  }
  
  deleteDatosP(id: string){
    const response = confirm('Seguro que quieres eliminar el dato?')
    if (response ) {
      const datosP= this.datosP;
      this.datosPService.deleteDatosP(id)
        .subscribe(data=>{
          if(data.n == 1){
            for(let i=0; i<datosP.length; i++){
              if (datosP[i]._id == id) { // Corregido aquí
                datosP.splice(i, 1);
                break; // Agregado para salir del bucle después de eliminar el elemento
              }
            }
          }
        });
    }
}
// deleteDatosP(id: string) {
//   const response = confirm('Seguro que quieres eliminar el dato?');
//   if (!response) {
//       return; // Si el usuario cancela la eliminación, salimos del método
//   }

//   this.datosPService.deleteDatosP(id).subscribe(() => {
//       this.datosP = this.datosP.filter(dato => dato._id !== id);
//   }, error => {
//       console.error('Error al eliminar el dato:', error);
//   });
// }

updateDatosP(updatedDatosP: DatosPModel) {
  this.datosPService.updateDatosP(updatedDatosP)
      .subscribe(updatedData => {
          // Aquí puedes manejar la respuesta de la actualización si es necesario
          console.log("Datos actualizados:", updatedData);
      });
}
}
