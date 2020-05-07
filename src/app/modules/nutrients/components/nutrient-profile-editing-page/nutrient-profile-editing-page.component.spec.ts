import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NutrientProfileEditingPageComponent } from './nutrient-profile-editing-page.component';

describe('NutrientProfileEditingPageComponent', () => {
  let component: NutrientProfileEditingPageComponent;
  let fixture: ComponentFixture<NutrientProfileEditingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NutrientProfileEditingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NutrientProfileEditingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
