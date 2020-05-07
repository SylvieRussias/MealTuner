import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleMainMenuButtonComponent } from './toggle-main-menu-button.component';

describe('ToggleMainMenuButtonComponent', () => {
  let component: ToggleMainMenuButtonComponent;
  let fixture: ComponentFixture<ToggleMainMenuButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToggleMainMenuButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleMainMenuButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
