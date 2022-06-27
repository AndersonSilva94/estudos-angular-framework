import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownService } from '../services/dropdown.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    DropdownService
  ]
})
export class SharedModule { }
