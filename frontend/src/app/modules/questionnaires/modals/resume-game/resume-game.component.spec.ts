import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeGameComponent } from './resume-game.component';

describe('ResumeGameComponent', () => {
  let component: ResumeGameComponent;
  let fixture: ComponentFixture<ResumeGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumeGameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
