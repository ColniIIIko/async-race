import { WinnersController } from '../resourceController/WinnersController';

export class RaceController {
    winnerController: WinnersController;

    constructor() {
        this.winnerController = new WinnersController();
    }

    raceHandler(btn: HTMLButtonElement, garage: HTMLElement) {
        btn.addEventListener('click', () => {
            garage.querySelectorAll('.car-spot').forEach((spot) => {
                spot.querySelector('.car-buttons__drive')?.dispatchEvent(new Event('click'));
            });
        });
    }

    setWinner = (() => {
        let isFirst = false;
        return async (time: number, car: HTMLElement, carId: number) => {
            if (!isFirst) {
                isFirst = true;
                this.showWinnerMessage(time, car);
                const prevWin = await this.winnerController.getWinner(carId);
                const prevWins = prevWin?.wins;
                const prevTime = prevWin?.time;
                if (prevWins)
                    this.winnerController.updateWinner(carId, {
                        wins: prevWins + 1,
                        time: prevTime > time ? +time.toFixed(2) : prevTime,
                    });
                else this.winnerController.createWinner({ id: carId, wins: 1, time: +time.toFixed(2) });
            }
        };
    })();

    showWinnerMessage(time: number, car: HTMLElement) {
        const messageTemp = document.querySelector('#winner-message') as HTMLTemplateElement;
        const messageClone = messageTemp.content.cloneNode(true) as HTMLElement;

        const carName = car.querySelector('.car-title')?.textContent;
        messageClone.querySelector('.car-name')!.textContent = carName || '';
        messageClone.querySelector('.car-time')!.textContent = time.toFixed(2);

        console.log(messageClone);
        document.querySelector('body')?.append(messageClone);
    }
}
