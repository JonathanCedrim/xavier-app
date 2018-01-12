import { Routes, RouterModule } from '@angular/router';

import { IdealComponent } from './ideal.component';
import { IdealFormComponent } from './ideal-form/ideal-form.component';

const idealRoutes: Routes = [
    { path: 'ideal', component: IdealComponent, pathMatch: 'full' },
    { path: 'ideal/novo', component: IdealFormComponent },
    { path: 'ideal/:id', component: IdealFormComponent }
];

export const IdealRouting = RouterModule.forChild(idealRoutes);