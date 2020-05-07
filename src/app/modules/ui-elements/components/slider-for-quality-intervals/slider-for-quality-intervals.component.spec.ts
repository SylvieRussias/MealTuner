import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderForQualityIntervalsComponent } from './slider-for-quality-intervals.component';

describe('SliderForQualityIntervalsComponent', () => {
  let component: SliderForQualityIntervalsComponent;
  let fixture: ComponentFixture<SliderForQualityIntervalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SliderForQualityIntervalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderForQualityIntervalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
