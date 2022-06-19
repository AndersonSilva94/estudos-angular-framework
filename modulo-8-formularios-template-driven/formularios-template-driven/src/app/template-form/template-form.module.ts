import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateFormComponent } from './template-form.component';
import { FormsModule } from '@angular/forms';
import { FormDebugComponent } from '../form-debug/form-debug.component';

@NgModule({
  declarations: [
    // não consegui importar aqui e usar o seletor :(
    // FormDebugComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ]
})
export class TemplateFormModule { }
