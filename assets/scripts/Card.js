// this.add.sprite(position.x, position.y, 'card').setOrigin(0, 0);

class Card extends Phaser.GameObjects.Sprite {
  constructor(scene, position) {
    super(scene, position.x, position.y, 'card');
    this.scene = scene;
    this.setOrigin(0, 0);
    this.scene.add.existing(this);
  }
}