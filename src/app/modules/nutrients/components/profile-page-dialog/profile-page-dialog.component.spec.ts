import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePageDialogComponent } from './profile-page-dialog.component';

describe('ProfilePageDialogComponent', () => {
  let component: ProfilePageDialogComponent;
  let fixture: ComponentFixture<ProfilePageDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilePageDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
