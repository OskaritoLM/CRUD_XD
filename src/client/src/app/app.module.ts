import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatosPService } from './services/datos-pservice.service';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import {  ReactiveFormsModule } from '@angular/forms';

import { RegisterComponent } from './components/register/register.component';
import { PaisComponent } from './components/pais/pais.component';
import { AutosComponent } from './components/autos/autos.component';
import { ReservaComponent } from './components/reserva/reserva.component';
import { CiudadComponent } from './components/ciudad/ciudad.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HomeUserComponent } from './components/home-user/home-user.component';
@NgModule({
  declarations: [
    AppComponent,
    CiudadComponent,
    RegisterComponent,
    PaisComponent,
    AutosComponent,
    ReservaComponent,
    HomeAdminComponent,
    HomeUserComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot() 
  ],
  providers: [DatosPService],
  bootstrap: [AppComponent]
})
export class AppModule { }
