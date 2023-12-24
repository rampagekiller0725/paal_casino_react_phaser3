import Phaser from 'phaser';
import { ProgressBar } from 'phaser3-progressbar';
import background from './assets/imgs/table_green2.png';
import chip1 from './assets/imgs/chips/chip_1$.png';
import chip10 from './assets/imgs/chips/chip_10$.png';
import chip100 from './assets/imgs/chips/chip_100$.png';
import chip500 from './assets/imgs/chips/chip_500$.png';
import card2C from './assets/imgs/cards/2C.png';
import card2D from './assets/imgs/cards/2D.png';
import card2H from './assets/imgs/cards/2H.png';
import card2S from './assets/imgs/cards/2S.png';
import card3C from './assets/imgs/cards/3C.png';
import card3D from './assets/imgs/cards/3D.png';
import card3H from './assets/imgs/cards/3H.png';
import card3S from './assets/imgs/cards/3S.png';
import card4C from './assets/imgs/cards/4C.png';
import card4D from './assets/imgs/cards/4D.png';
import card4H from './assets/imgs/cards/4H.png';
import card4S from './assets/imgs/cards/4S.png';
import card5C from './assets/imgs/cards/5C.png';
import card5D from './assets/imgs/cards/5D.png';
import card5H from './assets/imgs/cards/5H.png';
import card5S from './assets/imgs/cards/5S.png';
import card6C from './assets/imgs/cards/6C.png';
import card6D from './assets/imgs/cards/6D.png';
import card6H from './assets/imgs/cards/6H.png';
import card6S from './assets/imgs/cards/6S.png';
import card7C from './assets/imgs/cards/7C.png';
import card7D from './assets/imgs/cards/7D.png';
import card7H from './assets/imgs/cards/7H.png';
import card7S from './assets/imgs/cards/7S.png';
import card8C from './assets/imgs/cards/8C.png';
import card8D from './assets/imgs/cards/8D.png';
import card8H from './assets/imgs/cards/8H.png';
import card8S from './assets/imgs/cards/8S.png';
import card9C from './assets/imgs/cards/9C.png';
import card9D from './assets/imgs/cards/9D.png';
import card9H from './assets/imgs/cards/9H.png';
import card9S from './assets/imgs/cards/9S.png';
import card10C from './assets/imgs/cards/10C.png';
import card10D from './assets/imgs/cards/10D.png';
import card10H from './assets/imgs/cards/10H.png';
import card10S from './assets/imgs/cards/10S.png';
import cardAC from './assets/imgs/cards/AC.png';
import cardAD from './assets/imgs/cards/AD.png';
import cardAH from './assets/imgs/cards/AH.png';
import cardAS from './assets/imgs/cards/AS.png';
import cardJC from './assets/imgs/cards/JC.png';
import cardJD from './assets/imgs/cards/JD.png';
import cardJH from './assets/imgs/cards/JH.png';
import cardJS from './assets/imgs/cards/JS.png';
import cardQC from './assets/imgs/cards/QC.png';
import cardQD from './assets/imgs/cards/QD.png';
import cardQH from './assets/imgs/cards/QH.png';
import cardQS from './assets/imgs/cards/QS.png';
import cardKC from './assets/imgs/cards/KC.png';
import cardKD from './assets/imgs/cards/KD.png';
import cardKH from './assets/imgs/cards/KH.png';
import cardKS from './assets/imgs/cards/KS.png';
import cardBack from './assets/imgs/cards/back.png';
import { getRandomInt } from './utils';

import { socket } from '../websocket';
import { EventDispatcher } from './EventDispatcher';

export default class BlackJackScene extends Phaser.Scene {
    cardsString: string[] = ['2C', '2D', '2H', '2S', '3C', '3D', '3H', '3S', '4C', '4D', '4H', '4S', '5C', '5D', '5H', '5S', '6C', '6D', '6H', '6S', '7C', '7D', '7H', '7S', '8C', '8D', '8H', '8S', '9C', '9D', '9H', '9S', '10C', '10D', '10H', '10S', 'JC', 'JD', 'JH', 'JS', 'QC', 'QD', 'QH', 'QS', 'KC', 'KD', 'KH', 'KS', 'AC', 'AD', 'AH', 'AS', 'backCard']
    progressBar: any;
    resultTxt: any;
    roomId: string = ''
    playerId: string = '';
    totalAmount: number = 2500;
    dealedTotalAmount: number = 0;

    playerCards1: any = [];
    playerCards2: any = [];
    dealerCards: any = [];
    playerCardIndexes1: number[] = [];
    playerCardIndexes2: number[] = [];
    dealerCardIndexes: number[] = [];
    playerCardsIndex: number = 1;
    
    chip_1: any;
    chip_10: any;
    chip_100: any;
    chip_500: any;
    hitBtn: any;
    splitBtn: any;
    insureBtn: any;
    standBtn: any;
    dealBtn: any;
    dealedAmountTxt: any;

    dealedChipTypes: any = [];
    dealedChips: any = [];
    emitter: any;

    playerType: string = 'Dealer';
    gameTurn: string = 'Player';

    constructor() {
        super({
            key: 'blackjack',
            active: true
        });
    }

    preload() {
        this.progressBar = new ProgressBar(this, {
            centerX: this.sys.canvas.width / 2,
            centerY: this.sys.canvas.height / 2,
            boxFill: 0x616c8c,
            boxStrokeColor: 0x616c8c,
            boxFillAlpha: 0.5,
            paddingH: 10,
            paddingV: 5,
            width: this.sys.canvas.width - 50,
            height: 30
            // ... other configuration ...
        });
        let loadingText = this.add
            .text(this.sys.canvas.width / 2, this.sys.canvas.height / 2 + 30, "LOADING")
            .setOrigin(0.5, 0)
            .setFontSize(25);
        this.load.start()

        this.load.on('progress', (value: number) => {
            this.progressBar.update(value);
        });

        this.load.on('complete', () => {
            this.progressBar.destroy();
            loadingText.destroy();
        });
        this.load.image('background', background);
        this.load.image('chip1', chip1);
        this.load.image('chip10', chip10);
        this.load.image('chip100', chip100);
        this.load.image('chip500', chip500);
        this.load.image('2C', card2C);
        this.load.image('2D', card2D);
        this.load.image('2H', card2H);
        this.load.image('2S', card2S);
        this.load.image('3C', card3C);
        this.load.image('3D', card3D);
        this.load.image('3H', card3H);
        this.load.image('3S', card3S);
        this.load.image('4C', card4C);
        this.load.image('4D', card4D);
        this.load.image('4H', card4H);
        this.load.image('4S', card4S);
        this.load.image('5C', card5C);
        this.load.image('5D', card5D);
        this.load.image('5H', card5H);
        this.load.image('5S', card5S);
        this.load.image('6C', card6C);
        this.load.image('6D', card6D);
        this.load.image('6H', card6H);
        this.load.image('6S', card6S);
        this.load.image('7C', card7C);
        this.load.image('7D', card7D);
        this.load.image('7H', card7H);
        this.load.image('7S', card7S);
        this.load.image('8C', card8C);
        this.load.image('8D', card8D);
        this.load.image('8H', card8H);
        this.load.image('8S', card8S);
        this.load.image('9C', card9C);
        this.load.image('9D', card9D);
        this.load.image('9H', card9H);
        this.load.image('9S', card9S);
        this.load.image('10C', card10C);
        this.load.image('10D', card10D);
        this.load.image('10H', card10H);
        this.load.image('10S', card10S);
        this.load.image('AC', cardAC);
        this.load.image('AD', cardAD);
        this.load.image('AH', cardAH);
        this.load.image('AS', cardAS);
        this.load.image('JC', cardJC);
        this.load.image('JD', cardJD);
        this.load.image('JH', cardJH);
        this.load.image('JS', cardJS);
        this.load.image('QC', cardQC);
        this.load.image('QD', cardQD);
        this.load.image('QH', cardQH);
        this.load.image('QS', cardQS);
        this.load.image('KC', cardKC);
        this.load.image('KD', cardKD);
        this.load.image('KH', cardKH);
        this.load.image('KS', cardKS);
        this.load.image('cardBack', cardBack);
    }

    create() {
    }

    start() {
        let screenWidth = this.scale.width;
        let screenHeight = this.scale.height;
        // set background
        let background = this.add.image(screenWidth / 2, screenHeight / 2, 'background');

        socket.onmessage = async (msg) => {
            let data = JSON.parse(msg.data);
            console.log(data);
            if (data.type === 'blackjack') {
                switch (data.instruction) {
                    case 'deal_ended':
                        if (this.playerType === "Dealer") {
                            this.dealedTotalAmount = data.dealedTotalAmount;
                            this.dealerCardIndexes = this.dealerCardIndexes.concat(data.dealerCardIndexes);
                            this.playerCardIndexes1 = this.playerCardIndexes1.concat(data.playerCardIndexes1);
                            for (let i = 0; i < data.dealedChipTypes.length; i++)
                                await this.dealchip(data.dealedChipTypes[i]);

                        } else if (this.playerType === 'Player') {
                            this.dealerCardIndexes = this.dealerCardIndexes.concat(data.dealerCardIndexes);
                            this.playerCardIndexes1 = this.playerCardIndexes1.concat(data.playerCardIndexes1);
                        }

                        this.goPlayStep();
                        break;
                    case 'hit':
                        this.dealerCardIndexes = data.dealerCardIndexes;
                        this.playerCardIndexes1 = data.playerCardIndexes1;
                        this.playerCardIndexes2 = data.playerCardIndexes2;
                        this.hit();
                        break;
                    case 'stand':
                        this.dealerCardIndexes = data.dealerCardIndexes;
                        this.playerCardIndexes1 = data.playerCardIndexes1;
                        this.playerCardIndexes2 = data.playerCardIndexes2;
                        this.stand();
                        break;
                    case 'insure':
                        this.dealerCardIndexes = data.dealerCardIndexes;
                        this.playerCardIndexes1 = data.playerCardIndexes1;
                        this.playerCardIndexes2 = data.playerCardIndexes2;
                        this.insure();
                        break;
                    case 'split':
                        this.dealerCardIndexes = data.dealerCardIndexes;
                        this.playerCardIndexes1 = data.playerCardIndexes1;
                        this.playerCardIndexes2 = data.playerCardIndexes2;
                        this.split();
                        break;
                }
            }
        }
        this.chip_10 = this.add.image(60, 540, 'chip10').setOrigin(0.5);
        this.chip_1 = this.add.image(30, 450, 'chip1').setOrigin(0.5);
        this.chip_100 = this.add.image(100, 630, 'chip100').setOrigin(0.5);
        this.chip_500 = this.add.image(190, 650, 'chip500').setOrigin(0.5);
        this.dealedAmountTxt = this.add.text(180, 50, '0').setFont('bold 50px Arial').setOrigin(0.5).setVisible(false);
        this.resultTxt = this.add.text(screenWidth/2, screenHeight/2, 'Player Win!').setFont('bold 50px Arial').setColor('#f00').setOrigin(0.5).setVisible(false);
        if (this.playerType === 'Player') {
            this.chip_10.setInteractive().on('pointerdown', async () => { await this.dealchip(10) });
            this.chip_1.setInteractive().on('pointerdown', async () => { await this.dealchip(1) });
            this.chip_100.setInteractive().on('pointerdown', async () => { await this.dealchip(100) });
            this.chip_500.setInteractive().on('pointerdown', async () => { await this.dealchip(500) });

            this.dealBtn = this.add.text(180, 500, 'Deal')
                .setOrigin(0.5)
                .setPadding(10)
                .setStyle({ background: '#F00' })
                .setBackgroundColor('#f00')
                .setInteractive({ useHandCursor: true })
                .setVisible(false)
                .on('pointerdown', () => {
                    socket.send(JSON.stringify({
                        type: 'blackjack',
                        instruction: 'deal_ended',
                        roomId: this.roomId,
                        dealedChipTypes: this.dealedChipTypes,
                        dealedTotalAmount: this.dealedTotalAmount,
                    }));
                })
                .on('pointerover', () => this.dealBtn.setStyle({ fill: '#f39c12' }))
                .on('pointerout', () => this.dealBtn.setStyle({ fill: '#FFF' }))
        }

        this.hitBtn = this.add.text(70, 300, "Hit!")
            .setOrigin(0.5)
            .setPadding(10)
            .setStyle({ background: '#F00' })
            .setBackgroundColor('#f00')
            .setInteractive({ useHandCursor: true })
            .setVisible(false)
            .on('pointerdown', () => {
                socket.send(JSON.stringify({
                    type: 'blackjack',
                    instruction: 'hit',
                    roomId: this.roomId,
                    playerId: this.playerId,
                    playerCardIndexes1: this.playerCardIndexes1,
                    playerCardIndexes2: this.playerCardIndexes2,
                    dealerCardIndexes: this.dealerCardIndexes,
                    playerCardsIndex: this.playerCardsIndex
                }))
            })
            .on('pointerover', () => this.hitBtn.setStyle({ fill: '#f39c12' }))
            .on('pointerout', () => this.hitBtn.setStyle({ fill: '#FFF' }))

        this.splitBtn = this.add.text(150, 300, "Split")
            .setOrigin(0.5)
            .setPadding(10)
            .setStyle({ background: '#F00' })
            .setBackgroundColor('#f00')
            .setInteractive({ useHandCursor: true })
            .setVisible(false)
            .on('pointerdown', () => {
                socket.send(JSON.stringify({
                    type: 'blackjack',
                    instruction: 'split',
                    roomId: this.roomId,
                    playerId: this.playerId,
                    playerCardIndexes1: this.playerCardIndexes1,
                    playerCardIndexes2: this.playerCardIndexes2,
                    dealerCardIndexes: this.dealerCardIndexes
                }))
            })
            .on('pointerover', () => this.splitBtn.setStyle({ fill: '#f39c12' }))
            .on('pointerout', () => this.splitBtn.setStyle({ fill: '#FFF' }))

        this.insureBtn = this.add.text(240, 300, "Insure")
            .setOrigin(0.5)
            .setPadding(10)
            .setStyle({ background: '#F00' })
            .setBackgroundColor('#f00')
            .setInteractive({ useHandCursor: true })
            .setVisible(false)
            .on('pointerdown', () => {
                socket.send(JSON.stringify({
                    type: 'blackjack',
                    instruction: 'insure',
                    roomId: this.roomId,
                    playerId: this.playerId,
                    playerCardIndexes1: this.playerCardIndexes1,
                    playerCardIndexes2: this.playerCardIndexes2,
                    dealerCardIndexes: this.dealerCardIndexes
                }))
            })
            .on('pointerover', () => this.insureBtn.setStyle({ fill: '#f39c12' }))
            .on('pointerout', () => this.insureBtn.setStyle({ fill: '#FFF' }))

        this.standBtn = this.add.text(330, 300, "Stand")
            .setOrigin(0.5)
            .setPadding(10)
            .setStyle({ background: '#F00' })
            .setBackgroundColor('#f00')
            .setInteractive({ useHandCursor: true })
            .setVisible(false)
            .on('pointerdown', () => {
                socket.send(JSON.stringify({
                    type: 'blackjack',
                    instruction: 'stand',
                    roomId: this.roomId,
                    playerId: this.playerId,
                    playerCardIndexes1: this.playerCardIndexes1,
                    playerCardIndexes2: this.playerCardIndexes2,
                    dealerCardIndexes: this.dealerCardIndexes,
                    playerCardsIndex: this.playerCardsIndex
                }))
            })
            .on('pointerover', () => this.standBtn.setStyle({ fill: '#f39c12' }))
            .on('pointerout', () => this.standBtn.setStyle({ fill: '#FFF' }))

    }

    dealchip(type: number) {
        return new Promise((resolve, reject) => {
            this.dealedChipTypes.push(type);
            let chip: any;
            new Promise((res, rej) => {
                switch (type) {
                    case 1:
                        chip = this.add.image(30, 450, 'chip1').setOrigin(0.5).setInteractive().on('pointerdown', async () => { await this.dealchip(1) });
                        this.add.tween({
                            targets: this.chip_1,
                            x: 60,
                            y: 80,
                            duration: 150,
                            yoyo: false,
                            ease: 'Linear',
                            repeat: 0
                        }).on("complete", () => {
                            let dealedChip = this.add.image(60, 80, 'chip1').setOrigin(0.5).setInteractive().on('pointerdown', async () => { await this.undealChip() });
                            this.dealedChips.push(dealedChip);
                            this.chip_1.destroy();
                            this.chip_1 = chip;
                            res(true);
                        })
                        break;
                    case 10:
                        chip = this.add.image(60, 540, 'chip10').setOrigin(0.5).setInteractive().on('pointerdown', async () => { await this.dealchip(10) });
                        this.add.tween({
                            targets: this.chip_10,
                            x: 60,
                            y: 80,
                            duration: 150,
                            yoyo: false,
                            ease: 'Linear',
                            repeat: 0
                        }).on('complete', () => {
                            let dealedChip = this.add.image(60, 80, 'chip10').setOrigin(0.5).setInteractive().on('pointerdown', async () => { await this.undealChip() });
                            this.dealedChips.push(dealedChip);
                            this.chip_10.destroy();
                            this.chip_10 = chip;
                            res(true);
                        })
                        break;
                    case 100:
                        chip = this.add.image(100, 630, 'chip100').setOrigin(0.5).setInteractive().on('pointerdown', async () => { await this.dealchip(100) });
                        this.add.tween({
                            targets: this.chip_100,
                            x: 60,
                            y: 80,
                            duration: 150,
                            yoyo: false,
                            ease: 'Linear',
                            repeat: 0
                        }).on('complete', () => {
                            let dealedChip = this.add.image(60, 80, 'chip100').setOrigin(0.5).setInteractive().on('pointerdown', async () => { await this.undealChip() });
                            this.dealedChips.push(dealedChip);
                            this.chip_100.destroy();
                            this.chip_100 = chip;
                            res(true);
                        })
                        break;
                    case 500:
                        chip = this.add.image(190, 650, 'chip500').setOrigin(0.5).setInteractive().on('pointerdown', async () => { await this.dealchip(500) });
                        this.add.tween({
                            targets: this.chip_500,
                            x: 60,
                            y: 80,
                            duration: 150,
                            yoyo: false,
                            ease: 'Linear',
                            repeat: 0
                        }).on('complete', () => {
                            let dealedChip = this.add.image(60, 80, 'chip500').setOrigin(0.5).setInteractive().on('pointerdown', async () => { await this.undealChip() });
                            this.dealedChips.push(dealedChip);
                            this.chip_500.destroy();
                            this.chip_500 = chip;
                            res(true);
                        })
                        break;
                }
            }).then(() => {
                this.dealedTotalAmount = 0;
                this.dealedChipTypes.map((type: number) => {
                    this.dealedTotalAmount += type;
                })
                this.dealedAmountTxt.text = '$' + this.dealedTotalAmount.toString();
                if (this.dealedTotalAmount !== 0) {
                    this.dealedAmountTxt.setVisible(true);
                    if (this.playerType === "Player") this.dealBtn.setVisible(true);
                }
                resolve(true);
            })
        })

    }

    undealChip() {
        return new Promise((resolve, reject) => {
            new Promise((res, rej) => {
                switch (this.dealedChipTypes[this.dealedChipTypes.length - 1]) {
                    case 1:
                        this.add.tween({
                            targets: this.dealedChips[this.dealedChips.length - 1],
                            x: 30,
                            y: 450,
                            duration: 150,
                            yoyo: false,
                            ease: 'Linear',
                            repeat: 0
                        }).on('complete', () => {
                            this.dealedChips[this.dealedChips.length - 1].destroy();
                            this.dealedChips.pop();
                            this.dealedChipTypes.pop();
                            res(true);
                        })
                        break;
                    case 10:
                        this.add.tween({
                            targets: this.dealedChips[this.dealedChips.length - 1],
                            x: 60,
                            y: 540,
                            duration: 150,
                            yoyo: false,
                            ease: 'Linear',
                            repeat: 0
                        }).on('complete', () => {
                            this.dealedChips[this.dealedChips.length - 1].destroy();
                            this.dealedChips.pop();
                            this.dealedChipTypes.pop();
                            res(true);
                        })
                        break;
                    case 100:
                        this.add.tween({
                            targets: this.dealedChips[this.dealedChips.length - 1],
                            x: 100,
                            y: 630,
                            duration: 150,
                            yoyo: false,
                            ease: 'Linear',
                            repeat: 0
                        }).on('complete', () => {
                            this.dealedChips[this.dealedChips.length - 1].destroy();
                            this.dealedChips.pop();
                            this.dealedChipTypes.pop();
                            res(true);
                        })
                        break;
                    case 500:
                        this.add.tween({
                            targets: this.dealedChips[this.dealedChips.length - 1],
                            x: 190,
                            y: 650,
                            duration: 150,
                            yoyo: false,
                            ease: 'Linear',
                            repeat: 0
                        }).on('complete', () => {
                            this.dealedChips[this.dealedChips.length - 1].destroy();
                            this.dealedChips.pop();
                            this.dealedChipTypes.pop();
                            res(true);
                        })
                        break;
                }
            }).then(() => {
                this.dealedTotalAmount = 0;
                this.dealedChipTypes.map((type: number) => {
                    this.dealedTotalAmount += type;
                });
                this.dealedAmountTxt.text = '$' + this.dealedTotalAmount.toString();
                if (this.dealedTotalAmount === 0) {
                    this.dealedAmountTxt.setVisible(false);
                    this.dealBtn.setVisible(false);
                }
                resolve(true);
            })
        });
    }

    goPlayStep() {
        this.dealedChips.map((chip: any) => { chip.removeInteractive() });
        this.chip_1.removeInteractive();
        this.chip_10.removeInteractive();
        this.chip_100.removeInteractive();
        this.chip_500.removeInteractive();
        if (this.playerType === "Player") this.dealBtn?.setVisible(false);

        this.showCards();
        if (this.playerType === this.gameTurn) {
            this.hitBtn.setVisible(true);
            this.standBtn.setVisible(true);
            if (this.cardsString[this.dealerCardIndexes[1]][0] === "A") this.insureBtn.setVisible(true);
            if (this.cardsString[this.playerCardIndexes1[0]][0] === this.cardsString[this.playerCardIndexes1[1]][0]) {
                this.splitBtn.setVisible(true);
            }
        }
    }

    addCard(newCard: any, type: string, splitedIndex?: number) {
        new Promise((res, rej) => {
            let deltaY = 0;
            if (splitedIndex === 1) deltaY = -50;
            else if (splitedIndex === 2) deltaY = 20; 
            this.add.tween({
                targets: newCard,
                x: type === 'Player' ? 260 + (this.playerCardsIndex === 1 ? this.playerCards1.length : this.playerCards2.length) * 30 : 290 + this.dealerCards.length * 30,
                y: type === 'Player' ? 480 + deltaY : 150,
                duration: 150,
                yoyo: false,
                ease: 'Linear',
                repeat: 0
            }).on('complete', () => {
                res(true);
            })
        })
    }

    calcScore(cardIndexes: number[]) {
        let score = 0;
        cardIndexes.map((index) => {
            if (this.cardsString[index][0] >= '0' && this.cardsString[index][0] <= '9') {
                if (this.cardsString[index][0] === '1' && this.cardsString[index][1] === '0') 
                    score += 10;
                else
                    score += parseInt(this.cardsString[index][0]);
            }
            else {
                if (this.cardsString[index][0] >= 'A') {
                    if (score + 10 > 21) score += 1;
                    else score += 11;
                } else {
                    score += 10;
                }
            }
        })
        return score;
    }

    wait(time: number) {
        return new Promise((res, rej) => {
            setTimeout(() => {
                res(true);
            }, time);
        })
    }

    async showCards() {
        for (let i = 0; i < this.playerCardIndexes1.length; i++) {
            let newCard = this.add.image(this.scale.width + 30, -30, this.cardsString[this.playerCardIndexes1[i]]).setScale(0.2, 0.25);
            await this.addCard(newCard, 'Player');
            this.playerCards1.push(newCard);
        }

        for (let i = 0; i < this.dealerCardIndexes.length; i++) {
            let newCard = this.add.image(this.scale.width + 30, this.scale.height + 30, i === 0 ? 'cardBack' : this.cardsString[this.dealerCardIndexes[i]]).setScale(0.2, 0.25);
            await this.addCard(newCard, 'Dealer');
            this.dealerCards.push(newCard);
        }
    }

    async hit() {
        if (this.dealerCardIndexes.length !== this.dealerCards.length) {
            let newCard = this.add.image(this.scale.width + 30, this.scale.height + 30, this.cardsString[this.dealerCardIndexes[this.dealerCardIndexes.length - 1]]).setScale(0.2, 0.25);
            await this.addCard(newCard, 'Dealer');
            this.dealerCards.push(newCard);
            this.splitBtn.setVisible(false);
            this.insureBtn.setVisible(false);
            if (this.calcScore(this.dealerCardIndexes) > 21) { this.stand(); }
        }
        if (this.playerCardIndexes1.length !== this.playerCards1.length) {
            let newCard = this.add.image(this.scale.width + 30, -30, this.cardsString[this.playerCardIndexes1[this.playerCardIndexes1.length - 1]]).setScale(0.2, 0.25);
            if (this.playerCardIndexes2.length > 0) await this.addCard(newCard, 'Player', 1);
            else await this.addCard(newCard, 'Player');
            this.playerCards1.push(newCard);
            this.splitBtn.setVisible(false);
            this.insureBtn.setVisible(false);
            if (this.calcScore(this.playerCardIndexes1) > 21) { this.stand(); this.stand();}
        }
        if (this.playerCardIndexes2.length !== this.playerCards2.length) {
            let newCard = this.add.image(this.scale.width + 30, -30, this.cardsString[this.playerCardIndexes2[this.playerCardIndexes2.length - 1]]).setScale(0.2, 0.25);
            if (this.playerCardIndexes2.length > 0) await this.addCard(newCard, 'Player', 2);
            else await this.addCard(newCard, 'Player');
            this.playerCards2.push(newCard);
            this.splitBtn.setVisible(false);
            this.insureBtn.setVisible(false);
            if (this.calcScore(this.playerCardIndexes2) > 21) { this.stand(); this.stand();}
        }
    }

    async split() {
        if (this.gameTurn === "Player") {
            this.add.tween({
                targets: this.playerCards1[0],
                x: 260,
                y: 430,
                duration: 150,
                yoyo: false,
                ease: 'Linear',
                repeat: 0
            });
            this.add.tween({
                targets: this.playerCards1[1],
                x: 260,
                y: 500,
                duration: 150,
                yoyo: false,
                ease: 'Linear',
                repeat: 0
            }).on('complete', () => {
                this.playerCards2.push(this.playerCards1[1]);
                this.playerCards1.pop();
                this.splitBtn.setVisible(false);
            });
        }
    }

    async insure() {
        this.dealedTotalAmount /= 2;
        this.insureBtn.setVisible(false);
    }

    async stand() {
        console.log(this.gameTurn);
        if (this.gameTurn === "Player") {
            if (this.playerCardIndexes2.length > 0 && this.playerCardsIndex === 1) { 
                this.gameTurn = "Player"; 
                this.playerCardsIndex = 2; 
            } else {
                this.gameTurn = "Dealer";
                this.dealerCards[0].setTexture(this.cardsString[this.dealerCardIndexes[0]]);
                if (this.playerType === "Player") {
                    this.hitBtn.setVisible(false);
                    this.standBtn.setVisible(false);
                } else {
                    this.hitBtn.setVisible(true);
                    this.standBtn.setVisible(true);
                }
            }
        } else if (this.gameTurn === "Dealer") {
            this.hitBtn.setVisible(false);
            this.standBtn.setVisible(false);
            
            let playerScore1 = this.calcScore(this.playerCardIndexes1);
            let playerScore2 = this.calcScore(this.playerCardIndexes2);
            let dealerScore = this.calcScore(this.dealerCardIndexes);
            console.log(playerScore1, playerScore2, dealerScore);
            if (playerScore1 > 21) this.resultTxt.text = 'Dealer Win! \nCash Out' + this.dealedTotalAmount + '$';
            else if (playerScore2 > 21) this.resultTxt.text = 'Dealer Win! \nCash Out' + this.dealedTotalAmount + '$';
            else if (dealerScore > 21) this.resultTxt.text  = 'Player Win! \nCash Out' + this.dealedTotalAmount + '$';
            else if (playerScore1 > dealerScore) this.resultTxt.text = 'Player Win! \nCash Out ' + this.dealedTotalAmount + '$';
            else if (playerScore1 === dealerScore) this.resultTxt.text = 'Push';
            else if (playerScore1 < dealerScore) this.resultTxt.text = 'Dealer Win! \nCash Out ' + this.dealedTotalAmount + '$';
            this.resultTxt.setVisible(true);
            await this.wait(2000);
            this.resultTxt.setVisible(false);
            await this.wait(2000);
            if (playerScore2 > 0) {
                if (playerScore2 > 21) this.resultTxt.text = 'Dealer Win! \nCash Out' + this.dealedTotalAmount + '$';
                else if (playerScore2 > 21) this.resultTxt.text = 'Dealer Win! \nCash Out' + this.dealedTotalAmount + '$';
                else if (dealerScore > 21) this.resultTxt.text  = 'Player Win! \nCash Out' + this.dealedTotalAmount + '$';
                else if (playerScore2 > dealerScore) this.resultTxt.text = 'Player Win! \nCash Out ' + this.dealedTotalAmount + '$';
                else if (playerScore2 === dealerScore) this.resultTxt.text = 'Push';
                else if (playerScore2 < dealerScore) this.resultTxt.text = 'Dealer Win! \nCash Out ' + this.dealedTotalAmount + '$';
                this.resultTxt.setVisible(true);
                await this.wait(2000);
                this.resultTxt.setVisible(false);
            }

            this.destroy();
        }
    }
    
    destroy() {
        this.playerCardIndexes1 = [];
        this.playerCardIndexes2 = [];
        this.dealerCardIndexes = [];
        this.playerCards1.map((card: any) => card.destroy());
        this.playerCards2.map((card: any) => card.destroy());
        this.dealerCards.map((card: any) => card.destroy());
        this.playerCards1 = [];
        this.playerCards2 = [];
        this.dealerCards = [];
        this.gameTurn = "Player";
        this.dealedChipTypes = [];
        this.dealedChips.map((chip: any) => chip.destroy());
        this.dealedChips = [];
        this.playerCardsIndex = 1;
        this.hitBtn.destroy();
        this.insureBtn.destroy();
        this.splitBtn.destroy();
        this.standBtn.destroy();
        this.chip_1.destroy();
        this.chip_10.destroy();
        this.chip_100.destroy();
        this.chip_500.destroy();
        this.dealedTotalAmount = 0;
        this.start();
    }
}