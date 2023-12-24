import BlackJackScene from "./scenes/BlackJackScene";
import BaccaratScene from "./scenes/BaccaratScene";

export const blackjackConfig = {
  type: Phaser.AUTO,
  parent: 'blackjack-game',
  backgroundColor: '#282c34',
  scale: {
    mode: Phaser.Scale.ScaleModes.RESIZE,
    width: window.innerWidth,
    height: window.innerHeight,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 },
    },
  },
  scene: [BlackJackScene],
}

export const baccaratConfig = {
  type: Phaser.AUTO,
  parent: 'baccarat-game',
  backgroundColor: '#282c34',
  scale: {
    mode: Phaser.Scale.ScaleModes.RESIZE,
    width: window.innerWidth,
    height: window.innerHeight,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 },
    },
  },
  scene: [BaccaratScene],
}