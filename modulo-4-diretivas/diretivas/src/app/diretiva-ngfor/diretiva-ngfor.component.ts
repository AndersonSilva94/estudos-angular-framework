import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'diretiva-ngfor',
  templateUrl: './diretiva-ngfor.component.html',
  styleUrls: ['./diretiva-ngfor.component.css']
})
export class DiretivaNgforComponent implements OnInit {

  cursos: string[] = ["Angular 2", "React", "Vue"]

  constructor() { }

  ngOnInit(): void {
  }

}
