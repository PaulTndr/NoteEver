import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { AppComponent } from './app.component';
import { TimelineComponent } from './timeline/timeline.component';
import { NotePreviewComponent } from './timeline/note-preview/note-preview.component';
import { AddNoteComponent } from './add-note/add-note.component';

import { NoteManagmentService } from './NoteManagment.service'

@NgModule({
  declarations: [
    AppComponent,
    TimelineComponent,
    NotePreviewComponent,
    AddNoteComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [NoteManagmentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
