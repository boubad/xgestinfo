
export interface IDataStore {
    isAlive() : Promise<boolean>;
    formBlobUrl(id:string,name:string) : string;
    maintainsBlob(id:string, name:string, mime:string, data:Blob) : Promise<string>;
    removeBlob(id:string, name:string): Promise<boolean>;
    findDocsBySelector(sel:Object,start?:number, count?:number,fields?:string[]) :Promise<Object[]>;
    findDocById(id:string) : Promise<Object>;
    maintainsDoc(doc:Object) : Promise<boolean>;
    removeDoc(id:string) : Promise<boolean>;
    findManyDocs(ids:string[]) : Promise<Object[]>;
}// interface IDataStore