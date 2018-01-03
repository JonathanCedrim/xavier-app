import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { VendedorComponent } from './vendedor.component';
import { VendedorService } from './shared/vendedor.service';
import { VendedorFormComponent } from './vendedor-form/vendedor-form.component';
import { MatTableModule, MatNativeDateModule, MatDatepickerModule, MatSelectModule, MatInputModule, MatStepperModule, MatButtonModule } from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        HttpModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatSelectModule,        
        MatStepperModule,
        MatButtonModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule
    ],
    declarations: [
        VendedorComponent,
        VendedorFormComponent
    ],
    exports: [
        VendedorComponent
    ],
    providers: [
        VendedorService
    ]
})


export class VendedorModule { }