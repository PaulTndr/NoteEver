import { Component, OnInit } from '@angular/core';
import { Note } from 'src/models/Note';
import { NoteManagmentService } from '../NoteManagment.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent implements OnInit {

  nbrCarac : number = 0;
  newNote : Note = new Note();
  isCompleted : Boolean = false;
  limitCarac: number = 150;

  constructor(private noteManagmentService : NoteManagmentService) { }

  ngOnInit() {
    this.newNote.date=new Date();
    this.newNote.category=new String();
    this.newNote.text=new String();
  }

  checkSizeTxt(){
    setTimeout(
      ()=>{
        this.nbrCarac = this.newNote.text ? this.newNote.text.length : 0;
        if(this.newNote.text && this.limitCarac<this.newNote.text.length){
          this.newNote.text = this.newNote.text.substring(0, this.newNote.text.length - 1);
          this.nbrCarac = this.limitCarac;
        }
        this.checkCompleted()
      },0)
  }

  selectCategory(keyCategorie : string){
    this.newNote.category=keyCategorie;
    this.checkCompleted()
  }

  post(){
    this.noteManagmentService.postNote(this.newNote);
  }

  checkCompleted(){
    if(this.newNote.category!='' && this.newNote.text!=''){
      this.isCompleted = true;
    } else{
      this.isCompleted = false;
    }
  }
}
