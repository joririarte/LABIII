import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgZorroModule } from '../../ng-zorro.module';
import { LandingComponent } from './pages/landing/landing.component';

@NgModule({
  declarations: [
    LandingComponent,
  ],
  imports: [
    CommonModule,
    NgZorroModule,
    RouterModule,
    NgxChartsModule
  ],
})
export class LandingModule {}
