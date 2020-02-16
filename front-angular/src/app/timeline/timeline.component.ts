import { NoteManagmentService } from '../NoteManagment.service';
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

  constructor(private noteManagmentService : NoteManagmentService) { }

  ngOnInit() {
    this.noteManagmentService.getNotes();
    this.listNotesSubscription = this.noteManagmentService.listNotesSubject.subscribe(
      (listNotes: Note[]) => {
        this.listNotes = listNotes.slice();
        this.listNotes.reverse()
      }
    );
    this.noteManagmentService.emitListNotesSubject();
  }

}
