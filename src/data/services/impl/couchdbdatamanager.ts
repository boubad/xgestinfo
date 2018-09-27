import { CouchDBClient } from "../couchdb/couchdbclient";
import { BaseItem } from "../../baseitem";
import { IInfoDataManager } from "./../iinfodatamanager";
import { AttachedDoc } from "../../attacheddoc";

//
//
export class CouchDBDataManager extends CouchDBClient
  implements IInfoDataManager {
  constructor(dbname?: string, dburl?: string) {
    super(dbname, dburl);
  } // constructor
  //
  public async findItemAttachedDocs(sid: string): Promise<AttachedDoc[]> {
    let oRet = new Array<AttachedDoc>();
    let pp = await this.getAttachmentsById(sid);
    let n = pp.length;
    for (let i = 0; i < n; i++) {
      let p = pp[i];
      let pz = new AttachedDoc(sid, p);
      pz.url = this.formBlobUrl(sid, pz.name);
      oRet.push(pz);
    } // i
    if (oRet.length > 1) {
      oRet.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        } else if (a.name > b.name) {
          return 1;
        } else {
          return 0;
        }
      });
    } // oRet
    return oRet;
  } //findItemAttachedDocs
  //
  public async maintainsItemAttachment<T extends BaseItem>(
    doc: T,
    attname: string,
    attype: string,
    data: Blob
  ): Promise<string> {
    if (!doc.has_id) {
      return "";
    }
    return this.maintainsBlob(doc.id, attname, attype, data);
  } //  maintainsItemAttachment
  public async removeItemAttachment<T extends BaseItem>(
    doc: T,
    attname: string
  ): Promise<boolean> {
    if (!doc.has_id) {
      return false;
    }
    return this.removeBlob(doc.id, attname);
  } //removeItemAttachment
  public async maintainsBaseItem<T extends BaseItem>(doc: T): Promise<boolean> {
    if (!doc.is_storeable()) {
      return false;
    }
    let oMap = {};
    doc.getMap(oMap);
    let sel = doc.unique_selector;
    let oo = await this.findDocsBySelector(sel, 0, 1);
    if (oo["_id"] !== undefined && oo["_id"] !== null) {
      oMap["_id"] = oo["_id"];
      doc.id = oo["_id"];
    }
    return this.maintainsDoc(oMap);
  } //maintainsBaseItem
  public async removeBaseItem<T extends BaseItem>(doc: T): Promise<boolean> {
    if (!doc.has_id) {
      return false;
    }
    return this.removeDoc(doc.id);
  } //removeBaseItem
} // class CouchDBDataManager
