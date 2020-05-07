import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientDetailsDialogComponent } from './ingredient-details-dialog.component';

describe('IngredientDetailsDialogComponent', () => {
  let component: IngredientDetailsDialogComponent;
  let fixture: ComponentFixture<IngredientDetailsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngredientDetailsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
