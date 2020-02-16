import { Component, OnInit, Input } from '@angular/core';
import { Note } from 'src/models/Note';

@Component({
  selector: 'app-note-preview',
  templateUrl: './note-preview.component.html',
  styleUrls: ['./note-preview.component.css']
})
export class NotePreviewComponent implements OnInit {
  @Input() note: Note;
  constructor() { }

  ngOnInit() {
  }

}
