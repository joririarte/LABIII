import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgZorroModule } from '../../ng-zorro.module';
import { QuestionnairesComponent } from './pages/questionnaires/questionnaires.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResumeGameComponent } from './modals/resume-game/resume-game.component';
import { QuestionnaireListComponent } from './pages/questionnaire-list/questionnaire-list.component';
import { QuestionnaireCreateComponent } from './modals/questionnaire-create/questionnaire-create.component';
import { AddQuestionComponent } from './modals/add-question/add-question.component';
import { AddQuestionAutomaticComponent } from './modals/add-question-automatic/add-question-automatic.component';


@NgModule({
  declarations: [
    QuestionnairesComponent,
    ResumeGameComponent,
    QuestionnaireListComponent,
    QuestionnaireCreateComponent,
    AddQuestionComponent,
    AddQuestionAutomaticComponent
  ],
  imports: [
    NgZorroModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers:[
    DatePipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class QuestionnairesModule { }
