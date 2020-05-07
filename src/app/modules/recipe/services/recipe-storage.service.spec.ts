import { TestBed } from '@angular/core/testing';

import { RecipeStorageService } from './recipe-storage.service';

describe('RecipeStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecipeStorageService = TestBed.get(RecipeStorageService);
    expect(service).toBeTruthy();
  });
});
