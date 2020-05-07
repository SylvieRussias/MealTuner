import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonStandardComponent } from './button-standard.component';

describe('ButtonStandardComponent', () => {
  let component: ButtonStandardComponent;
  let fixture: ComponentFixture<ButtonStandardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonStandardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonStandardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
