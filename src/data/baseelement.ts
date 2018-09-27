import { BaseItem } from './baseitem';
import { IBaseElement } from "./IBaseElement";
export class BaseElement extends BaseItem {
    private _attached_docs?:string[];
    //
    constructor(data?:IBaseElement){
        super(data);
        if (data !== undefined && data !== null){
            if (data.attached_docs !== undefined && data.attached_docs !== null && data.attached_docs.length > 0){
               this._attached_docs = data.attached_docs;
            }// doc
        }// data
    }// constructor
    //
    public clear(): void {
        super.clear();
        this._attached_docs = undefined;
     }// clear
     public getMap(oMap: Object): void {
         super.getMap(oMap);
         if (this._attached_docs !== undefined && this._attached_docs !== null && this._attached_docs.length > 0){
           oMap['attached_docs'] = this._attached_docs;
         }// n
     }// getMap
     public get docs_id():string[] {
         return (this._attached_docs !== undefined && this._attached_docs !== null) ? this._attached_docs : [];
     }
     public add_attacheddoc_id(s:string) {
        if (s !== undefined && s !== null){
            let ss = s.trim();
            if (ss.length > 0){
                let pp = (this._attached_docs !== undefined && this._attached_docs !== null) ? this._attached_docs : [];
                for (let i = 0; i < pp.length; i++){
                    if (pp[i] == ss){
                        return;
                    }
                }// i
                pp.push(ss);
                this._attached_docs = pp;
                this._modified = true;
            }// ss
        }// s
     }// add_attacheddoc_id
     public remove_attacheddoc_id(s:string) {
        if (s !== undefined && s !== null){
            let ss = s.trim();
            if (ss.length > 0){
                let pp = (this._attached_docs !== undefined && this._attached_docs !== null) ? this._attached_docs : [];
                let ppx = new Array<string>();
                for (let i = 0; i < pp.length; i++){
                    if (pp[i] != ss){
                        ppx.push(pp[i]);
                    }
                }// i
                if (pp.length != ppx.length){
                    this._attached_docs = ppx;
                    this._modified = true;
                }
            }// ss
        }// s
     }// add_attacheddoc_id
}// class BaseElement
