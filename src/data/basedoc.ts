import { IBaseDoc } from "./IBaseDoc";

export class BaseDoc {
  //
  private _id?: string;
  private _rev?: string;
  private _deleted?: boolean;
  protected _attachments?: Object;
  //
  constructor(data?: IBaseDoc) {
    if (data !== undefined && data !== null) {
      this._id = data._id;
      this._rev = data._rev;
      this._deleted = data._deleted;
      this._attachments = data._attachments;
    }
  } // constructor
  //
  public clear(): void {
    this._id = undefined;
    this._rev = undefined;
    this._deleted = undefined;
    this._attachments = undefined;
  }// clear
  //
  public getMap(oMap: Object): void {
    if (this._id !== undefined && this._id !== null && this._id.length > 0) {
      oMap["_id"] = this._id;
    }
    if (this._rev !== undefined && this._rev !== null && this._rev.length > 0) {
      oMap["_rev"] = this._rev;
    }
  } // getMap
  //
  public get id(): string {
    return this._id !== undefined && this !== null ? this._id : "";
  }
  public set id(s: string) {
    this._id = s !== undefined && s !== null ? s.trim() : undefined;
  }
  public get rev(): string {
    return this._rev !== undefined && this._rev !== null ? this._rev : "";
  }
  public set rev(s: string) {
    this._rev = s !== undefined && s !== null ? s.trim() : "";
  }
  public get has_id(): boolean {
    return this._id !== undefined && this._id !== null && this._id.length > 0;
  }
  public get has_rev(): boolean {
    return (
      this._id !== undefined &&
      this._id !== null &&
      this._id.length > 0 &&
      this._rev !== undefined &&
      this._rev !== null &&
      this._rev.length > 0
    );
  }
  public get is_deleted():boolean {
      return (this._deleted !== undefined && this._deleted !== null) ? this._deleted : false;
  }
  public is_storeable(): boolean {
    return true;
  }
} // class BaseDoc
