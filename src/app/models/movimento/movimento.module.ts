import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { MovimentoComponent } from './movimento.component';
import { MovimentoService } from './shared/movimento.service';
import { MovimentoFormComponent } from './movimento-form/movimento-form.component';
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
        MovimentoComponent,
        MovimentoFormComponent
    ],
    exports: [
        MovimentoComponent
    ],
    providers: [
        MovimentoService
    ]
})


export class MovimentoModule { }