import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { ClienteComponent } from './cliente.component';
import { ClienteService } from './shared/cliente.service';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { MatPaginatorModule, MatNativeDateModule, MatDatepickerModule, MatSelectModule, MatInputModule, MatStepperModule, MatButtonModule } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        HttpModule,
        BrowserAnimationsModule,
        MatSelectModule,
        MatStepperModule,
        MatButtonModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatPaginatorModule
    ],
    declarations: [
        ClienteComponent,
        ClienteFormComponent                
    ],
    exports: [
        ClienteComponent
    ],
    providers: [
        ClienteService
    ]
})

export class ClienteModule { }
