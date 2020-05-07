import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableIngredientListComponent } from './editable-ingredient-list.component';

describe('EditableIngredientListComponent', () => {
  let component: EditableIngredientListComponent;
  let fixture: ComponentFixture<EditableIngredientListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditableIngredientListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableIngredientListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
