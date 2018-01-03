import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './models/home-page/home-page.component';
import { NotFoundComponent } from './models/not-found/not-found.component';


import { AppComponent } from './app.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', component: HomePageComponent },
    { path: 'not-found', component: NotFoundComponent },
    { path: '**', redirectTo: 'not-found' }
];
export const RoutingModule: ModuleWithProviders = RouterModule.forRoot(routes);