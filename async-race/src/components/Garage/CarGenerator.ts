import { Car } from '../types/types';

const CAR_COMPANYS = ['Audi', 'Ford', 'BMW', 'Tesla', 'Zhiguli', 'Subaru', 'Mazda', 'Lada', 'Hyundai'];
const CAR_MODELS = ['A6', 'Vesta', 'Granta', 'Cresta', 'Solaris', 'Golf', 'Beetle'];

export class CarGenerator {
    constructor() {}

    generate(amount: number = 100): Pick<Car, 'color' | 'name'>[] {
        const cars: Pick<Car, 'color' | 'name'>[] = [];

        for (let i = 0; i < amount; i += 1) {
            const fullName =
                CAR_COMPANYS[Math.round(Math.random() * (CAR_COMPANYS.length - 1))] +
                ' ' +
                CAR_MODELS[Math.round(Math.random() * (CAR_MODELS.length - 1))];
            cars.push({
                name: fullName,
                color: this.generateColorHEX(),
            });
        }

        return cars;
    }

    private generateColorHEX() {
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += Math.round(Math.random() * 16).toString(16);
        }
        return color;
    }
}
