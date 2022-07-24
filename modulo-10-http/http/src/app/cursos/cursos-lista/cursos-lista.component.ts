import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { catchError, EMPTY, empty, Observable, Subject, switchMap, take, takeUntil } from 'rxjs';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
// import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';
import { Curso } from '../curso';
// import { CursosService } from '../cursos.service';
import { Cursos2Service } from '../cursos2.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {

  deleteModalRef?: BsModalRef;
  @ViewChild('deleteModal') deleteModal!: any;

  // cursos!: Curso[];
  cursos$!: Observable<Curso[]>; // usar a notação $ ao final pra indicar que é um observable
  error$ = new Subject<boolean>();

  idCursoSelecionado!: number;

  unsubscribe: Subject<void> = new Subject();

  constructor(
    private service: Cursos2Service,
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService,
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

      /* this.service.list()
      .subscribe(
        dados => { // retorno de sucesso
          console.log(dados);
        },
        error => console.error(error), // retorno com erro
        () => console.log('Observable completo!') // finalizando
      ) */
  }

  handleError() {
    this.alertService.showAlertDanger('Erro ao carregar cursos. Tente novamente mais tarde.')
  }

  onEdit(id: number) {
    this.router.navigate(['editar', id], {
      relativeTo: this.route
    });
  }

  onDelete(id: number) {
    // this.idCursoSelecionado = id
    // this.deleteModalRef = this.modalService.show(this.deleteModal, { class: 'modal-sm' });

    const result$ = this.alertService.showConfirm('Confirmação', 'Tem certeza que deseja remover esse curso?')
    result$.asObservable()
    .pipe(
      take(1),
      switchMap(result => result ? this.service.remove(id) : EMPTY)
    )
    .subscribe(
      success => {
        this.onRefresh();
        // this.onDeclineDelete();
      },
      error => {
        this.alertService.showAlertDanger('Erro ao excluir curso. Tente novamente mais tarde!');
        // this.onDeclineDelete();
      }
    )
  }

  /* onConfirmDelete() {
    this.service.remove(this.idCursoSelecionado)
      .subscribe(
        success => {
          this.onRefresh();
          this.onDeclineDelete();
        },
        error => {
          this.alertService.showAlertDanger('Erro ao excluir curso. Tente novamente mais tarde!');
          this.onDeclineDelete();
        }
      )
  } */

  /* onDeclineDelete() {
    this.deleteModalRef?.hide();
  } */

}
