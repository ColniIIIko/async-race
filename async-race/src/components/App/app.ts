import { Garage } from '../Garage/Garage';

export class App {
    garage: Garage;

    constructor() {
        this.garage = new Garage();
    }

    start() {
        const appTemp = document.querySelector('#root') as HTMLTemplateElement;
        const appClone = appTemp.content.cloneNode(true) as HTMLElement;

        document.querySelector('body')?.append(appClone);
        this.garage.display();
    }
}
