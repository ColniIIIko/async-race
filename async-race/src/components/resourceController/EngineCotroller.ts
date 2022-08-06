import { engine } from '../types/types';

const URL = 'http://127.0.0.1:3000/engine';

export class EngineController {
    async stopEngine(id: number) {
        try {
            const response = await fetch(`${URL}/?id=${id}&status=stopped`, {
                method: 'PATCH',
            });

            return response;
        } catch (error) {
            // TODO Error Handler

            return false;
        }
    }

    async startEngine(id: number) {
        const response: Response = await fetch(`${URL}/?id=${id}&status=started`, {
            method: 'PATCH',
        });
        const engineData: engine = await response.json();
        return engineData;
    }

    async driveCar(id: number) {
        const response: Response = await fetch(`${URL}/?id=${id}&status=drive`, {
            method: 'PATCH',
        });
        return response;
    }
}
