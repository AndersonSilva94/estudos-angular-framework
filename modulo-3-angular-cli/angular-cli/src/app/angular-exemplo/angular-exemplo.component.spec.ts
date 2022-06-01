import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularExemploComponent } from './angular-exemplo.component';

describe('AngularExemploComponent', () => {
  let component: AngularExemploComponent;
  let fixture: ComponentFixture<AngularExemploComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngularExemploComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularExemploComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
