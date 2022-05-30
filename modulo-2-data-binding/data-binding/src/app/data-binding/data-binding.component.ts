import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-binding',
  templateUrl: './data-binding.component.html',
  styleUrls: ['./data-binding.component.css']
})
export class DataBindingComponent implements OnInit {

  url: string = 'http://google.com';
  cursoAngular: boolean = true;
  urlImagem: string = 'http://lorempixel.com.br/400/200';
  valorAtual: string = '';
  valorSalvo: string = '';

  isMouseOver: boolean = false;

  nomeCurso: string = 'curso de angular';

  valorInicial = 15;

  getValor() {
    return 1;
  }

  getCurtirCurso() {
    return true;
  }

  botaoClicado(){
    alert('Clicado!')
  }

  onKeyUp(evento: KeyboardEvent){
    this.valorAtual = (evento.target as HTMLInputElement).value
  }

  salvarValor(valor: string){
    this.valorSalvo = valor
  }

  onMouseOverOut() {
    this.isMouseOver = !this.isMouseOver
  }

  onMudouValor(evento: any) {
    console.log(evento)
  }

  constructor() { }

  ngOnInit(): void {
  }

}
