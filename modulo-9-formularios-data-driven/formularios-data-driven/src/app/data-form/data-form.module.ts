import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { DataFormComponent } from './data-form.component';
import { FormDebugComponent } from '../form-debug/form-debug.component';

@NgModule({
  declarations: [
    DataFormComponent,
    FormDebugComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class DataFormModule { }
