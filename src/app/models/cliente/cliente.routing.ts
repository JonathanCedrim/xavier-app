import { Routes, RouterModule } from '@angular/router';

import { ClienteComponent } from './cliente.component';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';

const clienteRoutes: Routes = [
    { path: 'cliente', component: ClienteComponent, pathMatch: 'full' },
    { path: 'cliente/novo', component: ClienteFormComponent },
    { path: 'cliente/:id', component: ClienteFormComponent }
];

export const ClienteRouting = RouterModule.forChild(clienteRoutes);