import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './modules/main/pages/main/main.component';
import { HomeComponent } from './modules/home/pages/home/home.component';
import { isDeveloperGuard } from './guards/is-developer.guard';
import { UserComponent } from './modules/users/pages/user/user/user.component';
import { AuthComponent } from './modules/auth/auth/auth.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { CreateUserComponent } from './modules/auth/create-user/create-user.component';
import { isAuthenticatedGuard } from './guards/is-authenticated.guard';
import { QuestionnairesComponent } from './modules/questionnaires/pages/questionnaires/questionnaires.component';
import { ScoreComponent } from './modules/scores/pages/score/score.component';
import { QuestionnaireListComponent } from './modules/questionnaires/pages/questionnaire-list/questionnaire-list.component';
import { LandingComponent } from './modules/landing/pages/landing/landing.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/landing',
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      }
    ],
  },
  {
    path: 'create-user',
    component: CreateUserComponent,
  },
  {
    path: 'landing',
    component: LandingComponent,
  },
  {
    path: 'main',
    component: MainComponent,
    canActivate : [isAuthenticatedGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'users',
        component: UserComponent,
      },
      {
        path: 'questionnaire/:id',
        component: QuestionnairesComponent
      },
      {
        path: 'questionnaire-list',
        component: QuestionnaireListComponent
      },
      {
        path: 'score',
        component: ScoreComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
