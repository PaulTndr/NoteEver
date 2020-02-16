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
  mapCategoriesOnFilter:any;
  

  constructor(private noteManagmentService : NoteManagmentService) { }

  ngOnInit() {
    this.mapCategoriesOnFilter= {
      'nature':true,
      'science':true,
      'technologie':true,
      'general':true,
      'coding':true,
      'life':true,
    }

    this.noteManagmentService.getNotes();
    this.listNotesSubscription = this.noteManagmentService.listNotesSubject.subscribe(
      (listNotes: Note[]) => {
        this.listNotes = listNotes.slice();
        this.listNotes.reverse()
      }
    );
    this.noteManagmentService.emitListNotesSubject();
  }

  modifyCategories(key : string){
    this.mapCategoriesOnFilter[key]=!this.mapCategoriesOnFilter[key];
    this.noteManagmentService.refreshCategories(this.mapCategoriesOnFilter)
  }

  shuffle(){
    function shuffleArray(array) {
      for (var i = array.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = array[i];
          array[i] = array[j];
          array[j] = temp;
      }
    }
    shuffleArray(this.listNotes);
  }
}
