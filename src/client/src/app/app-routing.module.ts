import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutosComponent } from './components/autos/autos.component';
import { PaisComponent } from './components/pais/pais.component';
import { ReservaComponent } from './components/reserva/reserva.component';
import { CiudadComponent } from './components/ciudad/ciudad.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { HomeUserComponent } from './components/home-user/home-user.component';

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
    path : 'ciudad',
    component : CiudadComponent
  },
  {
    path : 'pais',
    component : PaisComponent
  },
  {
    path:'home/autos',
    component: AutosComponent
  },
  {
    path: 'home/reserva',
    component: ReservaComponent
  },
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }