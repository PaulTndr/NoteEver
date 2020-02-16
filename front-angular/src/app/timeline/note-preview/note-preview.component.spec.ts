import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotePreviewComponent } from './note-preview.component';

describe('NotePreviewComponent', () => {
  let component: NotePreviewComponent;
  let fixture: ComponentFixture<NotePreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotePreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
