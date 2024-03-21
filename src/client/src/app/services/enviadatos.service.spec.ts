import { TestBed } from '@angular/core/testing';

import { EnviaDatosService } from './enviadatos.service';

describe('EnviaDatosService', () => {
  let service: EnviaDatosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnviaDatosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
