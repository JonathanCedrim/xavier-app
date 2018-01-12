import { BrowserModule } from '@angular/platform-browser';
import { Component, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonToggleModule,  MatButtonModule } from '@angular/material';


import { RoutingModule } from './app.routing';
import { VendedorModule } from './models/vendedor/vendedor.module';
import { ClienteModule } from './models/cliente/cliente.module';
import { MovimentoModule } from './models/movimento/movimento.module';
import { IdealModule } from './models/ideal/ideal.module';
import { HomePageModule } from './models/home-page/home-page.module';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './models/not-found/not-found.component';
import { HomePageComponent } from './models/home-page/home-page.component';

import { VendedorRouting } from './models/vendedor/vendedor.routing';
import { ClienteRouting } from './models/cliente/cliente.routing';
import { MovimentoRouting} from './models/movimento/movimento.routing';
import { IdealRouting} from './models/ideal/ideal.routing';

import { LoginPageComponent } from './models/login-page/login-page.component';
import { CepService } from './shared/cep.service';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    LoginPageComponent,    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatButtonModule,
    FormsModule,
    ClienteModule,
    VendedorModule,
    MovimentoModule,
    IdealModule,
    ClienteRouting,
    VendedorRouting,
    MovimentoRouting,
    IdealRouting,
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
