import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { IdealComponent } from './ideal.component';
import { IdealService } from './shared/ideal.service';
import { IdealFormComponent } from './ideal-form/ideal-form.component';
import { MatNativeDateModule, MatDatepickerModule, MatSelectModule, MatInputModule, MatStepperModule, MatButtonModule } from '@angular/material';
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
        MatNativeDateModule
    ],
    declarations: [
        IdealComponent,
        IdealFormComponent                
    ],
    exports: [
        IdealComponent
    ],
    providers: [
        IdealService
    ]
})

export class IdealModule { }
