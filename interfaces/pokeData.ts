// Generated by https://quicktype.io

export interface PokeData {
    count: number;
    next?: string;
    previous?: null;
    results: Result[];
}

export interface Result {
    name: string;
    url: string;
    img: string;
    id: number
}
