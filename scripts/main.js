import Phaser from "./phaser.js";
import scene1 from "./game.js";

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
      debug: true,
    },
  },
  scene: [ scene1 ],
}

export default new Phaser.Game(config);