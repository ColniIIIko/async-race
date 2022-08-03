import { Winner, winnersOptions } from '../types/types';
import { toQueryString } from './QueyString';

const URL = 'http://127.0.0.1:3000/winners';

export class WinnersController {
    async getWinners(params: winnersOptions) {
        try {
            const response: Response = await fetch(`${URL}?${toQueryString(params)}`);
            const winners: Winner[] = await response.json();
            return winners;
        } catch (error) {
            // TODO Error Handler
        }
    }

    async getWinner(id: number): Promise<Winner> {
        const response: Response = await fetch(`${URL}/${id}`);
        const winner = response.json();

        return winner;
    }

    async createWinner(body: Winner) {
        const response: Response = await fetch(URL, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(body),
        });

        return response;
    }

    async updateWinner(id: number, body: Pick<Winner, 'wins' | 'time'>) {
        const response: Response = await fetch(`${URL}/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'PUT',
            body: JSON.stringify(body),
        });

        return response;
    }
}
