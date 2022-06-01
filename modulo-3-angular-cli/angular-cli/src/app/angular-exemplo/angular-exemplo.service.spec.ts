import { TestBed } from '@angular/core/testing';

import { AngularExemploService } from './angular-exemplo.service';

describe('AngularExemploService', () => {
  let service: AngularExemploService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngularExemploService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
