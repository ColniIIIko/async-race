import { Car } from '../types/types';
import './carSpot.scss';

export class CarSpot {
    static draw(car: Car) {
        const spotTemp = document.querySelector('#car-spot') as HTMLTemplateElement;

        const spotClone = spotTemp.content.cloneNode(true) as HTMLElement;
        spotClone.querySelector('.car-spot')?.classList.add(car.id.toString());
        (spotClone.querySelector('.car-title') as HTMLElement)!.innerText = car.name;
        (spotClone.querySelectorAll('svg path') as NodeListOf<HTMLElement>).forEach((path) => {
            path.style.fill = car.color;
        });

        document.querySelector('body')?.append(spotClone);
    }
}
