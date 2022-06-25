import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  formulario: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) { }

  ngOnInit(): void {

    // 1ª forma
    /* this.formulario = new FormGroup({
      nome: new FormControl(null),
      email: new FormControl(null),
    }); */

    // 2ª forma
    this.formulario = this.formBuilder.group({
      nome: [null],
      email: [null],
    })

  }

  onSubmit() {
    // console.log(this.formulario.value)

    this.http.post('https://httpbin.org/post', JSON.stringify(this.formulario.value))
      .pipe(map(dados => dados))
      .subscribe(dados => {
        console.log(dados);

        //reseta o form
        this.resetar();
      },
        (err: any) => alert('erro')
      )
  }

  resetar() {
    this.formulario.reset();
  }

}
