import { GarageController } from '../resourceController/GarageController';
import { Car } from '../types/types';
import { CarSpot } from '../View/CarSpot';

const LIMIT = 7;

export class Garage {
    readonly garageController: GarageController;
    page: number;

    constructor() {
        this.garageController = new GarageController();
        this.page = 1;
    }

    display() {
        const garageTemp = document.querySelector('#garage') as HTMLTemplateElement;
        const garageClone = garageTemp.content.cloneNode(true) as HTMLElement;
        document.querySelector('body')?.append(garageClone);

        this.updateCarAmount();
        this.updatePage();

        this.garageController.getCars({ _limit: LIMIT, _page: this.page }).then((cars: Car[]) => {
            cars.forEach((car) => {
                CarSpot.draw(car);
            });
        });
    }

    updateCarAmount() {
        this.garageController.getCarAmount(LIMIT).then((amount) => {
            (document.querySelector('.garage__title') as HTMLElement)!.textContent = `Garage (${amount.toString()})`;
        });
    }

    updatePage() {
        (document.querySelector('.garage__page') as HTMLElement)!.textContent = `Page #(${this.page})`;
    }
}
