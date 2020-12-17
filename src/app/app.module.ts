import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlashcardComponent } from './flashcard/flashcard.component';
import { NavComponent } from './nav/nav.component';
import { ConfigComponent } from './config/config.component';

@NgModule({
  declarations: [
    AppComponent,
    FlashcardComponent,
    NavComponent,
    ConfigComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
