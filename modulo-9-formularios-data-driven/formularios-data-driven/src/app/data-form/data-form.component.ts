import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { DropdownService } from '../shared/services/dropdown.service';
import { EsatdoBr } from '../shared/models/esatdo-br';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  // a exclamação é uma forma de não instanciar uma classe
  formulario!: FormGroup;
  estados!: EsatdoBr[];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropdownService: DropdownService
  ) { }

  ngOnInit(): void {

    // pegar os dados do serviço ao iniciar
    this.dropdownService.getEstadosBr()
      .subscribe(dados => {
        this.estados = dados
        console.log(dados)
      })

    // 1ª forma
    /* this.formulario = new FormGroup({
      nome: new FormControl(null),
      email: new FormControl(null),
      endereco: new FormGroup({
        cep: new FormControl(null)
      })
    }); */

    // 2ª forma
    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      email: [null, [Validators.required, Validators.email]],
      endereco: this.formBuilder.group({
        cep: [null, Validators.required],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]
      })
    })

  }

  onSubmit() {
    // console.log(this.formulario)

    if (this.formulario.valid) {
      this.http.post('https://httpbin.org/post', JSON.stringify(this.formulario.value))
        .pipe(map(dados => dados))
        .subscribe(dados => {
          console.log(dados);

          //reseta o form
          // this.resetar();
        },
          (err: any) => alert('erro')
        );
    } else {
      // console.log('formulario inválido')

      this.verificaValidacoesForm(this.formulario)

    }

  }

  // método genérico para fazer validação em qualquer formulário
  // os dados entram e verificam se é do tipo FormGroup caso seja, o método é chamado de novo
  verificaValidacoesForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(
      campo => {
        console.log(campo)
        const controle = formGroup.get(campo);
        controle?.markAsDirty();

        if (controle instanceof FormGroup) {
          this.verificaValidacoesForm(controle);
        }

      }
    );
  }

  resetar() {
    this.formulario.reset();
  }

  verificaValidTouched(campo: any) {
    return !this.formulario.get(campo)?.valid && (this.formulario.get(campo)?.touched || this.formulario.get(campo)?.dirty);
  }

  verificaEmailInvalido() {
    let campoEmail = this.formulario.get('email');
    if (campoEmail?.errors) {
      return campoEmail?.errors['email'] && campoEmail.touched;
    }
  }

  consultaCEP() {
    let cep = this.formulario.get('endereco.cep')?.value

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
          .subscribe(dados => this.populaDadosForm(dados));
      }
    }
  }

  populaDadosForm(dados: any) {

    this.formulario.patchValue({
      endereco: {
        rua: dados.logradouro,
        cep: dados.cep,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    })

    // this.formulario.get('nome')?.setValue('Andy')
  }

  resetaDadosForm(){
    this.formulario.patchValue({
      endereco: {
        rua: null,
        complemento: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    })
  }

}
