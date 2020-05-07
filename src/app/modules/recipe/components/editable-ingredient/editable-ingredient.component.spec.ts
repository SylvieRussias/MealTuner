import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableIngredientComponent } from './editable-ingredient.component';

describe('EditableIngredientComponent', () => {
  let component: EditableIngredientComponent;
  let fixture: ComponentFixture<EditableIngredientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditableIngredientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableIngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
