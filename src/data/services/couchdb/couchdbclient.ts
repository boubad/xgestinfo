import * as axios from "axios";
import { ICouchDBUpdateResponse, ICouchDBFindResponse } from "./couchdbdefs";
import { IDataStore } from "../idatastore";
import {DEFAULT_DB_URL,DEFAULT_DBNAME} from '../impl/servicedefs';
import { IAttachmentInfo } from "../../iattachmentinfo";
//

export const STRING_ID_IMPL = "_id";
export const STRING_REV_IMPL = "_rev";
const STRING_FIND_IMPL = "_find";
export const STRING_ATTACHMENTS_IMPL = "_attachments";
const STRING_ETAG = 'etag';
//
export class CouchDBClient implements IDataStore {
    protected _baseurl:string;
    //
    constructor(dbname?: string, baseurl?: string) {
        let db =
          dbname !== undefined && dbname !== null
            ? dbname.trim().toLowerCase()
            : DEFAULT_DBNAME;
        let url =
          baseurl !== undefined && baseurl !== null && baseurl.length > 0 ? baseurl : DEFAULT_DB_URL;
        this._baseurl = url + "/" + db + "/";
      } // constructor
      //
       public formBlobUrl(docid: string, attname: string): string {
        return this._baseurl + encodeURI(docid) + "/" + encodeURI(attname);
      }
      //
      public async findManyDocs(ids:string[]) : Promise<Object[]>{
        let oRet = new Array<Object>();
        if (ids !== undefined && ids !== null){
           let n = ids.length;
           for (let i = 0; i < n; i++){
               let id = ids[i];
               if (id !== undefined && id !== null){
                 let sid = id.trim();
                 if (sid.length > 0){
                   let p = await this.findDocById(sid);
                   if (p !== undefined && p !== null){
                     if (p[STRING_ID_IMPL] !== undefined && p[STRING_ID_IMPL] !== null){
                       oRet.push(p);
                     }
                   }//p
                 }// sId
               }// id
           }// i
        }// ids
        return oRet;
      }//findManyDocs
     
      public async getById(sid:string): Promise<Object> {
         let oRet = {};
         try {
            let rsp = await axios.default.get(this._baseurl + encodeURI(sid));
            if (rsp !== undefined && rsp !== null){
              if (rsp.status == 200 || rsp.status == 304){
                  oRet = rsp.data;
              }
            }// rsp
         }catch(e) {

         }
         return oRet;
      }// getById
      public async getAttachmentsById(sid:string): Promise<IAttachmentInfo[]> {
        let oRet = new Array<IAttachmentInfo>();
        try {
          let rsp = await axios.default.get(this._baseurl + encodeURI(sid));
            if (rsp !== undefined && rsp !== null){
              if (rsp.status == 200 || rsp.status == 304){
                  let o = rsp.data;
                  if (o[STRING_ATTACHMENTS_IMPL] !== undefined && o[STRING_ATTACHMENTS_IMPL] !== null){
                     let ox = o[STRING_ATTACHMENTS_IMPL];
                     for (let name in ox){
                        let p:IAttachmentInfo = ox[name];
                        p.name = name;
                        oRet.push(p);
                     }// name
                  }// attachment
              }
            }// rsp
        }catch(e){}
        return oRet;
      }//getAttachmentsById
      public async getDocRevision(sId: string): Promise<string> {
        let sRet: string = "";
        try {
          let rsp = await axios.default.head(this._baseurl + encodeURI(sId));
          let hh = rsp.headers;
          let v = hh[STRING_ETAG];
          if (v !== undefined && v !== null) {
            let sx: string = v as string;
            let n = sx.length;
            if (n > 2) {
              sRet = sx.slice(1, n - 1);
            }
          }
        } catch (e) {}
        return sRet;
      } //getDocRevision
      public async isAlive(): Promise<boolean> {
        let bRet = false;
        try {
          let rsp = await axios.default.head(this._baseurl);
          bRet = rsp.status == 200;
        } catch (e) {
          console.error(e);
        }
        return bRet;
      } // isAlive
      public async maintainsBlob(
        sid: string,
        attname: string,
        attype: string,
        bdata: Blob
      ): Promise<string> {
        let sRet = "";
        try {
          let srev = await this.getDocRevision(sid);
          if (srev.length > 0) {
            let sUrl = this._baseurl + encodeURI(sid) + "/" + encodeURI(attname);
            let rsp = await axios.default.put(sUrl, bdata, {
              headers: {
                "Content-Type": attype
              },
              params: {
                rev: srev
              }
            });
            if (rsp.status == 200 || rsp.status == 202) {
              sRet = sUrl;
            }
          } // srev
        } catch (e) {
          console.error(e);
        }
        return sRet;
      } //maintainsBlob
      public async removeBlob(
        sid: string,
        attname: string
      ): Promise<boolean> {
        let bRet = false;
        try {
          let srev = await this.getDocRevision(sid);
          if (srev.length > 0) {
            let sUrl = this._baseurl + encodeURI(sid) + "/" + encodeURI(attname);
            let rsp = await axios.default.delete(sUrl, {
              params: {
                rev: srev
              }
            });
            if (rsp.status == 200 || rsp.status == 202) {
              bRet = true;
            }
          } // srev
        } catch (e) {
          console.error(e);
        }
        return bRet;
      } //removeAttachment
      public async findDocsBySelector(
        sel: Object,
        start?: number,
        count?: number,
        ff?: string[]
      ): Promise<Object[]> {
        let oRet = new Array<Object>();
        try {
          let sUrl = this._baseurl + STRING_FIND_IMPL;
          if (ff !== undefined && ff !== null && ff.length > 0) {
            let opts = {
              fields: ff,
              skip: start !== undefined && start != null && start >= 0 ? start : 0,
              limit: count !== undefined && count !== null && count > 0 ? count : 128,
              selector: sel
            };
            let rsp: axios.AxiosResponse<
              ICouchDBFindResponse<Object>
            > = await axios.default.post(sUrl, opts);
            if (rsp.status == 200) {
              oRet = rsp.data.docs;
            }
          } else {
            let opts = {
              skip: start !== undefined && start != null && start >= 0 ? start : 0,
              limit: count !== undefined && count !== null && count > 0 ? count : 128,
              selector: sel
            };
            let rsp: axios.AxiosResponse<
              ICouchDBFindResponse<Object>
            > = await axios.default.post(sUrl, opts);
            if (rsp.status == 200) {
              oRet = rsp.data.docs;
            }
          }
        } catch (e) {
          console.error(e);
        }
        return oRet;
      } //findDocBySelector
      public async findDocById(sId: string): Promise<Object> {
        let oRet = {};
         try {
            let rsp = await axios.default.get(this._baseurl + encodeURI(sId));
            if (rsp !== undefined && rsp !== null){
              if (rsp.status == 200 || rsp.status == 304){
                  oRet = rsp.data;
              }
            }// rsp
         }catch(e) {

         }
         return oRet;
      } // readDocById
      public async createDoc(doc: Object): Promise<ICouchDBUpdateResponse> {
        let oRet = {};
        try {
          let sId: string =
            doc[STRING_ID_IMPL] !== undefined && doc[STRING_ID_IMPL] !== null
              ? doc[STRING_ID_IMPL]
              : "";
          if (sId.length < 1) {
            let rsp: axios.AxiosResponse<
              ICouchDBUpdateResponse
            > = await axios.default.post(this._baseurl, doc);
            if (rsp.status == 202 || rsp.status == 201) {
              oRet = rsp.data;
            }
          } else {
            let sUrl = this._baseurl + encodeURI(sId);
            let rsp: axios.AxiosResponse<
              ICouchDBUpdateResponse
            > = await axios.default.put(sUrl, doc);
            if (rsp.status == 202 || rsp.status == 201) {
              oRet = rsp.data;
            }
          }
        } catch (e) {
          console.error(e);
        }
        return oRet;
      } // createDoc
      public async maintainsDoc(doc:Object) : Promise<boolean> {
        let oRet = false;
        try {
          let sId: string =
            doc[STRING_ID_IMPL] !== undefined && doc[STRING_ID_IMPL] !== null
              ? doc[STRING_ID_IMPL]
              : "";
          if (sId.length < 1) {
            let rx = await this.createDoc(doc);
            if (rx !== undefined && rx !== null && rx.ok){
               doc[STRING_ID_IMPL] = rx.id;
               doc[STRING_REV_IMPL] = rx.rev;
               return true;
            } else {
              return false;
            }
          }
          let sRev = await this.getDocRevision(sId);
          if (sRev.length < 1) {
            let rx = await this.createDoc(doc);
            if (rx !== undefined && rx !== null && rx.ok){
               doc[STRING_ID_IMPL] = rx.id;
               doc[STRING_REV_IMPL] = rx.rev;
               return true;
            } else {
              return false;
            }
          }
          let old = await this.findDocById(sId);
          if (
            old !== undefined &&
            old !== null &&
            old[STRING_ID_IMPL] !== undefined &&
            old[STRING_REV_IMPL] !== undefined
          ) {
            let aa = old[STRING_ATTACHMENTS_IMPL];
            if (aa !== undefined && aa !== null) {
              doc[STRING_ATTACHMENTS_IMPL] = aa;
            }
            let sUrl = this._baseurl + encodeURI(sId);
            let rsp: axios.AxiosResponse<
              ICouchDBUpdateResponse
            > = await axios.default.put(sUrl, doc, {
              params: {
                rev: sRev
              }
            });
            if (rsp.status == 202 || rsp.status == 201) {
              doc[STRING_REV_IMPL] = rsp.data.rev;
              oRet = true;
            } else {
              return false;
            }
          } // old
        } catch (e) {
          console.error(e);
        }
        return oRet;
      }// maintainsDoc
      public async removeDoc(sId: string): Promise<boolean> {
        let oRet = false;
        try {
          let sRev = await this.getDocRevision(sId);
          if (sRev.length > 0) {
            let sUrl = this._baseurl + encodeURI(sId);
            let rsp: axios.AxiosResponse<
              ICouchDBUpdateResponse
            > = await axios.default.delete(sUrl, {
              params: {
                rev: sRev
              }
            });
            if (rsp.status == 202 || rsp.status == 200) {
               let r = rsp.data;
               oRet = (r.ok !== undefined && r.ok !== null) ? r.ok : false;
            }
          }
        } catch (e) {
          console.error(e);
        }
        return oRet;
      } // deleteDoc
}// class CouchDBClient
