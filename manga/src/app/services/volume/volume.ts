export interface  IVolume {
    id?: number;
    volume: number;
    is_buyed?: boolean;
}

export class Volume {
    private _id: number = -1;
    private _volume: number = -1;
    private _is_buyed: boolean = false;

    constructor(vol: IVolume) { 
       this._id = vol.id === undefined ? -1 : vol.id;
       this._volume = vol.volume;
       this._is_buyed = vol.is_buyed === undefined ? false : vol.is_buyed                                                              
    }

    public get id(): number {
        return this._id;
    }
    public get volume(): number {
        return this._volume;
    }
    public get is_buyed(): boolean {
        return this._is_buyed;
    }
    
    public set id(value: number) {
        this._id = value;
    }
    public set volume(value: number) {
        this._volume = value;
    }
    public set is_buyed(value: boolean) {
        this._is_buyed = value;
    }
}