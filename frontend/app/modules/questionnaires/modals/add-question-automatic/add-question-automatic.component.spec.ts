import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuestionAutomaticComponent } from './add-question-automatic.component';

describe('AddQuestionAutomaticComponent', () => {
  let component: AddQuestionAutomaticComponent;
  let fixture: ComponentFixture<AddQuestionAutomaticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddQuestionAutomaticComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddQuestionAutomaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
