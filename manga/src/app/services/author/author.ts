export interface IAuthor {
    id?: number; 
    name?: string;
    surname?: string; 
    function?: string;
}

export class Author {
    private _id: number = -1; 
    private _name: string = "";
    private _surname: string = "";
    private _function: string = "";
    
    constructor(auth: IAuthor) {
        this._id = auth.id === undefined ? -1 : auth.id; 
        this._name = auth.name === undefined ? "" : auth.name; 
        this._surname = auth.surname === undefined ? "" : auth.surname; 
        this._function = auth.function === undefined ? "" : auth.function; 
    }
    
    //getter 
    public get id(): number {
        return this._id;
    }
    public get name(): string {
        return this._name;
    }
    public get surname(): string {
        return this._surname;
    }
    public get function(): string {
        return this._function;
    }

    //setter
    public set id(value: number) {
        this._id = value;
    }
    public set name(value: string) {
        this._name = value;
    }
    public set surname(value: string) {
        this._surname = value;
    }
    public set function(value: string) {
        this._function = value;
    }

}