import { GarageController } from '../resourceController/GarageController';
import { Winner } from '../types/types';

export class WinnerSpot {
    garageController: GarageController;

    constructor() {
        this.garageController = new GarageController();
    }

    async draw(winner: Winner, id: number) {
        const winnerSpotTemp = document.querySelector('#winner-spot') as HTMLTemplateElement;
        const winnerSpotClone = winnerSpotTemp.content.cloneNode(true) as HTMLElement;

        winnerSpotClone.querySelector('.winner-spot__number')!.textContent = (id + 1).toString();
        winnerSpotClone.querySelector('.winner-spot__wins')!.textContent = winner.wins.toString();
        winnerSpotClone.querySelector('.winner-spot__time')!.textContent = winner.time.toString();

        const car = await this.garageController.getCar(winner.id);

        winnerSpotClone.querySelector('.winner-spot__name')!.textContent = car.name;
        (winnerSpotClone.querySelectorAll('svg path') as NodeListOf<HTMLElement>).forEach((path) => {
            path.style.fill = car.color;
        });

        document.querySelector('.winners__content')?.append(winnerSpotClone);
    }
}
