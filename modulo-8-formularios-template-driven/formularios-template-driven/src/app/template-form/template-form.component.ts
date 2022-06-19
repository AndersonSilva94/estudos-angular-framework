import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {
  // caso queria utilizar os valores para alterar o objeto, usado o two-way data-bind, sn só o property-bind
  usuario: any = {
    nome: null,
    email: null
  }

  onSubmit(form: any) {
    console.log(form.value)

    console.log(this.usuario)
  }

  constructor() { }

  ngOnInit(): void {
  }

}
