import { IAttachmentInfo } from "./iattachmentinfo";

export class AttachedDoc  {
    private _name ? : string;
    private _ownerid ? : string;
    private _mime ? : string;
    private _size ? : number;
    private _url?: string;
    //
    constructor(sid?: string, data ? : IAttachmentInfo) {
        this._ownerid = sid;
        if (data !== undefined && data !== null) {
            this._name = data.name;
            this._mime = data.content_type
            this._size = data.length
        } // data
    } // constructor
    //
    public clear(): void {
        this._name = undefined;
        this._ownerid = undefined;
        this._url = undefined;
        this._mime = undefined;
        this._size = undefined;
    } // clear
    //
    public get url():string{
        return (this._url !== undefined && this._url !== null) ? this._url : "";
      }
      public set url(s:string){
        this._url = (s !== undefined && s !== null) ? s.trim() : "";
      }
      public get has_url():boolean {
        return (this._url !== undefined && this._url !== null && this._url.length > 0);
      }
    public get name(): string {
        return this._name !== undefined && this._name !== null ? this._name : "";
      }
      public set name(s: string) {
        let ss  = s !== undefined && s !== null ? s.trim() : "";
        if (ss != this.name){
          this._name = ss;
        }
      }
    public get ownerid(): string {
        return this._ownerid !== undefined && this._ownerid !== null ?
            this._ownerid :
            "";
    }
    public set ownerid(s: string) {
        let ss = s !== undefined && s !== null ? s.trim() : "";
        if (ss != this.ownerid) {
            this._ownerid = ss;
        }
    }
    public get mime(): string {
        return this._mime !== undefined && this._mime !== null ? this._mime : "";
    }
    public set mime(s: string) {
        let ss = s !== undefined && s !== null ? s.trim() : "";
        if (ss != this.mime) {
            this._mime = ss;
        }
    }
    public get size(): number {
        return this._size !== undefined && this._size !== null ? this._size : 0;
    }
    public set size(s: number) {
        let ss = s !== undefined && s !== null && s > 0 ? s : 0;
        if (ss != this.size) {
            this._size = ss;
        }
    }
    public get is_image(): boolean {
        let s = this.mime;
        return s.length > 0 && s.indexOf("image") == 0;
    } // is_image
    //
} // class AttachedDoc