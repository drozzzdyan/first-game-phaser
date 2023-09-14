// this.add.sprite(position.x, position.y, 'card').setOrigin(0, 0);

class Card extends Phaser.GameObjects.Sprite {
  constructor(scene, value, position) {
    super(scene, 0, 0, 'card');
    this.scene = scene;
    this.value = value;
    this.opened = false;
    this.scene.add.existing(this);
    this.setInteractive();
  }

  flip(texture = 'card') {
    this.scene.tweens.add({
      targets: this,
      scaleX: 0,
      ease: 'Linear',
      duration: 150,
      onComplete: () => {
        this.show(texture);
      }
    });
  }

  show(texture) {
    this.setTexture(texture);
    this.scene.tweens.add({
      targets: this,
      scaleX: 1,
      ease: 'Linear',
      duration: 150,
    });
  }

  open() {
    this.opened = true;
    this.flip(`card${this.value}`);
  }

  close() {
    this.opened = false;
    this.flip();
  }
}