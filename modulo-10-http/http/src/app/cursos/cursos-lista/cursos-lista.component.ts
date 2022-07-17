import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { catchError, empty, Observable, Subject, takeUntil } from 'rxjs';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';
import { Curso } from '../curso';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {

  bsModalRef?: BsModalRef;

  // cursos!: Curso[];
  cursos$!: Observable<Curso[]>; // usar a notação $ ao final pra indicar que é um observable
  error$ = new Subject<boolean>();

  unsubscribe: Subject<void> = new Subject();

  constructor(
    private service: CursosService,
    private modalService: BsModalService
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
        catchError(error => { // colocar o catchError como último método pipe
          console.error(error);
          // this.error$.next(true);
          this.handleError()
          return empty()
        })
      )

      this.service.list()
      .subscribe(
        dados => { // retorno de sucesso
          console.log(dados);
        },
        error => console.error(error), // retorno com erro
        () => console.log('Observable completo!') // finalizando
      )
  }

  handleError() {
    this.bsModalRef = this.modalService.show(AlertModalComponent);
    this.bsModalRef.content.type = 'danger';
    this.bsModalRef.content.message = 'Erro ao carregar cursos. Tente novamente mais tarde.';
  }

}
