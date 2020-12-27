import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlashcardComponent } from './flashcard/flashcard.component';
import { NavComponent } from './nav/nav.component';
import { ConfigComponent } from './config/config.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FlashcardState } from './flashcard/flashcard.state';
import { HttpClientModule } from '@angular/common/http';
import { QuizResultsComponent } from './quiz-results/quiz-results.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FlashcardService } from './flashcard/flashcard.service';
import { AngularFireDatabaseModule } from 'angularfire2/database';

@NgModule({
  declarations: [
    AppComponent,
    FlashcardComponent,
    NavComponent,
    ConfigComponent,
    QuizResultsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot([
      { path: '', component: FlashcardComponent, pathMatch: 'full' },
      { path: 'login', component: LoginComponent }
    ]),
  ],
  providers: [AuthService, FlashcardService, FlashcardState],
  bootstrap: [AppComponent],
})
export class AppModule {}
