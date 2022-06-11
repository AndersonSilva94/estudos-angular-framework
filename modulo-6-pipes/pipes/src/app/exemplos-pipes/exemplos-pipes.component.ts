import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'exemplos-pipes',
  templateUrl: './exemplos-pipes.component.html',
  styleUrls: ['./exemplos-pipes.component.css']
})
export class ExemplosPipesComponent implements OnInit {

  livro: any = {
    titulo: 'A batalha do apocalipse',
    rating: 4.7,
    numeroPaginas: 588,
    preco: 37.04,
    dataLancamento: new Date(2010, 5, 28),
    url: 'https://www.amazon.com.br/Batalha-Apocalipse-queda-anjos-crep%C3%BAsculo/dp/8576860767/ref=sr_1_3?keywords=a+batalha+do+apocalipse&qid=1654884161&s=books&sprefix=a+batalha%2Cstripbooks%2C1174&sr=1-3'
  }

  livros: string[] = ['Percy Jackson', 'Game of Thrones'];

  filtro: string = '';

  valorAsync = new Promise((resolve, reject) => {
    setTimeout(() => resolve('Valor assíncrono'), 2000)
  })

  valorAsync2 = interval(2000).pipe(map(valor => 'Valor assíncrono 2'))

  constructor() { }

  ngOnInit(): void {
  }

  addLivro(newBook: string) {
    this.livros.push(newBook)
  }

  obterLivros() {
    if (this.livros.length === 0 || this.filtro === undefined || this.filtro.trim() === '') {
      return this.livros
    }

    return this.livros.filter((v: string) => {
      if(v.toLocaleLowerCase().indexOf(this.filtro.toLowerCase()) != -1) {
        return true
      }
      return false;
    })
  }

}
