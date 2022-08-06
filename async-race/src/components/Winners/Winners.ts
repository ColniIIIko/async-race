import { WinnersController } from '../resourceController/WinnersController';
import { Winner } from '../types/types';
import { WinnerSpot } from '../View/WinnerSpot';

const LIMIT = 10;
enum paginationMove {
    forward = 1,
    backward = -1,
}

export class WinnerTable {
    winnersController: WinnersController;
    winnerSpot: WinnerSpot;
    page: number;
    winnersAmount: number;

    constructor() {
        this.winnersController = new WinnersController();
        this.winnerSpot = new WinnerSpot();
        this.page = 1;
        this.winnersAmount = 0;
    }

    display() {
        const winnersTemp = document.querySelector('#winners') as HTMLTemplateElement;
        const winnersClone = winnersTemp.content.cloneNode(true) as HTMLTableElement;
        document.querySelector('.content')?.append(winnersClone);

        this.setClickHandlers();
        this.setPaginationHandler();
        this.update();

        this.winnersController.getWinners({ _limit: LIMIT, _page: this.page }).then((winners: Winner[]) => {
            winners.forEach((winner, index) => {
                this.winnerSpot.draw(winner, index);
            });
        });
    }

    private setClickHandlers() {
        const winsHead = document.querySelector('.winners__head__wins');
        winsHead?.addEventListener(
            'click',
            (() => {
                let isASC = true;
                return () => {
                    document.querySelector('.winners__content')!.innerHTML = '';
                    this.winnersController
                        .getWinners({ _page: this.page, _limit: LIMIT, _sort: 'wins', _order: isASC ? 'ASC' : 'DESC' })
                        .then((winners: Winner[]) => {
                            winners.forEach((winner, index) => this.winnerSpot.draw(winner, index));
                            isASC = !isASC;
                        });
                };
            })()
        );

        const timeHead = document.querySelector('.winners__head__time');
        timeHead?.addEventListener(
            'click',
            (() => {
                let isASC = true;
                return () => {
                    document.querySelector('.winners__content')!.innerHTML = '';
                    this.winnersController
                        .getWinners({ _page: this.page, _limit: LIMIT, _sort: 'time', _order: isASC ? 'ASC' : 'DESC' })
                        .then((winners: Winner[]) => {
                            winners.forEach((winner, index) => this.winnerSpot.draw(winner, index));
                            isASC = !isASC;
                        });
                };
            })()
        );
    }

    private setPaginationHandler() {
        const pagination = (move: paginationMove) => {
            document.querySelector('.winners__content')!.innerHTML = '';
            this.winnersController
                .getWinners({ _limit: LIMIT, _page: (this.page += move) })
                .then((winner: Winner[]) => {
                    winner.forEach((winner, index) => {
                        this.winnerSpot.draw(winner, index);
                    });
                });
            this.update();
        };

        const forwardBtn = document.querySelector('.pagination-control__forward') as HTMLButtonElement;
        forwardBtn.addEventListener('click', () => {
            if (this.page * LIMIT < this.winnersAmount) {
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
        this.winnersAmount = await this.winnersController.getWinnersAmount(LIMIT);
        (document.querySelector(
            '.winners__title'
        ) as HTMLElement)!.textContent = `Winners (${this.winnersAmount.toString()})`;

        (document.querySelector('.winners__page') as HTMLElement)!.textContent = `Page #(${this.page})`;
    }
}
