import { Component, OnInit } from '@angular/core';
import { Note } from 'src/models/Note';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent implements OnInit {

  currentDate : Date = new Date();
  nbrCarac : number = 0;
  newNote : Note = new Note();

  limitCarac: number = 150;

  constructor() { }

  ngOnInit() {
  }

  checkSizeTxt(){
    setTimeout(
      ()=>{
        this.nbrCarac = this.newNote.text ? this.newNote.text.length : 0;
        if(this.newNote.text && this.limitCarac<this.newNote.text.length){
          this.newNote.text = this.newNote.text.substring(0, this.newNote.text.length - 1);
          this.nbrCarac = this.limitCarac;
        }
      },0)
  }

}
