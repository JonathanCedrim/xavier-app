import { Routes, RouterModule } from '@angular/router';

import { VendedorComponent } from './vendedor.component';
import { VendedorFormComponent } from './vendedor-form/vendedor-form.component';

const vendedorRoutes: Routes = [
    { path: 'vendedor', component: VendedorComponent, pathMatch: 'full' },
    { path: 'vendedor/novo', component: VendedorFormComponent },
    { path: 'vendedor/:id', component: VendedorFormComponent }
];

export const VendedorRouting = RouterModule.forChild(vendedorRoutes);