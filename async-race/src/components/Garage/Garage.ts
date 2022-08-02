import { GarageController } from '../resourceController/GarageController';
import { Car } from '../types/types';
import { CarSpot } from '../View/CarSpot';

export class Garage {
    readonly garageController: GarageController;

    constructor() {
        this.garageController = new GarageController();
    }

    display() {
        this.garageController.getCars().then((cars: Car[]) => {
            cars.forEach((car) => {
                CarSpot.draw(car);
            });
        });
    }
}
