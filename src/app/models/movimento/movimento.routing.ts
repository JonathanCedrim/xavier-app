import { Routes, RouterModule } from '@angular/router';

import { MovimentoComponent } from './movimento.component';
import { MovimentoFormComponent } from './movimento-form/movimento-form.component';

const movimentoRoutes: Routes = [
    { path: 'movimento', component: MovimentoComponent, pathMatch: 'full' },
    { path: 'movimento/novo', component: MovimentoFormComponent },
    { path: 'movimento/:id', component: MovimentoFormComponent }
];

export const MovimentoRouting = RouterModule.forChild(movimentoRoutes);