import { TestBed } from '@angular/core/testing';

import { AddNewIngredientService } from './add-new-ingredient.service';

describe('AddNewIngredientService', () => {
  let service: AddNewIngredientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddNewIngredientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
