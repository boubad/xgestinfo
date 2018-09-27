import {
    BaseElement
} from "./baseelement";
import { IEvenement } from "./IEvenement";
import { InfoEventType } from "./InfoEventType";
export class Evenement extends BaseElement {
    private _evt_type ? : InfoEventType;
    private _evt_name ? : string;
    private _etudiantid ? : string;
    //
    constructor(data ? : IEvenement) {
        super(data);
        this._type = Evenement.doc_type;
        if (data !== undefined && data !== null) {
            this._evt_type = data.evt_type;
            this._evt_name = data.evt_name;
            this._etudiantid = data.etudiantid;
        } 
    } // constructor
    //
    public static get doc_type(): string {
        return 'evt';
    }
    //
    public clear(): void {
        super.clear();
        this._evt_type = undefined;
        this._evt_name = undefined;
    } // clear
    public getMap(oMap: Object): void {
        super.getMap(oMap);
        if (
            this._evt_type !== undefined &&
            this._evt_type !== null &&
            this._evt_type != InfoEventType.Inconnu
        ) {
            oMap["evt_type"] = this._evt_type;
        } // n
        if (
            this._evt_name !== undefined &&
            this._evt_name !== null &&
            this._evt_name.length > 0
        ) {
            oMap["evt_name"] = this._evt_name;
        } // n
        if (
            this._etudiantid !== undefined &&
            this._etudiantid !== null &&
            this._etudiantid.length > 0
        ) {
            oMap["etudiantid"] = this._etudiantid;
        }
    } // getMap
    public clone(): Evenement {
        let oMap = {};
        this.getMap(oMap);
        let p = new Evenement(oMap);
        p._modified = this._modified;
        p.url = this.url;
        return p;
    }
    public get evt_type(): InfoEventType {
        return this._evt_type !== undefined && this._evt_type !== null ?
            this._evt_type :
            InfoEventType.Inconnu;
    }
    public set evt_type(t: InfoEventType) {
        if (t != this.evt_type) {
            this._evt_type = t;
            this._modified = true;
        }
    }
    public get evt_name(): string {
        if (
            this._evt_name !== undefined &&
            this._evt_name !== null &&
            this._evt_name.length > 0
        ) {
            return this._evt_name;
        } else {
            return this.name;
        }
    }
    public set evt_name(s: string) {
        let ss = this.formatName(s);
        if (ss != this.evt_name) {
            this._evt_name = ss;
            this._modified = true;
        }
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
            this._modified = true;
        }
    }
    public is_storeable(): boolean {
        if (this.evt_type == InfoEventType.Inconnu) {
            return false;
        }
        return super.is_storeable();
    } // is_storeable
} // class Evenement