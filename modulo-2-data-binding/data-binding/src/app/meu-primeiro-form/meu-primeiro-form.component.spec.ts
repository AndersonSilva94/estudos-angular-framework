import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeuPrimeiroFormComponent } from './meu-primeiro-form.component';

describe('MeuPrimeiroFormComponent', () => {
  let component: MeuPrimeiroFormComponent;
  let fixture: ComponentFixture<MeuPrimeiroFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeuPrimeiroFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeuPrimeiroFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
