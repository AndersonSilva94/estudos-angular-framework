import { Component, OnInit, OnChanges, DoCheck, AfterContentInit, AfterViewChecked, AfterContentChecked, AfterViewInit, Input } from '@angular/core';

@Component({
  selector: 'app-ciclo',
  templateUrl: './ciclo.component.html',
  styleUrls: ['./ciclo.component.css']
})
export class CicloComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterViewChecked, AfterContentChecked, AfterViewInit {

  @Input() valorInicial: number = 10;

  constructor() {
    this.log('constructor')
  }

  ngOnChanges() {
    this.log('ngOnChanges')
  }

  ngOnInit() { // aqui fazemos a chamada pro servidor pra obter dados para o componente
    this.log('ngOnInit')
  }

  ngDoCheck() {
    this.log('ngDoCheck')
  }

  ngAfterContentInit() {
    this.log('ngAfterContentInit')
  }

  ngAfterContentChecked() {
    this.log('ngAfterContentChecked')
  }

  ngAfterViewChecked() {
    this.log('ngAfterViewChecked')
  }

  ngOnDestroy() {
    this.log('ngOnDestroy')
  }

  ngAfterViewInit() {
    this.log('ngAfterViewInit')
  }

  private log(hook: string) {
    console.log(hook)
  }

}
