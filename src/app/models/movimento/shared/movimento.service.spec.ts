import { TestBed, inject } from '@angular/core/testing';

import { MovimentoService } from './movimento.service';

describe('MovimentoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MovimentoService]
    });
  });

  it('should be created', inject([MovimentoService], (service: MovimentoService) => {
    expect(service).toBeTruthy();
  }));
});
