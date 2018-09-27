import { BaseElement } from './baseelement';
import { IEtudiant } from "./IEtudiant";
import { IInfoDataManager } from './services/iinfodatamanager';
import { IListItem } from './IListItem';
import { IEtudiantData } from './IEtudiantData';
//
export class Etudiant extends BaseElement{
    private _groupe?:string;
    private _firstname?:string;
    private _lastname?:string;
    private _avatar?:string;
    //
    constructor(data?:IEtudiant){
        super(data);
        this._type = Etudiant.doc_type;
        if (data !== undefined && data !== null){
            this._groupe = data.groupe;
            this._firstname = data.firstname;
            this._lastname = data.lastname;
            this._avatar = data.avatar;
        }// data
    }// constructor
    //
    public static get doc_type():string{
        return 'etud';
    }
    //
    public static async getEtudiantById(pMan:IInfoDataManager,docid:string) : Promise<Etudiant> {
        if (docid === undefined || docid == null){
          return new Etudiant();
        }
        let sid = docid.trim();
        if (sid.length < 1){
            return new Etudiant();
        }
        let o:IEtudiant = await pMan.findDocById(sid);
        let pRet = new Etudiant(o);
        if (!pRet.has_id || !pRet.has_rev){
            return new Etudiant();
        }
        let avatar = pRet.avatar;
        if (avatar.length > 0){
            pRet.url = pMan.formBlobUrl(pRet.id,avatar);
        }
        return pRet;
    }//getEtudiantById
    //
    public static async getEtudiantsListItems(pMan:IInfoDataManager,groupe?:string) : Promise<IListItem[]> {
        let oRet = new Array<IListItem>();
        let sel = {
            type: Etudiant.doc_type
        };
        if (groupe !== undefined && groupe !== null){
            sel['groupe'] = groupe.trim().toUpperCase();
        }
        let oo:IEtudiantData[] = await pMan.findDocsBySelector(sel,0,128,["_id","name","avatar"]);
        if (oo !== undefined && oo !== null){
            let n = oo.length;
            for (let i = 0; i < n; i++){
                let p = oo[i];
                let docid = (p._id !== undefined && p._id !== null) ? p._id: "";
                let avatar = (p.avatar !== undefined && p.avatar !== null)? p.avatar: "";
                let name = (p.name !== undefined && p.name !== null) ? p.name : "";
                let url = ''
                if (avatar.length > 0){
                    url = pMan.formBlobUrl(docid,avatar);
                }
                oRet.push({
                    docid: docid,
                    url: url,
                    displayText: name,
                });
            }// i
        }// oo
        if (oRet.length > 1){
            oRet.sort((a,b)=>{
                if (a.displayText < b.displayText){
                    return -1;
                } else if (a.displayText > b.displayText){
                    return 1;
                } else {
                    return 0;
                }
            });
        }// sort
        return oRet;
    }//getEtudiantsListItems
    //
    public static async getEtudiants(pMan:IInfoDataManager,groupe?:string) : Promise<Etudiant[]> {
        let oRet = new Array<Etudiant>();
        let sel = {
            type: Etudiant.doc_type
        };
        if (groupe !== undefined && groupe !== null){
            sel['groupe'] = groupe.trim().toUpperCase();
        }
        let oo:IEtudiant[] = await pMan.findDocsBySelector(sel,0,512);
        if (oo !== undefined && oo !== null){
            let n = oo.length;
            for (let i = 0; i < n; i++){
                let p = new Etudiant(oo[i]);
                let avatar = p.avatar;
                if (avatar.length > 0){
                    p.url = pMan.formBlobUrl(p.id,avatar);
                }
                p._modified = false;
                oRet.push(p);
            }// i
        }// oo
        return oRet;
    }//getEtudiants
    //
    public async change_avatar(pMan:IInfoDataManager, attname:string, attype:string,data:Blob) : Promise<boolean>{
        if (!this.has_rev){
            return false;
        }
        let bRet = await pMan.maintainsItemAttachment(this,attname,attype,data);
        if (bRet){
            this.avatar = attname;
            return pMan.maintainsBaseItem(this);
        }
        return false;
    }// change_avatar
   
    //
    public clear(): void {
        super.clear();
        this._groupe = undefined;
        this._firstname = undefined;
        this._lastname = undefined;
        this._avatar = undefined;
    } // clear
    public getMap(oMap: Object): void {
        super.getMap(oMap);
        if (this._groupe !== undefined && this._groupe !== null && this._groupe.length > 0){
            oMap['groupe'] = this._groupe;
        }
        if (this._firstname !== undefined && this._firstname !== null && this._firstname.length > 0){
            oMap['firstname'] = this._firstname;
        }
        if (this._lastname !== undefined && this._lastname !== null && this._lastname.length > 0){
            oMap['lastname'] = this._lastname;
        }
        if (this._avatar !== undefined && this._avatar !== null && this._avatar.length > 0){
            oMap['avatar'] = this._avatar;
        }
    }// getMap
    //
    public clone(): Etudiant {
        let oMap = {};
        this.getMap(oMap);
        let p = new Etudiant(oMap);
        p._modified = this._modified;
        p.url = this.url;
        return p;
    }
    //
    public get groupe():string{
        return (this._groupe !== undefined && this._groupe !== null) ? this._groupe : "";
    }
    public set groupe(s:string){
        let ss = (s !== undefined && s !== null) ? s.trim().toUpperCase() : "";
        if (ss != this.groupe){
            this._groupe = ss;
           
            this._modified = true;
        }
    }
    private check_names(): string {
        let s1 = (this._lastname !== undefined && this._lastname !== null) ? this._lastname : '';
        let s2 = (this._firstname !== undefined && this._firstname !== null) ? this._firstname : '';
        return (s1 + ' ' + s2).trim();
    }
    public get lastname():string{
        return (this._lastname !== undefined && this._lastname !== null) ? this._lastname : "";
    }
    public set lastname(s:string){
        let ss = (s !== undefined && s !== null) ? s.trim().toUpperCase() : "";
        if (ss != this.lastname){
            this._lastname = ss;
            this.name = this.check_names();
            this._modified = true;
        }
    }
    public get firstname():string{
        return (this._firstname !== undefined && this._firstname !== null) ? this._firstname : "";
    }
    public set firstname(s:string){
        let ss = this.formatName(s);
        if (ss != this.firstname){
            this._firstname = ss;
            this.name = this.check_names();
            this._modified = true;
        }
    }
    public get fullname():string{
        return this.name;
    }
    public get avatar():string{
        return (this._avatar !== undefined && this._avatar !== null) ? this._avatar : "";
    }
    public set avatar(s:string){
        let ss = (s !== undefined && s !== null) ? s.trim(): "";
        if (ss != this.avatar){
            this._avatar = ss;
            this._modified = true;
        }
    }
    //
}// class Etudiant
