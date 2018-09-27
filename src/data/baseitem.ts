import { BaseDoc } from "./basedoc";
import { IBaseItem } from "./IBaseItem";
export class BaseItem extends BaseDoc {
  protected _type?: string;
  protected _modified:boolean;
  private _name?: string;
  private _desc?: string;
  private _item_date?:Date;
  private _url?:string;
  //
  constructor(data?: IBaseItem) {
    super(data);
    this._modified = false;
    if (data !== undefined && data !== null) {
      this._type = data.type;
      this._name = data.name;
      this._desc = data.desc;
      this._item_date = data.item_date;
    } else {
      this._item_date = new Date();
    }
  } // constructor
  //
  public clear(): void {
     super.clear();
     this._modified = false;
     this._name = undefined;
     this._desc = undefined;
     this._item_date = undefined;
     this._url = undefined;
  }// clear
  //
  protected formatName(s: string): string {
    let ss = "";
    if (s !== undefined && s !== null) {
      ss = s.trim();
      let n = ss.length;
      if (n > 0) {
        if (n > 1) {
          ss = ss.slice(0, 1).toUpperCase() + ss.slice(1);
        } else {
          ss = ss.toUpperCase();
        }
      } // n
    }
    return ss;
  }
  //
  public getMap(oMap: Object): void {
    super.getMap(oMap);
    if (
      this._type !== undefined &&
      this._type !== null &&
      this._type.length > 0
    ) {
      oMap["type"] = this._type;
    }
    if (
      this._name !== undefined &&
      this._name !== null &&
      this._name.length > 0
    ) {
      oMap["name"] = this._name;
    }
    if (
      this._desc !== undefined &&
      this._desc !== null &&
      this._desc.length > 0
    ) {
      oMap["desc"] = this._desc;
    }
    if (this._item_date !== undefined && this._item_date !== null){
      oMap['item_date'] = this._item_date;
    }
  } // getMap
  //
  public get is_modified():boolean {
    return this._modified;
  }
  public set is_modified(b:boolean){
    this._modified = b;
  }
  public  get unique_selector() : Object {
       return {
           type: {
               $eq: this.type
           },
           name:{
               $eq: this.name
           }
       };
  }// unique_selector
  //
  public get type(): string {
    return this._type !== undefined && this._type !== null ? this._type : "";
  }
  public get name(): string {
    return this._name !== undefined && this._name !== null ? this._name : "";
  }
  public set name(s: string) {
    let ss  = s !== undefined && s !== null ? s.trim() : "";
    if (ss != this.name){
      this._name = ss;
      this._modified = true;
    }
  }
  public get desc(): string {
    return this._desc !== undefined && this._desc !== null ? this._desc : "";
  }
  public set desc(s: string) {
    let ss = s !== undefined && s !== null ? s.trim() : "";
    if (ss != this.desc){
      this._desc = ss;
      this._modified = true;
    }
  }
  public get item_date():Date {
    return (this._item_date !== undefined && this._item_date !== null) ? this.item_date : new Date();
  }
  public set item_date(d:Date) {
    if (d == undefined || d == null){
      if (!this.has_date){
        return;
      }
      this._item_date = undefined;
      this._modified = true;
      return;
    }
    this._item_date = d;
    this._modified = true;
  }
  public get has_date():boolean {
    return (this._item_date !== undefined && this._item_date !== null);
  }
  public get url():string{
    return (this._url !== undefined && this._url !== null) ? this._url : "";
  }
  public set url(s:string){
    this._url = (s !== undefined && s !== null) ? s.trim() : "";
  }
  public get has_url():boolean {
    return (this._url !== undefined && this._url !== null && this._url.length > 0);
  }
  public is_storeable(): boolean {
    return (
      this._type !== undefined &&
      this._type !== null &&
      this._type.length > 0 &&
      this._name !== undefined &&
      this._name !== null &&
      this._name.length > 0
    );
  }
  public get docid():string {
    return this.id;
  }// docid
  public get displayText():string {
    return this.formDisplayText();
  }
  protected formDisplayText():string {
    return this.name;
  }
} // class BaseItem
