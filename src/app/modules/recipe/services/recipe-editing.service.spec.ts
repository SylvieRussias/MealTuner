import { TestBed } from '@angular/core/testing';

import { RecipeEditingService } from './recipe-editing.service';

describe('RecipeEditingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecipeEditingService = TestBed.get(RecipeEditingService);
    expect(service).toBeTruthy();
  });
});
