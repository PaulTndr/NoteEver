import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { Note } from 'src/models/Note';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class NoteManagmentService {

  listNotes: Note[] = [];
  listNotesSubject= new Subject<Note[]>();

  apiUrl = environment.apiUrl;

  constructor(private httpClient : HttpClient, private router : Router) {}

  getNotes(){
    this.httpClient.get<any>(this.apiUrl + '/notes').subscribe(
      (response) => {
          this.listNotes = [];
          console.log('Found ' + response.length + ' offers');
          response.forEach((noteJson) => {
              const note = new Note();
              note.fromHashMap(noteJson);
              this.listNotes.push(note);
          });
          console.log(this.listNotes);
          this.emitListNotesSubject();
      },
      (error) => {
          console.log('Erreur ! : ' + error);
      }
    );
  }

  postNote(note : Note){
    this.httpClient.post<Note>(this.apiUrl + '/notes/post', note).subscribe(
      (response) => {
          console.log("The note has been posted !")
          this.listNotes.push(note);
          this.emitListNotesSubject();
          this.router.navigate(['timeline']);
      },
      (error) => {
          console.log('Erreur ! : ' + error);
      }
    );
  }

  refreshCategories(mapCategories:any){
    let listCategoriesStr=""
    Object.keys(mapCategories).forEach((categorie)=>{
      if (mapCategories[categorie]){
        listCategoriesStr+=categorie+";"
      }
    })
    if (listCategoriesStr!==""){
      listCategoriesStr = listCategoriesStr.substring(0, listCategoriesStr.length - 1);
    }
    console.log(listCategoriesStr)
    this.httpClient.get<any>(this.apiUrl + '/notes/categoryFiltered?categories='+listCategoriesStr).subscribe(
      (response) => {
          this.listNotes = [];
          console.log('Found ' + response.length + ' offers');
          response.forEach((noteJson) => {
              const note = new Note();
              note.fromHashMap(noteJson);
              this.listNotes.push(note);
          });
          console.log(this.listNotes);
          this.emitListNotesSubject();
      },
      (error) => {
          console.log(error);
      }
    );
  }

  emitListNotesSubject(){
    this.listNotesSubject.next(this.listNotes.length!==0 ? this.listNotes.slice() : []);
  }
}
