import { NoteService } from './timeline/note.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TimelineComponent } from './timeline/timeline.component';
import { NotePreviewComponent } from './timeline/note-preview/note-preview.component';

@NgModule({
  declarations: [
    AppComponent,
    TimelineComponent,
    NotePreviewComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [NoteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
