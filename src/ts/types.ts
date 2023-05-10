
export interface Obj{
    [key: string]: any
}

export interface City {
    name: string,
    data: [
        {
            country: string,
            coord: {
                lon: number,
                lat: number
            }
        }
    ]
}