import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatosPService } from './services/datos-pservice.service';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ReservasService } from './services/reserva.service';
import {  ReactiveFormsModule } from '@angular/forms';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer'; 
import { RegisterComponent } from './components/register/register.component';
import { PaisComponent } from './components/pais/pais.component';
import { AutosComponent } from './components/autos/autos.component';
import { ReservaComponent } from './components/reserva/reserva.component';
import { CiudadComponent } from './components/ciudad/ciudad.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HomeUserComponent } from './components/home-user/home-user.component';
import { PromocionesComponent } from './components/promociones/promociones.component';
import { EstadoComponent } from './components/estado/estado.component';
import { HistorialComponent } from './components/historial/historial.component';
import { AutosService } from './services/autos.service';

import { EmpresaComponent } from './components/empresa/empresa.component';

import { AutosAdminComponent } from './components/autos-admin/autos-admin.component';
import { LoginComponent } from './components/login/login.component';
import { LugarComponent } from './components/lugar-admun/lugar-admun.component';
import { VerReservaComponent } from './components/ver-reserva/ver-reserva.component';
import { EnviaDatosService } from './services/enviadatos.service';
import { MensajeComponent } from './components/mensaje/mensaje.component';
import { FilterPipe } from './pipes/filter.pipe';
import { AuthModule } from '@auth0/auth0-angular';
@NgModule({
  declarations: [
    AppComponent,
    CiudadComponent,
    RegisterComponent,
    PaisComponent,
    AutosComponent,
    ReservaComponent,
    HomeAdminComponent,
    HomeUserComponent,
    PromocionesComponent,
    EstadoComponent,
    HistorialComponent,
    LugarComponent,
    EmpresaComponent,

    AutosAdminComponent,
      LoginComponent,
      VerReservaComponent,
      MensajeComponent,
      FilterPipe,

  ],
  imports: [
    NgxExtendedPdfViewerModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(),
    AuthModule.forRoot({
      domain: 'mlbar.us.auth0.com',
      clientId: 'B3GOwce3bfdgPrQE1WByhPTblbpol1iq',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
  ],
  providers: [DatosPService, ReservasService, AutosService, EnviaDatosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
