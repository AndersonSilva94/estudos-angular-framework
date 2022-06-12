import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';


@NgModule({
  declarations: [
    LoginComponent
  ],
  providers: [

  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})

export class LoginModule {}
