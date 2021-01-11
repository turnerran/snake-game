import { TestBed } from '@angular/core/testing';

import { TopScoresService } from './top-scores.service';

describe('TopScoresService', () => {
  let service: TopScoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopScoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
