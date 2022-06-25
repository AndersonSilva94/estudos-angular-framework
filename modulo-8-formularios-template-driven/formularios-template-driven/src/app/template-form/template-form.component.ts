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
    // console.log(form)

    // console.log(this.usuario)

    //this.http.post('enderecoServer/formUsuario', JSON.stringify(form.value))
    this.http.post('https://httpbin.org/post', JSON.stringify(form.value))
      .pipe(map(dados => dados))
      .subscribe(dados => console.log(dados))
  }

  verificaValidTouched(campo: any) {
    return !campo.valid && campo.touched
  }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  consultaCEP(cep: string, f: NgForm) {
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
          .subscribe(dados => this.populaDadosForm(dados, f));
      }
    }
  }

  populaDadosForm(dados: any, formulario: NgForm) {
    /* formulario.setValue({
      nome: formulario.value.nome,
      email: formulario.value.email,
      endereco: {
        rua: dados.logradouro,
        cep: dados.cep,
        numero: '',
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    }); */

    formulario.form.patchValue({
      endereco: {
        rua: dados.logradouro,
        cep: dados.cep,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    })

    // console.log(formulario)
  }

}
