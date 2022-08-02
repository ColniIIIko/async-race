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

        this.setClickHandlers();

        this.update();

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

    setClickHandlers() {
        const createCarBtn = document.querySelector('.create-car__btn') as HTMLElement;
        createCarBtn.addEventListener('click', (event) => {
            const carName = (document.querySelector('.create-car-name') as HTMLInputElement).value;
            const carColor = (document.querySelector('.create-car-color') as HTMLInputElement).value;
            this.garageController
                .createCar({ color: carColor, name: carName })
                .then((response) => (response ? response.json() : null))
                .then((car: Car) => {
                    car && CarSpot.draw(car);
                });
            this.update();
            event.preventDefault();
        });
    }

    update() {
        this.updateCarAmount();
        this.updatePage();
    }
}
