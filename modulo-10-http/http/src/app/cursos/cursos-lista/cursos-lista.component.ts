import { Component, OnInit } from '@angular/core';
import { catchError, empty, Observable, Subject, takeUntil } from 'rxjs';
import { Curso } from '../curso';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {

  // cursos!: Curso[];
  cursos$!: Observable<Curso[]>; // usar a notação $ ao final pra indicar que é um observable
  error$ = new Subject<boolean>();

  unsubscribe: Subject<void> = new Subject();

  constructor(
    private service: CursosService,
  ) { }

  ngOnInit(): void {
    // this.listarCursos();
    this.onRefresh()
  }

  /* listarCursos() {
    this.service.list()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(dados => this.cursos = dados);
  } */

  onRefresh() {
    this.cursos$ = this.service.list()
      .pipe(
        catchError(error => {
          console.error(error);
          this.error$.next(true);
          return empty()
        })
      )

      this.service.list()
      .subscribe(
        dados => {
          console.log(dados);
        },
        error => console.error(error),
        () => console.log('Observable completo!')
      )
  }

}
