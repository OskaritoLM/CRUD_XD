import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CiudadComponent } from './components/ciudad/ciudad.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { PaisComponent } from './components/pais/pais.component';

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
    path : 'ciudad',
    component : CiudadComponent
  },
  {
    path : 'pais',
    component : PaisComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
