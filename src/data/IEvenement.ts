import { InfoEventType } from "./InfoEventType";
import { IBaseElement } from "./IBaseElement";
export interface IEvenement extends IBaseElement {
    evt_type?: InfoEventType;
    evt_name?: string;
    etudiantid?: string;
} // interface IEvevement
