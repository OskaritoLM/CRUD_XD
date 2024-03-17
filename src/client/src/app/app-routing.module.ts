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
    path : 'home',
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
    path: 'home/reserva',
    component: ReservaComponent
  },
  {
    path: 'user/promociones',
    component: PromocionesComponent
  },
  

]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }