import { Injectable } from "@angular/core";
import { Note } from 'src/models/Note';
import { Subject } from 'rxjs';

@Injectable()
export class NoteService {

  listNotes: Note[] = [];
  listNotesSubject= new Subject<Note[]>();

  constructor() {
    
  }

  getNotes(){
    let note1=new Note();
    note1.text="Il fait plus froid au pôle sud qu'au pôle nord.";
    note1.date=new Date(9,3,2015);
    note1.category="Nature";
    this.listNotes.push(note1)

    let note2=new Note();
    note2.text="Les frameworks JS sont maintenant quasi obligatoires côté front.";
    note2.date=new Date(14,4,2015);
    note2.category="Technologies";
    this.listNotes.push(note2)

    let note3=new Note();
    note3.text="Il fait plus froid au pôle sud qu'au pôle nord.";
    note3.date=new Date(9,3,2016);
    note3.category="Nature";
    this.listNotes.push(note3);
    
    this.emitListNotesSubject()
  }

  emitListNotesSubject(){
    this.listNotesSubject.next(this.listNotes.length!==0 ? this.listNotes.slice() : []);
  }
}
