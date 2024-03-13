import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatosPService } from './services/datos-pservice.service';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RegisterComponent } from './components/register/register.component';
import { PaisComponent } from './components/pais/pais.component';
@NgModule({
  declarations: [
    AppComponent,

    RegisterComponent,
    PaisComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [DatosPService],
  bootstrap: [AppComponent]
})
export class AppModule { }
