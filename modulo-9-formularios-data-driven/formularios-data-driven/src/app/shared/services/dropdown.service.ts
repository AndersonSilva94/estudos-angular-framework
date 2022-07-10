import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'
import { Cidade } from '../models/cidade-br';
import { EstadoBr } from '../models/estado-br';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(
    private http: HttpClient
  ) { }

  // pegando os dados do servidor
  getEstadosBr() {
    return this.http.get<EstadoBr[]>('assets/dados/estadosbr.json')
      .pipe(map((dados: any) => dados))
  }

  getCidades(idEstado: number) {
    return this.http.get<Cidade[]>('assets/dados/cidadesbr.json')
      .pipe(map((dados: Cidade[]) => dados.filter(c => c.estado == idEstado)))
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
      { nome: 'php', desc: 'PHP' },
      { nome: 'lua', desc: 'Lua' },
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
