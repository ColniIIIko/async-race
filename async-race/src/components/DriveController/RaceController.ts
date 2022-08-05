import { WinnersController } from '../resourceController/WinnersController';

export class RaceController {
    winnerController: WinnersController;
    static totalFinished: number;
    static totalBroken: number;
    static carAmount: number;

    constructor() {
        this.winnerController = new WinnersController();
        RaceController.totalFinished = 0;
        RaceController.totalBroken = 0;
    }

    setWinner(time: number, car: HTMLElement, carId: number, isError: boolean) {
        isError ? RaceController.totalBroken++ : RaceController.totalFinished++;
        if (RaceController.totalFinished === 1 && !isError) {
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

        if (RaceController.totalFinished + RaceController.totalBroken === RaceController.carAmount) {
            this.raceEnd();
        }
    }

    private raceEnd() {
        RaceController.totalFinished = 0;
        RaceController.totalBroken = 0;
        const buttons = document.querySelectorAll('button') as NodeListOf<HTMLButtonElement>;
        buttons.forEach((button) => {
            if (button.className != 'garage__race-end-btn') button.disabled = false;
        });
    }

    showWinnerMessage(time: number, car: HTMLElement) {
        const messageTemp = document.querySelector('#winner-message') as HTMLTemplateElement;
        const messageClone = messageTemp.content.cloneNode(true) as HTMLElement;

        const carName = car.querySelector('.car-title')?.textContent;
        messageClone.querySelector('.car-name')!.textContent = carName || '';
        messageClone.querySelector('.car-time')!.textContent = time.toFixed(2);

        document.querySelector('body')?.append(messageClone);

        setTimeout(() => document.querySelector('.message')?.remove(), 5000);
    }

    raceHandler(btnStart: HTMLButtonElement, btnEnd: HTMLButtonElement, garage: HTMLElement) {
        btnStart.addEventListener('click', () => {
            const cars = garage.querySelectorAll('.car-spot');
            const buttons = document.querySelectorAll('button') as NodeListOf<HTMLButtonElement>;
            cars.forEach((spot) => {
                spot.querySelector('.car-buttons__drive')?.dispatchEvent(new Event('click'));
            });

            buttons.forEach((button) => {
                if (button.className !== 'garage__race-end-btn') button.disabled = true;
            });
        });

        btnEnd.addEventListener('click', () => {
            const cars = garage.querySelectorAll('.car-spot');
            cars.forEach((spot) => {
                spot.querySelector('.car-buttons__stop')?.dispatchEvent(new Event('click'));
            });

            this.raceEnd();
        });
    }
}
