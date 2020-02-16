interface NoteData {
    _id: String
    text: String
    category: String
    date: Date
}

export class Note {
    id:String;
    text:String;
    category:String;
    date:Date;

    fromHashMap(data: NoteData) {
        this.id = String(data._id);
        this.text = String(data.text);
        this.category = String(data.category);
        this.date = data.date;
    }
}