import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-base-form',
  template: '<div></div>',
})
export abstract class BaseFormComponent {

  formulario!: FormGroup;

  constructor() { }

  /* ngOnInit(): void {
  } */

  abstract submit(): any;

  onSubmit() {
    if (this.formulario.valid) {
      this.submit();
    } else {
      // console.log('formulario inválido')

      this.verificaValidacoesForm(this.formulario)

    }
  }

  // método genérico para fazer validação em qualquer formulário
  // os dados entram e verificam se é do tipo FormGroup caso seja, o método é chamado de novo
  verificaValidacoesForm(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach(
      campo => {
        // console.log(campo)
        const controle = formGroup.get(campo);
        controle?.markAsDirty();
        controle?.markAsTouched();

        if (controle instanceof FormGroup || controle instanceof FormArray) {
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

  verificaRequired(campo: string) {
    return (
      this.formulario.get(campo)?.hasError('required') && (this.formulario.get(campo)?.touched || this.formulario.get(campo)?.dirty));
  }

  verificaEmailInvalido() {
    let campoEmail = this.formulario.get('email');
    if (campoEmail?.errors) {
      return campoEmail?.errors['email'] && campoEmail.touched;
    }
  }

}
