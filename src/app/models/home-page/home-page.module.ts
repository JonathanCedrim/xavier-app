import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { MatListModule, MatCardModule, MatInputModule, MatCheckboxModule, MatStepperModule, MatButtonModule } from '@angular/material';

import { HomePageComponent } from './home-page.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        HttpModule,
        BrowserAnimationsModule,         
        MatCardModule,
        MatCheckboxModule,        
    ],
    declarations: [
        HomePageComponent
    ],
    exports: [
        HomePageComponent
    ],
    providers: [
        
    ]
})

export class HomePageModule { }
