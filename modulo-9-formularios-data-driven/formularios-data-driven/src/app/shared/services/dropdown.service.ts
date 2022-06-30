import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(
    private http: HttpClient
  ) { }

  // pegando os dados do servidor
  getEstadosBr() {
    return this.http.get('assets/dados/estadosbr.json')
      .pipe(map((dados: any) => dados))
  }

  getCargos() {
    return [
      { nome: 'Dev', nivel: 'Junior', desc: 'Dev Jr' },
      { nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl' },
      { nome: 'Dev', nivel: 'Senior', desc: 'Dev Sr' }
    ]
  }

  getTecnologias() {
    return [
      { nome: 'javascript', desc: 'JavaScript' },
      { nome: 'react', desc: 'React' },
      { nome: 'angular', desc: 'Angular' },
      { nome: 'python', desc: 'Python' },
    ]
  }

  getNewsletter() {
    return [
      { valor: 's', desc: 'Sim' },
      { valor: 'n', desc: 'Não' }
    ]
  }
}
