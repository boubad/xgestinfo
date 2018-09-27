import { IBaseItem } from "./IBaseItem";
export interface IAttachedDoc extends IBaseItem {
    genre?: string;
    ownerid?: string;
    keywords?: string[];
    mime?: string;
    size?: number;
} // IAttachedDoc
