import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './pages/main/main.component';
import { NgZorroModule } from '../../ng-zorro.module';
import { AppRoutingModule } from '../../app-routing.module';

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    NgZorroModule,
  ],
})
export class MainModule {}
