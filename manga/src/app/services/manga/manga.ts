import { Volume } from "../volume/volume";

export interface IManga {
    id?: number;
    title: string;
    author: string;
    state?:string;
    volumes?: Array<Volume>;
}

export class Manga {
    private _id: number = -1;
    private _title: string = "";
    private _author: string = "";
    private _state: string = "conserved";
    private _volumes: Array<Volume> = [];
   
   

    constructor(manga: IManga) {
        this._id = manga.id === undefined ? -1 : manga.id;
        this._title = manga.title;
        this._author = manga.author;
        this._state = manga.state === undefined ? "conserved" : manga.state;
        this._volumes = manga.volumes === undefined ? [] : manga.volumes 
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
    public set volumes(value: Array<Volume>) {
        this._volumes = value;
    }
}
