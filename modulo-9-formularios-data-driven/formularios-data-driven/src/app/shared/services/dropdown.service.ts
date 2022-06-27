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
}
