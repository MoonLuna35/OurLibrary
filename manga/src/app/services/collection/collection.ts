import { Volume } from "../volume/volume";

export interface Icollection {
    id?: number;
    title: string;
    author: string;
    state?:string;
    editor: string;
    resume: string;
    volumes?: Array<Volume>;
}

export class Collection {
    private _id: number = -1;
    private _title: string = "";
    private _author: string = "";
    private _state: string = "conserved";
    private _editor: string = "";
    private _resume: string = "";
    private _volumes: Array<Volume> = [];
   
   

    constructor(collection: Icollection) {
        this._id = collection.id === undefined ? -1 : collection.id;
        this._title = collection.title;
        this._author = collection.author;
        this._state = collection.state === undefined ? "conserved" : collection.state;
        this._volumes = collection.volumes === undefined ? [] : collection.volumes 
    }

    public get id(): number {
        return this._id;
    }
    public get title(): string {
        return this._title;
    }
    public get author(): string {
        return this._author;
    }
    public get state(): string {
        return this._state;
    }
    public get editor(): string {
        return this._editor;
    }
    public get resume(): string {
        return this._resume;
    }
    public get volumes(): Array<Volume> {
        return this._volumes;
    }


    public set id(value: number) {
        this._id = value;
    }
    public set title(value: string) {
        this._title = value;
    }
    public set author(value: string) {
        this._author = value;
    }
    public set state(value: string) {
        this._state = value;
    }
    public set editor(value: string) {
        this._editor = value;
    }
    public set resume(value: string) {
        this._resume = value;
    }
    public set volumes(value: Array<Volume>) {
        this._volumes = value;
    }
}
