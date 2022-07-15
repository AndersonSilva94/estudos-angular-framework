import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Curso } from '../curso';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {

  cursos!: Curso[];

  unsubscribe: Subject<void> = new Subject();

  constructor(
    private service: CursosService,
  ) { }

  ngOnInit(): void {
    this.listarCursos();
  }

  listarCursos() {
    this.service.list()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(dados => this.cursos = dados);
  }

}
