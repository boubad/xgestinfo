import { IDataStore } from './idatastore';
import { BaseItem } from '../baseitem';
import { AttachedDoc } from '../attacheddoc';

export interface IInfoDataManager extends IDataStore {
    maintainsItemAttachment<T extends BaseItem>(doc:T, attname:string, attype:string, data:Blob) : Promise<string>;
    removeItemAttachment<T extends BaseItem>(doc:T, attname:string) : Promise<boolean>;
    maintainsBaseItem<T extends BaseItem>(doc:T) : Promise<boolean>;
    removeBaseItem<T extends BaseItem>(doc:T) : Promise<boolean>;
    //
    findItemAttachedDocs(sid:string) : Promise<AttachedDoc[]>;
}