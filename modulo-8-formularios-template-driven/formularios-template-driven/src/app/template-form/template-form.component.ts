import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

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

  onSubmit(form: NgForm) {
    console.log(form)

    console.log(this.usuario)
  }

  verificaValidTouched(campo: any) {
    return !campo.valid && campo.touched
  }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  consultaCEP(cep: string) {
    // cep somente com números
    cep = cep.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "" && cep != null) {

      //Expressão regular para validar o CEP.
      let validacep = /^[0-9]{8}$/;

      //Valida o formato do CEP.
      if(validacep.test(cep)) {

        this.http.get(`https://viacep.com.br/ws/${cep}/json`)
          .pipe(map((dados: any) => dados))
          .subscribe(dados => console.log(dados));
      }

    }
  }

}
