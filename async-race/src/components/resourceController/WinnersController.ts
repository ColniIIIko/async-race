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
}
