import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { DataFormComponent } from './data-form.component';
import { FormDebugComponent } from '../form-debug/form-debug.component';
import { HttpClientModule } from '@angular/common/http';
import { CampoControlErroComponent } from '../campo-control-erro/campo-control-erro.component';
import { SharedModule } from '../shared/shared/shared.module';

@NgModule({
  declarations: [
    DataFormComponent,
    FormDebugComponent,
    CampoControlErroComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule
  ]
})
export class DataFormModule { }
