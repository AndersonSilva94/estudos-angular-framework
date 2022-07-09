import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownService } from '../services/dropdown.service';
import { HttpClientModule } from '@angular/common/http';
import { ErrorMsgComponent } from '../error-msg/error-msg.component';

@NgModule({
  declarations: [
    ErrorMsgComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  exports: [
    ErrorMsgComponent
  ],
  providers: [
    DropdownService
  ]
})
export class SharedModule { }
