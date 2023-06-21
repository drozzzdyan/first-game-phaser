import Phaser from "./phaser.js";

export default class game extends Phaser.Scene {
  constructor() {
    super('game');
  }


  preload() {
    this.load.image('ball', './assets/ball.png');
    this.load.image('ground', './assets/ground.png');
  }

  create() {
    const ball = this.physics.add.sprite(240, 0, 'ball');
    const ground = this.physics.add.staticImage(400, 550, 'ground')
    ball.body.collideWorldBounds = true;
    ball.body.bounce.set(0.6);
    this.physics.add.collider(ground, ball);
  }

  update() {

  }
}