import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatosPComponent } from './components/datos-p/datos-p.component';

const routes: Routes = [
  {path:'/',component:DatosPComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
