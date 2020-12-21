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

@NgModule({
  declarations: [
    AppComponent,
    FlashcardComponent,
    NavComponent,
    ConfigComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, FontAwesomeModule],
  providers: [FlashcardState],
  bootstrap: [AppComponent],
})
export class AppModule {}
