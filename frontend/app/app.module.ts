// Global imports
import { NgModule, LOCALE_ID, isDevMode, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

// Ng-zorro-antd
import { IconsProviderModule } from './icons-provider.module';

/** config angular i18n **/
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import localeEsAr from '@angular/common/locales/es-AR';
import localeEs from '@angular/common/locales/es';

//? Modules
import { MainModule } from './modules/main/main.module';
import { NgZorroModule } from './ng-zorro.module';
import { HomeModule } from './modules/home/home.module';
import config from './config/config';
import { ApiConfiguration } from './config/api.configuration';
import { AuthProvider } from './services/auth/auth';
import { BtnInterceptor } from './services/api/interceptor';
// Componentes
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ScoresModule } from './modules/scores/scores.module';
import { es_ES, NZ_I18N } from 'ng-zorro-antd/i18n';
import { QuestionnairesModule } from './modules/questionnaires/questionnaires.module';
import { LandingModule } from './modules/landing/landing.module';

registerLocaleData(localeEs, 'es');
registerLocaleData(localeEsAr, 'es-Ar');
registerLocaleData(es);
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    IconsProviderModule,
    MainModule,
    AuthModule,
    HomeModule,
    UsersModule,
    ScoresModule,
    QuestionnairesModule,
    LandingModule,
    AppRoutingModule,
    NgZorroModule,
    // ServiceWorkerModule.register('ngsw-worker.js', {
    //   enabled: config.environment === Environment.PROD,
    //   registrationStrategy: 'registerImmediately',
    // }),
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: NZ_I18N, useValue: es_ES },
    { provide: LOCALE_ID, useValue: 'es-Ar' },
    { provide: APP_INITIALIZER, useFactory: (config: ApiConfiguration) => () => config.load(), deps: [ApiConfiguration], multi: true },
    ApiConfiguration,
    AuthProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
