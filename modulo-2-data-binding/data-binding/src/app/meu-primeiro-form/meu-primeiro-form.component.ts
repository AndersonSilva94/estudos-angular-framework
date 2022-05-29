import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meu-primeiro-form',
  templateUrl: './meu-primeiro-form.component.html',
  styleUrls: ['./meu-primeiro-form.component.css']
})
export class MeuPrimeiroFormComponent implements OnInit {

  nome: string = 'abc';
  nome2: string = 'def';
  nome3: string = 'ghi';
  pessoa: any = {
    nome: 'andy',
    idade: 28
  }

  constructor() { }

  ngOnInit(): void {
  }

}
