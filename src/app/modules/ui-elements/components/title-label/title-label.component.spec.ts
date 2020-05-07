import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleLabelComponent } from './title-label.component';

describe('TitleLabelComponent', () => {
  let component: TitleLabelComponent;
  let fixture: ComponentFixture<TitleLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TitleLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
