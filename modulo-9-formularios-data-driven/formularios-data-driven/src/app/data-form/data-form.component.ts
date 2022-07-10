import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators'
import { DropdownService } from '../shared/services/dropdown.service';
import { EstadoBr } from '../shared/models/estado-br';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { empty, Observable } from 'rxjs';
import { FormValidations } from '../shared/form-validations';
import { VerificaEmailService } from './services/verifica-email.service';
import { BaseFormComponent } from '../shared/base-form/base-form.component';
import { Cidade } from '../shared/models/cidade-br';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent extends BaseFormComponent implements OnInit {

  // a exclamação é uma forma de não instanciar uma classe
  estados!: EstadoBr[];
  cidades!: Cidade[];
  // estados!: Observable<EstadoBr[]>;
  cargos!: any[];
  tecnologias!: any[];
  newsletterOp!: any[];
  frameworks: string[] = ['Angular', 'React', 'Vue', 'Sencha'];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropdownService: DropdownService,
    private cepService: ConsultaCepService,
    private verificaEmailService: VerificaEmailService
  ) {
    super();
  }

  ngOnInit(): void {

    // this.verificaEmailService.verificarEmail('email@email.com').subscribe()

    // dessa forma, o async no html faz o unsubscribe e impede vazemento de memória
    // this.estados = this.dropdownService.getEstadosBr();
    this.dropdownService.getEstadosBr()
      .subscribe(dados => this.estados = dados);
    this.cargos = this.dropdownService.getCargos();
    this.tecnologias = this.dropdownService.getTecnologias();
    this.newsletterOp = this.dropdownService.getNewsletter();

    // pegar os dados do serviço ao iniciar
    /* this.dropdownService.getEstadosBr()
      .subscribe(dados => {
        this.estados = dados
        console.log(dados)
      }) */

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
      email: [null, [Validators.required, Validators.email], [this.validarEmail.bind(this)]],
      confirmarEmail: [null, [FormValidations.equalsTo('email')]],
      endereco: this.formBuilder.group({
        cep: [null, [Validators.required, FormValidations.cepValidator]],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]
      }),

      cargo: [null],
      tecnologias: [null],
      newsletter: ['s'],
      termos: [null, Validators.pattern('true')],
      frameworks: this.buildFrameworks()
    });

    this.formulario.get('endereco.cep')?.statusChanges
      .pipe(
        distinctUntilChanged(),
        tap(value => console.log('status cep', value)),
        switchMap(status => status === 'VALID' ?
          this.cepService.consultaCEP(this.formulario.get('endereco.cep')?.value)
          .pipe(map((dados: any) => dados)) : empty()
        )
      )
      .subscribe(dados => dados ? this.populaDadosForm(dados) : {});

      // this.dropdownService.getCidades(8).subscribe(console.log);
      this.formulario.get('endereco.estado')?.valueChanges
        .pipe(
          tap(estado => console.log('Novo estado: ', estado)),
          map(estado => this.estados.filter(e => e.sigla === estado)),
          map(estados => estados && estados.length > 0 ? estados[0].id : empty()),
          switchMap((estadoId: any) => this.dropdownService.getCidades(estadoId)),
          tap(console.log)
        )
        .subscribe(cidades => this.cidades = cidades);
  }

  buildFrameworks() {

    const values = this.frameworks.map(v => new FormControl(false));

    return this.formBuilder.array(values, FormValidations.requiredMinCheckbox(1));

    /* this.formBuilder.array([
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
      new FormControl(false)
    ]) */
  }

  submit() {
    console.log(this.formulario)

    let valueSubmit = Object.assign({}, this.formulario.value);

    valueSubmit = Object.assign(valueSubmit, {
      frameworks: valueSubmit.frameworks
        .map((v: any, i: any) => v ? this.frameworks[i] : null)
        .filter((v: any) => v !== null)
    })

    this.http.post('https://httpbin.org/post', JSON.stringify(valueSubmit))
        .pipe(map(dados => dados))
        .subscribe(dados => {
          console.log(dados);

          //reseta o form
          // this.resetar();
        },
          (err: any) => alert('erro')
        );
  }

  consultaCEP() {
    let cep = this.formulario.get('endereco.cep')?.value

    //Verifica se campo cep possui valor informado.
    if (cep !== "" && cep != null) {

      this.cepService.consultaCEP(cep)
        .pipe(map((dados: any) => dados))
        .subscribe(dados => this.populaDadosForm(dados));
    }
  }

  populaDadosForm(dados: any) {

    this.formulario.patchValue({
      endereco: {
        rua: dados.logradouro,
        // cep: dados.cep,
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

  setarCargo() {
    const cargo = { nome: 'Dev', nivel: 'Senior', desc: 'Dev Sr' }
    this.formulario.get('cargo')?.setValue(cargo)
  }

  compararCargos(obj1: any, obj2: any) {
    return obj1 && obj2 ? (obj1.nome === obj2.nome && obj1.nivel === obj2.nivel) : obj1 === obj2;
  }

  setarTecnologias() {
    this.formulario.get('tecnologias')?.setValue(['javascript', 'php'])
  }

  getFrameworksControls() {
    return this.formulario.get('frameworks') ? (<FormArray>this.formulario.get('frameworks')).controls : null;
  }

  validarEmail(formControl: FormControl) {
    return this.verificaEmailService.verificarEmail(formControl.value)
      .pipe(
        map(emailExiste => emailExiste ? { emailInvalido: true } : null)
      )
  }

}
