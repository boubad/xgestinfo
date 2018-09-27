export interface ICouchDBQueryParameters{
    attachments?:boolean;
    att_encoding_info?:boolean;
    atts_since?:string[];
    conflicts?:boolean;
    deleted_conflicts?:boolean;
    latest?:boolean;
    local_seq?:boolean;
    meta?:boolean;
    open_revs?:string[]| 'all';
    rev?:string;
    revs?:boolean;
    revs_info?:boolean;
}

export interface ICouchDBUpdateResponse {
    id?:string;
    rev?:string;
    ok?:boolean;
    error?:string;
    reason?:string;
}
export interface ICouchDBAttachmentInfo {
    content_type:string;
    data?:string;
    digest:string;
    encoded_length?:number;
    encoding?:string;
    length?:number;
    revpos:number;
    stub:boolean;
}
export interface ICouchDBFindOptions {
    selector:Object;
    limit?:number;
    skip?:number;
    sort?:Object[];
    fields?:string[];
    use_index?:string | string[];
    r?:number;
    bookmark?:string;
    update?:boolean;
    stable?:boolean;
    stale?:string;
    execution_stats?:boolean;
}
export interface ICouchDBFindResponse<T> {
    docs:T[];
    warning?:string;
    execution_stats?:Object;
    bookmark?:string;
}
//