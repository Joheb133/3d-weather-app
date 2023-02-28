
export interface Obj{
    [key: string]: any
}

export interface City {
    id: number;
    name: string;
    state: string;
    country: string;
    coord: {
        lon: number;
        lat: number;
    };
}