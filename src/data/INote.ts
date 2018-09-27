import { IBaseElement } from "./IBaseElement";
//
export interface INote extends IBaseElement {
    etudiantid?: string;
    eventid?: string;
    value?: number;
}