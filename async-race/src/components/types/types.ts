export interface Car {
    readonly name: string;
    readonly color: string;
    readonly id: number;
}

export interface Winner {
    id: number;
    wins: number;
    time: number;
}

export type winnersOptions = {
    _page?: number;
    _limit?: number;
    _sort?: 'id' | 'wins' | 'time';
    _order?: 'ASC' | 'DESC';
};

export type engine = {
    velocity: number;
    distance: number;
};
