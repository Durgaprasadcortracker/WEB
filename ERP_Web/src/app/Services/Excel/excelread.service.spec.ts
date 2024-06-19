import { TestBed } from '@angular/core/testing';

import { ExcelreadService } from './excelread.service';

describe('ExcelreadService', () => {
  let service: ExcelreadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcelreadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
