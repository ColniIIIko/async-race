import { GarageController } from '../resourceController/GarageController';
import { Car } from '../types/types';
import { CarSpot } from '../View/CarSpot';

const LIMIT = 7;
enum paginationMove {
    forward = 1,
    backward = -1,
}

export class Garage {
    readonly garageController: GarageController;
    page: number;
    carAmount: number = 0;

    constructor() {
        this.garageController = new GarageController();
        this.page = 1;
        CarSpot.deleteHandler = this.delete.bind(this);
    }

    display() {
        const garageTemp = document.querySelector('#garage') as HTMLTemplateElement;
        const garageClone = garageTemp.content.cloneNode(true) as HTMLElement;
        document.querySelector('body')?.append(garageClone);

        this.setClickHandlers();
        this.setPaginationHandler();
        this.update();

        this.garageController.getCars({ _limit: LIMIT, _page: this.page }).then((cars: Car[]) => {
            cars.forEach((car) => {
                CarSpot.draw(car);
            });
        });
    }

    private setClickHandlers() {
        const createCarBtn = document.querySelector('.create-car__btn') as HTMLElement;
        createCarBtn.addEventListener('click', (event) => {
            event.preventDefault();

            const carName = (document.querySelector('.create-car-name') as HTMLInputElement).value;
            const carColor = (document.querySelector('.create-car-color') as HTMLInputElement).value;
            this.garageController
                .createCar({ color: carColor, name: carName })
                .then((response) => (response ? response.json() : null))
                .then((car: Car) => {
                    if (car && this.carAmount < LIMIT * this.page) CarSpot.draw(car);
                });
            this.update();
        });

        const editCarBtn = document.querySelector('.edit-car__btn') as HTMLElement;
        editCarBtn.addEventListener('click', (event) => {
            event.preventDefault();

            const carName = (document.querySelector('.edit-car-name') as HTMLInputElement).value;
            const carColor = (document.querySelector('.edit-car-color') as HTMLInputElement).value;
            const currentCar = document.querySelector('.car-spot_selected') as HTMLElement;
            const carId = Number(currentCar?.classList[1]);

            if (carId && carName && carColor)
                this.garageController
                    .updateCar(carId, { color: carColor, name: carName })
                    .then((response) => (response ? response.json() : null))
                    .then((car: Car) => {
                        if (carId <= this.page * LIMIT && carId >= (this.page - 1) * LIMIT)
                            CarSpot.update(currentCar, car);
                    });
        });
    }

    private setPaginationHandler() {
        const pagination = (move: paginationMove) => {
            document.querySelector('.garage-spots')!.innerHTML = '';
            this.garageController.getCars({ _limit: LIMIT, _page: (this.page += move) }).then((cars: Car[]) => {
                cars.forEach((car) => {
                    CarSpot.draw(car);
                });
            });
            this.update();
        };

        const forwardBtn = document.querySelector('.pagination-control__forward') as HTMLButtonElement;
        forwardBtn.addEventListener('click', () => {
            if (this.page * LIMIT < this.carAmount) {
                pagination(paginationMove.forward);
            }
        });

        const backwardBtn = document.querySelector('.pagination-control__backward') as HTMLButtonElement;
        backwardBtn.addEventListener('click', () => {
            if (this.page !== 1) {
                pagination(paginationMove.backward);
            }
        });
    }

    private async update() {
        this.carAmount = await this.garageController.getCarAmount(LIMIT);
        (document.querySelector(
            '.garage__title'
        ) as HTMLElement)!.textContent = `Garage (${this.carAmount.toString()})`;

        (document.querySelector('.garage__page') as HTMLElement)!.textContent = `Page #(${this.page})`;
    }

    private async delete(id: number) {
        await this.garageController.deleteCar(id);
        document.querySelector('.garage-spots')!.innerHTML = '';
        await this.garageController.getCars({ _limit: LIMIT, _page: this.page }).then((cars: Car[]) => {
            cars.forEach((car) => {
                CarSpot.draw(car);
            });
        });
        this.update();
    }
}
