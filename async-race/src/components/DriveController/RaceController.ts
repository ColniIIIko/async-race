import { WinnersController } from '../resourceController/WinnersController';

export class RaceController {
    winnerController: WinnersController;
    totalFinished: number;
    static carAmount: number;

    constructor() {
        this.winnerController = new WinnersController();
        this.totalFinished = 0;
    }

    setWinner(time: number, car: HTMLElement, carId: number) {
        this.totalFinished++;
        console.log(this.totalFinished, RaceController.carAmount);
        if (this.totalFinished === 1) {
            this.showWinnerMessage(time, car);
            this.winnerController.getWinner(carId).then((prevWin) => {
                if (prevWin) {
                    const prevWins = prevWin?.wins;
                    const prevTime = prevWin?.time;
                    this.winnerController.updateWinner(carId, {
                        wins: prevWins + 1,
                        time: prevTime > time ? +time.toFixed(2) : prevTime,
                    });
                } else this.winnerController.createWinner({ id: carId, wins: 1, time: +time.toFixed(2) });
            });
        }

        console.log(this.totalFinished, RaceController.carAmount);
        if (this.totalFinished === RaceController.carAmount) this.totalFinished = 0;
    }

    showWinnerMessage(time: number, car: HTMLElement) {
        const messageTemp = document.querySelector('#winner-message') as HTMLTemplateElement;
        const messageClone = messageTemp.content.cloneNode(true) as HTMLElement;

        const carName = car.querySelector('.car-title')?.textContent;
        messageClone.querySelector('.car-name')!.textContent = carName || '';
        messageClone.querySelector('.car-time')!.textContent = time.toFixed(2);

        document.querySelector('body')?.append(messageClone);
    }

    raceHandler(btn: HTMLButtonElement, garage: HTMLElement) {
        btn.addEventListener('click', () => {
            const cars = garage.querySelectorAll('.car-spot');
            cars.forEach((spot) => {
                spot.querySelector('.car-buttons__drive')?.dispatchEvent(new Event('click'));
            });
        });
    }
}
