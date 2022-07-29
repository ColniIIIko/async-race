import { Car } from '../types/types';

const URL = 'http://127.0.0.1:3000/garage';

export class GarageController {
    async getCars() {
        try {
            const response: Response = await fetch(URL);
            const cars: Car[] = await response.json();
            return cars;
        } catch (error) {
            // TODO Error Handler

            return false;
        }
    }

    async getCar(id: number) {
        try {
            const response: Response = await fetch(`${URL}/:${id}`);
            const cars: Car[] = await response.json();
            return cars;
        } catch (error) {
            // TODO Error Handler

            return false;
        }
    }

    async createCar(body: Car) {
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
            const response: Response = await fetch(`${URL}:${id}}`, {
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
            const response = await fetch(`${URL}:${id}}`, {
                method: 'PUT',
                body: JSON.stringify(params),
            });

            return response;
        } catch (error) {
            // TODO Error Handler

            return false;
        }
    }
}
