import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutosComponent } from './components/autos/autos.component';
import { CiudadComponent } from './components/ciudad/ciudad.component';
import { EstadoComponent } from './components/estado/estado.component';
import { HistorialComponent } from './components/historial/historial.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { HomeUserComponent } from './components/home-user/home-user.component';
import { PaisComponent } from './components/pais/pais.component';
import { PromocionesComponent } from './components/promociones/promociones.component';
import { ReservaComponent } from './components/reserva/reserva.component';
import { VerReservaComponent } from './components/ver-reserva/ver-reserva.component';
import { AutosAdminComponent } from './components/autos-admin/autos-admin.component';
import { EmpresaComponent } from './components/empresa/empresa.component';
import { LugarComponent } from './components/lugar-admun/lugar-admun.component';
import { LoginComponent } from './components/login/login.component';
import { MensajeComponent } from './components/mensaje/mensaje.component';
import { AuthGuard } from './guard/auth-guard.guard';
import { RegisterComponent } from './components/register/register.component';



const routes: Routes = [
{
    path : '',
    redirectTo : 'home',
    pathMatch : 'full'
  },
  {
    path : 'home-admin',
    component : HomeAdminComponent,
    canActivate: [AuthGuard]
  },
  { path: 'ver-reserva/:id', 
  component: VerReservaComponent,
  canActivate: [AuthGuard]
},
  
  {
    path : 'user',
    component : HomeUserComponent
  },
  {
    path : 'estado',
    component : CiudadComponent,
    canActivate: [AuthGuard]
  },
  {
    path : 'pais',
    component : PaisComponent,
    canActivate: [AuthGuard]
  },
  {

    path : 'ciudad',
    component : EstadoComponent,
    canActivate: [AuthGuard]
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
    component: AutosAdminComponent,
    canActivate: [AuthGuard]
  },
  
  {
    path: 'lugar-admin',
    component: LugarComponent,
    canActivate: [AuthGuard]
  },
  
  {
    path: 'home',
    component: HomeUserComponent
  },
  {
    path: 'user/mensaje',
    component: MensajeComponent
  },
  {
    path: 'perfil',
    component: RegisterComponent,
    canActivate: [AuthGuard]
  },

]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }