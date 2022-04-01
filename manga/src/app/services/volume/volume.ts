
import { Author, IAuthor } from "../author/author";

export interface  IVolume {
    id?:  number;
    num?: number;
    title?: string;
    resume?: string;
    parution_date?: Date; 
    buy_link?: string;
    is_buyed?: boolean;
    authors?: Array<Author> | Array<IAuthor>;
}

export class Volume {

    private _id: number = -1;
    private _num: number = -1;
    private _title: string = "";
    private _resume: string = "";
    private _parution_date?: Date | undefined; 
    private _buy_link: string = "";
    private _is_buyed: boolean = false;
    private _authors: Array<Author> = [];
    

    constructor(vol: IVolume) { 
        this._id = vol.id === undefined ? -1 : vol.id;
        this._num = vol.num === undefined ? -1 : vol.num;
        this._title = vol.title === undefined ? "" : vol.title;
        this._resume = vol.resume === undefined ? "" : vol.resume;
        this._parution_date = vol.parution_date; 
        this._buy_link = vol.buy_link === undefined ? "" : vol.buy_link;
        this._is_buyed = vol.is_buyed === undefined ? false : vol.is_buyed;
        this._authors = vol.authors === undefined ? [] : vol.authors as Array<Author>                                                        
    }

    public get id(): number {
        return this._id;
    }
    public get num(): number {
        return this._num;
    }
    public get title(): string {
        return this._title;
    }  
    public get resume(): string {
        return this._resume;
    }    
    public get parution_date(): Date | undefined {
        return this._parution_date;
    }
    public get buy_link(): string {
        return this._buy_link;
    }
    public get is_buyed(): boolean {
        return this._is_buyed;
    }
    public get authors(): Array<Author> {
        return this._authors;
    }


    public set id(value: number) {
        this._id = value;
    }
    public set buy_link(value: string) {
        this._buy_link = value;
    }
    public set parution_date(value: Date | undefined) {
        this._parution_date = value;
    }
    public set resume(value: string) {
        this._resume = value;
    }
    public set title(value: string) {
        this._title = value;
    }
    public set num(value: number) {
        this._num = value;
    }
    public set is_buyed(value: boolean) {
        this._is_buyed = value;
    }
    public set authors(value: Array<Author>) {
        this._authors = value;
    }
}