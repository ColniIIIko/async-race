import { Car } from '../types/types';
import './carSpot.scss';

export class CarSpot {
    static draw(car: Car) {
        const spotTemp = document.querySelector('#car-spot') as HTMLTemplateElement;

        const spotClone = spotTemp.content.cloneNode(true) as HTMLElement;
        spotClone.querySelector('.car-spot')?.classList.add(car.id.toString());
        spotClone.querySelector('.car-spot')?.addEventListener('click', (event) => {
            const targetSpot = (event.target as HTMLElement).closest('.car-spot');
            if (targetSpot) {
                if (targetSpot.classList.contains('car-spot_selected'))
                    targetSpot.classList.remove('car-spot_selected');
                else if (document.querySelector('.car-spot_selected')) return;
                else {
                    targetSpot.classList.add('car-spot_selected');
                    (document.querySelector('.edit-car-name') as HTMLInputElement).placeholder = car.name;
                    (document.querySelector('.edit-car-color') as HTMLInputElement).placeholder = car.color;
                }
            }
        });

        (spotClone.querySelector('.car-title') as HTMLElement)!.innerText = car.name;
        (spotClone.querySelectorAll('svg path') as NodeListOf<HTMLElement>).forEach((path) => {
            path.style.fill = car.color;
        });

        document.querySelector('.garage-spots')?.append(spotClone);
    }

    static update(spotToUpdate: HTMLElement, car: Car) {
        if (spotToUpdate) {
            (spotToUpdate.querySelector('.car-title') as HTMLElement).innerText = car.name;
            (spotToUpdate.querySelectorAll('svg path') as NodeListOf<HTMLElement>).forEach((path) => {
                path.style.fill = car.color;
            });
        }
    }
}
