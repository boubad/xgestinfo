import { BaseElement } from './baseelement';
import { INote } from "./INote";

export class Note extends BaseElement {
    private _etudiantid?:string;
    private _eventid?:string;
    private _value?:number;
    //
    constructor(data?:INote){
        super(data);
        if (data !== undefined && data !== null){
            this._etudiantid = data.etudiantid;
            this._eventid = data.eventid;
            this._value = data.value;
        }
        this._type = Note.doc_type;
    }// constructor
    //
    public static get doc_type():string{
        return 'note';
    }
    //
    public clear(): void {
        super.clear();
        this._etudiantid = undefined;
        this._eventid = undefined;
        this._value = undefined;
    } // clear
    public getMap(oMap: Object): void {
        super.getMap(oMap);
        if (this._etudiantid !== undefined && this._etudiantid !== null && this._etudiantid.length > 0){
            oMap['etudiantid'] = this._etudiantid;
        }
        if (this._eventid !== undefined && this._eventid !== null && this._eventid.length > 0){
            oMap['eventid'] = this._eventid;
        }
        if (this._value !== undefined && this._value !== null && this._value >= 0 && this._value <= 20) {
            oMap['value'] = this._value;
        } 
    }// getMap
    //
    public clone(): Note {
        let oMap = {};
        this.getMap(oMap);
        let p = new Note(oMap);
        p._modified = this._modified;
        p.url = this.url;
        return p;
    }
    public get eventid(): string {
        return this._eventid !== undefined && this._eventid !== null ?
            this._eventid :
            "";
    }
    public set eventid(s: string) {
        let ss = s !== undefined && s !== null ? s.trim() : "";
        if (ss != this.eventid) {
            this._eventid = ss;
            this.name = this.check_names();
            this._modified = true;
        }
    }
    //
    private check_names():string{
        let s1 = (this._etudiantid !== undefined && this._etudiantid !== null) ? this._etudiantid : "";
        let s2 = (this._eventid !== undefined && this._eventid !== null) ? this._eventid : "";
        return (s1 + s2).trim();
    }
    public get etudiantid(): string {
        return this._etudiantid !== undefined && this._etudiantid !== null ?
            this._etudiantid :
            "";
    }
    public set etudiantid(s: string) {
        let ss = s !== undefined && s !== null ? s.trim() : "";
        if (ss != this.etudiantid) {
            this._etudiantid = ss;
            this.name = this.check_names();
            this._modified = true;
        }
    }
    //
    public is_storeable(): boolean {
        return (this.etudiantid.length > 0 && this.eventid.length > 0);
    } // is_storeable
    //
}// class Note
