import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryToolbarComponent } from './history-toolbar.component';

describe('HistoryToolbarComponent', () => {
  let component: HistoryToolbarComponent;
  let fixture: ComponentFixture<HistoryToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
