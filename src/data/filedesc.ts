import { UIManager } from "./uimanager";
interface MyEvent extends EventTarget {
  target: { files: any; result: any };
}
export class FileDesc {
  //
  private _filename?: string;
  private _filetype?: string;
  private _filedata?: Blob;
  private _dataurl?: string;
  //
  constructor() {} // constructor
  public get name(): string {
    return this._filename !== undefined ? this._filename : "";
  }
  public get type(): string {
    return this._filetype !== undefined ? this._filetype : "";
  }
  public get data(): Blob | null {
    return this._filedata !== undefined ? this._filedata : null;
  }
  public get url(): string {
    return this._dataurl !== undefined ? this._dataurl : "";
  }
  public get has_url(): boolean {
    return this.url !== null;
  }
  public get is_storeable(): boolean {
    return (
      this.name !== null &&
      this.type !== null &&
      (this.data !== undefined && this.data !== null)
    );
  }
  public clear_url(): void {
    this._dataurl = "";
  }
  public clear(): void {
    this._filename = "";
    this._filetype = "";
    this._filedata = undefined;
    this._dataurl = "";
  }
  public async setFile(file: any) : Promise<void>{
    this.clear();
    let fr = new FileReader();
    fr.onloadend = (e: any) => {
      let data = e.target.result;
      let dd = new Uint8Array(data);
      let blob = new Blob([dd]);
      this._filedata = blob;
      this._filename = file.name;
      this._filetype = file.type;
      if (this._dataurl !== null) {
        UIManager.revokeUrl(this.url);
        this._dataurl = "";
      }
      if (this._filedata !== null) {
        this._dataurl = UIManager.createUrl(this._filedata);
      }
    };
    await fr.readAsArrayBuffer(file);
  } // setFile
  public async changed(event: MyEvent, bUrl?: boolean): Promise<any> {
    this.clear();
    let files = event.target.files;
    if (files !== undefined && files !== null && files.length > 0) {
      let file = files[0];
      let fr = new FileReader();
      fr.onloadend = (e: any) => {
        let data = e.target.result;
        let dd = new Uint8Array(data);
        let blob = new Blob([dd]);
        this._filedata = blob;
        this._filename = file.name;
        this._filetype = file.type;
        if (this._dataurl !== null) {
          UIManager.revokeUrl(this.url);
          this._dataurl = "";
        }
        if (this._filedata !== null) {
          if (bUrl !== undefined && bUrl !== null && bUrl == true) {
            this._dataurl = UIManager.createUrl(this._filedata);
          }
        }
      };
      fr.readAsArrayBuffer(file);
    } // files
  } // fileChanged
} // class FileDesc
