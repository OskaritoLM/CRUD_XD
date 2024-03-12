import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaisComponent } from './components/pais/pais.component';

const routes: Routes = [
{
    path : '',
    redirectTo : '/home',
    pathMatch : 'full'
  },
  {
    path : 'home',
    component : PaisComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
