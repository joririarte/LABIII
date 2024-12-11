import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgZorroModule } from '../../ng-zorro.module';
import { ScoreComponent } from './pages/score/score.component';


@NgModule({
  declarations: [
    ScoreComponent
  ],
  imports: [
    CommonModule,
    NgZorroModule,
    RouterModule,
  ]
})
export class ScoresModule { }
