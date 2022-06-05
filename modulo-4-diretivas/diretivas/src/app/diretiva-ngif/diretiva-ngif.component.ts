import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'diretiva-ngif',
  templateUrl: './diretiva-ngif.component.html',
  styleUrls: ['./diretiva-ngif.component.css']
})
export class DiretivaNgifComponent implements OnInit {

  cursos: string[] = ["Angular 2"];

  mostrarCursos: boolean = false;

  onMostrarCursos() {
    this.mostrarCursos = !this.mostrarCursos
  }

  constructor() { }

  ngOnInit(): void {
  }

}
