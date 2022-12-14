import { Winner, winnersOptions } from '../types/types';
import { toQueryString } from './QueyString';

const URL = 'http://127.0.0.1:3000/winners';

export class WinnersController {
    async getWinners(params: winnersOptions) {
        const response: Response = await fetch(`${URL}?${toQueryString(params)}`);
        const winners: Winner[] = await response.json();
        return winners;
    }

    async getWinner(id: number): Promise<Winner | null> {
        const response: Response = await fetch(`${URL}/${id}`);
        console.log(response);
        if (!response.ok) return null;
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

    async getWinnersAmount(limit: number): Promise<number> {
        const response = await fetch(`${URL}?_limit=${limit}`);
        const amount = Number(response.headers.get('X-Total-Count'));
        return amount;
    }

    async deleteWinner(id: number) {
        try {
            const response = await fetch(`${URL}/${id}`, {
                method: 'DELETE',
            });

            return response;
        } catch (error) {
            // TODO Error Handler

            return false;
        }
    }
}
