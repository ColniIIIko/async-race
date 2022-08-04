import { Garage } from '../Garage/Garage';
import { WinnerTable } from '../Winners/Winners';

export class App {
    garage: Garage;
    winners: WinnerTable;

    constructor() {
        this.garage = new Garage();
        this.winners = new WinnerTable();
    }

    start() {
        const appTemp = document.querySelector('#root') as HTMLTemplateElement;
        const appClone = appTemp.content.cloneNode(true) as HTMLElement;

        appClone.querySelector('.garage-btn')?.addEventListener('click', () => {
            document.querySelector('.content')!.innerHTML = '';
            this.garage.display();
        });
        appClone.querySelector('.winners-btn')?.addEventListener('click', () => {
            document.querySelector('.content')!.innerHTML = '';
            this.winners.display();
        });
        document.querySelector('body')?.append(appClone);
        this.garage.display();
    }
}
