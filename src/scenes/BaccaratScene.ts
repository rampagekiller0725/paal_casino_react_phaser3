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

export default class BaccaratScene extends Phaser.Scene {
    cardsString: string[] = ['2C', '2D', '2H', '2S', '3C', '3D', '3H', '3S', '4C', '4D', '4H', '4S', '5C', '5D', '5H', '5S', '6C', '6D', '6H', '6S', '7C', '7D', '7H', '7S', '8C', '8D', '8H', '8S', '9C', '9D', '9H', '9S', '10C', '10D', '10H', '10S', 'JC', 'JD', 'JH', 'JS', 'QC', 'QD', 'QH', 'QS', 'KC', 'KD', 'KH', 'KS', 'AC', 'AD', 'AH', 'AS', 'backCard']
    progressBar: any;

    playerCardIndexes: number[] = [];
    bankerCardIndexes: number[] = [];
    playerCards: any[] = [];
    bankerCards: any[] = [];

    dealedAmounts: number[] = [0, 0, 0];

    chip_1: any;
    chip_10: any;
    chip_100: any;
    chip_500: any;
    dealBtn: any;
    playerCircle: any;
    tieCircle: any;
    bankerCircle: any;
    playerCircleTxt: any;
    tieCircleTxt: any;
    bankerCircleTxt: any;
    playerCircleScore: any;
    tieCircleScore: any;
    bankerCircleScore: any;

    playerId: string = '';

    constructor() {
        super({
            key: 'baccarat',
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

    setInitPos() {
        this.chip_1.x = 50;
        this.chip_1.y = 500;
        this.chip_10.x = 140;
        this.chip_10.y = 500;
        this.chip_100.x = 230;
        this.chip_100.y = 500;
        this.chip_500.x = 325;
        this.chip_500.y = 500;
    }

    start() {
        let screenWidth = this.scale.width;
        let screenHeight = this.scale.height;
        // set background
        let background = this.add.image(screenWidth / 2, screenHeight / 2, 'background');

        socket.onmessage = async (msg) => {
            let data = JSON.parse(msg.data);
            if (data.type === 'baccarat') {
                switch (data.instruction) {
                    case 'deal_ended':
                        this.playerCardIndexes = data.playerCardIndexes;
                        this.bankerCardIndexes = data.bankerCardIndexes;
                        this.goPlayStep();
                        break;
                }
            }
        }
        this.chip_1 = this.add.image(50, 500, 'chip1').setOrigin(0.5).setScale(0.5).setInteractive();
        this.chip_10 = this.add.image(140, 500, 'chip10').setOrigin(0.5).setScale(0.5).setInteractive();
        this.chip_100 = this.add.image(230, 500, 'chip100').setOrigin(0.5).setScale(0.5).setInteractive();
        this.chip_500 = this.add.image(325, 500, 'chip500').setOrigin(0.5).setScale(0.5).setInteractive();
        this.input.setDraggable([this.chip_1, this.chip_10, this.chip_100, this.chip_500]);

        this.playerCircle = this.add.circle(80, 350, 40)
            .setStrokeStyle(1, 0x0000ff)
            .setInteractive()
            .on("pointerdown", () => { 
                this.playerCircle.isFilled = false; 
                this.playerCircleScore.text = '';
                this.dealedAmounts[0] = 0;
                if (this.dealedAmounts[0] + this.dealedAmounts[1] + this.dealedAmounts[2] === 0) this.dealBtn.setVisible(false);
            })
            .on("pointerover", () => this.playerCircle.setStrokeStyle(1, 0xffffff))
            .on("pointerout", () => this.playerCircle.setStrokeStyle(1, 0x0000ff));
        this.playerCircleScore = this.add.text(80, 350, '').setOrigin(0.5);
        this.playerCircleTxt = this.add.text(80, 420, 'Player').setOrigin(0.5);
        this.tieCircle = this.add.circle(190, 330, 40)
            .setStrokeStyle(1, 0x00ff00)
            .setInteractive()
            .on("pointerdown", () => { 
                this.tieCircle.isFilled = false; 
                this.tieCircleScore.text = '';
                this.dealedAmounts[1] = 0;
                if (this.dealedAmounts[0] + this.dealedAmounts[1] + this.dealedAmounts[2] === 0) this.dealBtn.setVisible(false);
            })
            .on("pointerover", () => this.tieCircle.setStrokeStyle(1, 0xffffff))
            .on("pointerout", () => this.tieCircle.setStrokeStyle(1, 0x00ff00));
        this.tieCircleScore = this.add.text(190, 330, '').setOrigin(0.5);
        this.tieCircleTxt = this.add.text(190, 420, 'Tie').setOrigin(0.5);
        this.bankerCircle = this.add.circle(300, 350, 40)
            .setStrokeStyle(1, 0xff0000)
            .setInteractive()
            .on("pointerdown", () => { 
                this.bankerCircle.isFilled = false; 
                this.bankerCircleScore.text = '';
                this.dealedAmounts[2] = 0;
                if (this.dealedAmounts[0] + this.dealedAmounts[1] + this.dealedAmounts[2] === 0) this.dealBtn.setVisible(false);
            })
            .on("pointerover", () => this.bankerCircle.setStrokeStyle(1, 0xffffff))
            .on("pointerout", () => this.bankerCircle.setStrokeStyle(1, 0xff0000));
        this.bankerCircleScore = this.add.text(300, 350, '').setOrigin(0.5);
        this.bankerCircleTxt = this.add.text(300, 420, 'Banker').setOrigin(0.5);

        this.dealBtn = this.add.text(187, 600, 'Deal')
            .setOrigin(0.5)
            .setPadding(10)
            .setStyle({ background: '#F00' })
            .setBackgroundColor('#f00')
            .setInteractive({ useHandCursor: true })
            .setVisible(false)
            .on('pointerdown', () => {
                socket.send(JSON.stringify({
                    type: 'baccarat',
                    instruction: 'deal_ended',
                    playerId: this.playerId,
                }));
            })
            .on('pointerover', () => this.dealBtn.setStyle({ fill: '#f39c12' }))
            .on('pointerout', () => this.dealBtn.setStyle({ fill: '#FFF' }))

        this.input.on('drag', (pointer: any, gameObject: any) => {
            switch(gameObject.texture.key) {
                case 'chip1':
                    this.chip_1.x = pointer.x;
                    this.chip_1.y = pointer.y;
                    break;
                case 'chip10':
                    this.chip_10.x = pointer.x;
                    this.chip_10.y = pointer.y;
                    break;
                case 'chip100':
                    this.chip_100.x = pointer.x;
                    this.chip_100.y = pointer.y;
                    break;
                case 'chip500':
                    this.chip_500.x = pointer.x;
                    this.chip_500.y = pointer.y;
                    break;                
            }
        });
        this.input.on('dragend', (pointer: any, gameObject: any) => {
            let placeIndex = 3;
            switch(gameObject.texture.key) {
                case 'chip1':
                    this.chip_1.x = pointer.x;
                    this.chip_1.y = pointer.y;
                    placeIndex = this.dealedPlace(this.chip_1.x, this.chip_1.y);
                    if (placeIndex !== 3) {
                        this.dealedAmounts[placeIndex] += 1;
                    }
                    break;
                case 'chip10':
                    this.chip_10.x = pointer.x;
                    this.chip_10.y = pointer.y;
                    placeIndex = this.dealedPlace(this.chip_10.x, this.chip_10.y);
                    if (placeIndex !== 3) {
                        this.dealedAmounts[placeIndex] += 10;
                    }
                    break;
                case 'chip100':
                    this.chip_100.x = pointer.x;
                    this.chip_100.y = pointer.y;
                    placeIndex = this.dealedPlace(this.chip_100.x, this.chip_100.y);
                    if (placeIndex !== 3) {
                        this.dealedAmounts[placeIndex] += 100;
                    }
                    break;
                case 'chip500':
                    this.chip_500.x = pointer.x;
                    this.chip_500.y = pointer.y;
                    placeIndex = this.dealedPlace(this.chip_500.x, this.chip_500.y);
                    if (placeIndex !== 3) {
                        this.dealedAmounts[placeIndex] += 500;
                    }
                    break;  
            }
            if (placeIndex === 0) { 
                this.playerCircle.setFillStyle(0x0000ff);
                this.playerCircleScore.text = this.dealedAmounts[placeIndex].toString(); 
                this.dealBtn.setVisible(true);
            }
            else if (placeIndex === 1) {
                this.tieCircleScore.text = this.dealedAmounts[placeIndex].toString();
                this.tieCircle.setFillStyle(0x00ff00);
                this.dealBtn.setVisible(true);
            }
            else if (placeIndex === 2) {
                this.bankerCircleScore.text = this.dealedAmounts[placeIndex].toString();
                this.bankerCircle.setFillStyle(0xff0000);
                this.dealBtn.setVisible(true);
            }
            this.setInitPos();
        })
    }

    dealedPlace(x: number, y: number) {
        if (x >= 80 - 40 && x <= 80 + 40 && y >= 350 - 40 && y <= 350 + 40) return 0;
        else if (x >= 190 - 40 && x <= 190 + 40 && y >= 330 - 40 && y <= 330 + 40) return 1;
        else if (x >= 300 - 40 && x <= 300 + 40 && y >= 350 - 40 && y <= 350 + 40) return 2;
        else return 3;
    }

    calcScore(cardIndexes: number[]) {
        let totalScore = 0;
        cardIndexes.map((index) => {
            let score = 0;
            if (this.cardsString[index][0] === '1' && this.cardsString[index][1] === '0') score = 0;
            else if (this.cardsString[index][0] >= '0' && this.cardsString[index][0] <= '9') score = parseInt(this.cardsString[index][0]);
            else score = 0;
            totalScore = (totalScore + score) % 10;
        });
        return totalScore;
    }

    goPlayStep() {
        let objects = [this.playerCircle, this.tieCircle, this.bankerCircle, this.playerCircleScore, this.tieCircleScore, this.bankerCircleScore];
        let txtObjects = [this.playerCircleTxt, this.tieCircleTxt, this.bankerCircleTxt];
        this.chip_1.setVisible(false);
        this.chip_10.setVisible(false);
        this.chip_100.setVisible(false);
        this.chip_500.setVisible(false);
        this.dealBtn.setVisible(false);
        objects.map((obj) => {
            this.add.tween({
                targets: obj,
                y: this.scale.height - 100,
                duration: 150,
                yoyo: false,
                ease: 'Linear',
                repeat: 0
            })
        })
        txtObjects.map((obj) => {
            this.add.tween({
                targets: obj,
                y: this.scale.height - 20,
                duration: 150,
                yoyo: false,
                ease: 'Linear',
                repeat: 0
            })
        })

        // this.playerCards[0] = this.add.image()
    }
}