import { EngineController } from '../resourceController/EngineCotroller';

export class DriveController {
    private engineController: EngineController;
    private isDriveState: boolean[];

    constructor() {
        this.engineController = new EngineController();
        this.isDriveState = [];
    }

    driveHandler(car: HTMLElement, btn: HTMLButtonElement) {
        btn.addEventListener('click', async () => {
            let start = 0;
            let isError = false;
            const carId = +car.classList[1];
            const driveData = await this.engineController.startEngine(carId);
            const drivePath = window.innerWidth * 0.9 - 100;
            const driveTime = drivePath / driveData.velocity;

            const carWrapper = car.querySelector('.car-img-wrapper svg') as HTMLElement;

            let step = (timestamp: number) => {
                if (!start) start = timestamp;
                let progress = timestamp - start;

                if (!isError && progress / 1000 < driveTime && this.isDriveState[carId]) {
                    carWrapper.style.transform = `translateX(${(progress * driveData.velocity) / 1000}px)`;
                    window.requestAnimationFrame(step);
                } else {
                    this.isDriveState.splice(carId, 1);
                }
            };

            this.engineController.driveCar(carId).then((response) => {
                if (response.status === 500) isError = true;
            });

            this.isDriveState[carId] = true;
            window.requestAnimationFrame(step);
        });
    }

    stopHandler(car: HTMLElement, btn: HTMLButtonElement) {
        btn.addEventListener('click', () => {
            const carId = +car.classList[1];
            this.isDriveState[carId] = false;
            this.engineController.stopEngine(carId);
            const carWrapper = car.querySelector('.car-img-wrapper svg') as HTMLElement;
            carWrapper.style.transform = '';
        });
    }
}
