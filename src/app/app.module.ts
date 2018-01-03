import { BrowserModule } from '@angular/platform-browser';
import { Component, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonToggleModule,  MatButtonModule } from '@angular/material';


import { RoutingModule } from './app.routing';
import { VendedorModule } from './models/vendedor/vendedor.module';
import { ClienteModule } from './models/cliente/cliente.module';

import { AppComponent } from './app.component';
import { HomePageComponent } from './models/home-page/home-page.component';
import { NotFoundComponent } from './models/not-found/not-found.component';
import { HomePageModule } from './models/home-page/home-page.module';
import { VendedorRouting } from './models/vendedor/vendedor.routing';
import { ClienteRouting } from './models/cliente/cliente.routing';

import { LoginPageComponent } from './models/login-page/login-page.component';
import { ClienteFormComponent } from './models/cliente/cliente-form/cliente-form.component';

import { CepService } from './shared/cep.service';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatButtonToggleModule,
    FormsModule,
    VendedorModule,
    ClienteModule,
    MatButtonModule,
    VendedorRouting,
    ClienteRouting,
    HomePageModule,
    RoutingModule
  ],
  exports: [],
  providers: [
    CepService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
