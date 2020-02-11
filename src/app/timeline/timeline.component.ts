import { NoteService } from './note.service';
import { Component, OnInit } from '@angular/core';
import { Note } from 'src/models/Note';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  listNotes:Note[]=[];
  listNotesSubscription: Subscription;

  constructor(private noteService : NoteService) { }

  ngOnInit() {
    this.noteService.getNotes();
    this.listNotesSubscription = this.noteService.listNotesSubject.subscribe(
      (listNotes: Note[]) => {
        this.listNotes = listNotes.slice();
      }
    );
    this.noteService.emitListNotesSubject();
  }

}
