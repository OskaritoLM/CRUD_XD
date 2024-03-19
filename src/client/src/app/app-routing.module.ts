import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutosComponent } from './components/autos/autos.component';
import { CiudadComponent } from './components/ciudad/ciudad.component';
import { EstadoComponent } from './components/estado/estado.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { HomeUserComponent } from './components/home-user/home-user.component';
import { PaisComponent } from './components/pais/pais.component';
import { ReservaComponent } from './components/reserva/reserva.component';
import { PromocionesComponent } from './components/promociones/promociones.component';
import { HistorialComponent } from './components/historial/historial.component';

import { EmpresaComponent } from './components/empresa/empresa.component';
import { AutosAdminComponent } from './components/autos-admin/autos-admin.component';
import { LugarComponent } from './components/lugar-admun/lugar-admun.component';




const routes: Routes = [
{
    path : '',
    redirectTo : '/home',
    pathMatch : 'full'
  },
  {
    path : 'home',
    component : HomeAdminComponent
  },
  {
    path : 'user',
    component : HomeUserComponent
  },
  {
    path : 'estado',
    component : CiudadComponent
  },
  {
    path : 'pais',
    component : PaisComponent
  },
  {

    path : 'ciudad',
    component : EstadoComponent
  },
  {
    path:'user/autos',

    component: AutosComponent
  },
  {
    path: 'user/reserva',
    component: ReservaComponent
  },
  {
    path: 'user/promociones',
    component: PromocionesComponent
  },
  {
    path: 'user/historial',
    component: HistorialComponent
  },

  {
    path: 'user/empresa',
    component: EmpresaComponent
  },
  
  {
    path: 'autos-admin',
    component: AutosAdminComponent
  },
  
  {
    path: 'lugar-admin',
    component: LugarComponent
  }


]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }