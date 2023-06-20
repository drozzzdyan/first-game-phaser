const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 200,
      },
    },
  },
  preload,
  create,
  update,
}

const game = new Phaser.Game(config);

let ball;

function preload() {
  game.load.image('ball', 'img/ball.png');
}

function create() {
  ball = game.add.image(400, 400, 'ball');
}

function update() {

}