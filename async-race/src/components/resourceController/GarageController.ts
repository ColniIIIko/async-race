import { Car, getOptions } from '../types/types';
import { toQueryString } from './QueyString';

const URL = 'http://127.0.0.1:3000/garage';

export class GarageController {
    async getCars(options?: getOptions) {
        try {
            const response: Response = await fetch(`${URL}?${options ? toQueryString(options) : ''}`);
            const cars: Car[] = await response.json();
            return cars;
        } catch (error) {
            // TODO Error Handler

            return Promise.reject();
        }
    }

    async getCar(id: number) {
        const response: Response = await fetch(`${URL}/${id}`);
        const cars: Car = await response.json();
        return cars;
    }

    async createCar(body: Pick<Car, 'name' | 'color'>) {
        try {
            const response: Response = await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            return response;
        } catch (error) {
            // TODO Error Handler

            return false;
        }
    }

    async deleteCar(id: number) {
        try {
            const response: Response = await fetch(`${URL}/${id}`, {
                method: 'DELETE',
            });

            return response;
        } catch (error) {
            // TODO Error Handler

            return false;
        }
    }

    async updateCar(id: number, params: Pick<Car, 'color' | 'name'>) {
        try {
            const response = await fetch(`${URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
            });

            return response;
        } catch (error) {
            // TODO Error Handler

            return false;
        }
    }

    async getCarAmount(limit: number): Promise<number> {
        try {
            const response = await fetch(`${URL}?_limit=${limit}`);
            const amount = Number(response.headers.get('X-Total-Count'));
            return amount;
        } catch (error) {
            return Promise.reject(0);
        }
    }
}
