import { Author } from "../author/author";
import { Volume } from "../volume/volume";

export interface Icollection {
    id?: number;
    title: string;
    is_conserved?: boolean;
    editor: string;
    resume: string;
    volumes?: Array<Volume>;
}

export class fdp {
    
}

export class Collection {
    private _id: number = -1;
    private _title: string = "";
    private _is_conserved: boolean= true;
    private _editor: string = "";
    private _resume: string = "";
    private _volumes: Array<Volume> = [];

    is_complete(): boolean{
        for(let i = 0; i < this._volumes.length; i++) {
            if(!this._volumes[i].is_buyed) {
                return false;
            }
        }
        return true;
    }
    
     

    constructor(collection: Icollection) {
        this._id = collection.id === undefined ? -1 : collection.id;
        this._title = collection.title;
        this._is_conserved = collection.is_conserved === undefined ? true : collection.is_conserved;
        this._editor = collection.editor === undefined ? "" : collection.editor;
        this._resume = collection.resume === undefined ? "" : collection.resume;
        this._volumes = collection.volumes === undefined ? [] : collection.volumes 
    }
    


    
    public get id(): number {
        return this._id;
    }
    public get title(): string {
        return this._title;
    }
    public get is_conserved(): boolean {
        return this._is_conserved;
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
    public set is_conserved(value: boolean) {
        this._is_conserved = value;
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

export class CollectionView extends Collection {
    private _is_deployed: boolean = false;
    constructor(collection: Icollection) {
        super(collection);
    }

    static CollectionViewFactoryFromDB(res: any): Array<CollectionView> {
        let collections = []
        for(let i = 0;  i < res.collections.length; i++) {
            let v = [];
            console.log(res.collections[i].volumes);
            for(let j = 0; j < res.collections[i].volumes.length; j++) {
                let a = [];
                for(let k = 0; k < res.collections[i].volumes[j].authors.length; k++) {
                    let auth = res.collections[i].volumes[j].authors;
                    a.push(new Author({
                        id: auth[k].id,
                        name: auth[k].name,
                        surname: auth[k].surname,
                        function: auth[k].function,
                    }))
                }
              v.push(new Volume({
                id: res.collections[i].volumes[j].id,
                num: res.collections[i].volumes[j].num,
                title: res.collections[i].volumes[j].title,
                resume: res.collections[i].volumes[j].resume,
                parution_date: res.collections[i].volumes[j].parution_date,
                buy_link: res.collections[i].volumes[j].buy_link,
                is_buyed: res.collections[i].volumes[j].is_buyed,
                authors: a
              }));
              
            }
            collections.push(new CollectionView({
              id: res.collections[i].id,
              title: res.collections[i].title,
              is_conserved: res.collections[i].is_conserved,
              resume: res.collections[i].resume,
              editor: res.collections[i].editor,
              volumes: v          
            }));
        }
        return collections;
    }

    public get is_deployed(): boolean {
        return this._is_deployed;
    }
    public set is_deployed(value: boolean) {
        this._is_deployed = value;
    }
    

}

