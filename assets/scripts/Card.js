class Card extends Phaser.GameObjects.Sprite {
  constructor(scene, value, delay) {
    super(scene, -1000, -1000, 'card');
    this.delay = delay;
    this.scene = scene;
    this.value = value;
    this.opened = false;
    this.scene.add.existing(this);
    this.setInteractive();
  }

  init(position) {
    this.position = position;
    this.close();
    this.setPosition(-this.width, -this.height);
  }

  move(params) {
    this.scene.tweens.add({
      targets: this,
      x: params.x,
      y: params.y,
      delay: this.delay,
      ease: 'Linear',
      duration: 150,
      onComplete: () => {

      }
    });
  }

  flip() {
    this.scene.tweens.add({
      targets: this,
      scaleX: 0,
      ease: 'Linear',
      duration: 150,
      onComplete: () => {
        this.show();
      }
    });
  }

  show() {
    let texture = this.opened ? `card${this.value}` : 'card';
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
    this.flip();
  }

  close() {
    if (!this.opened) return;
    this.opened = false;
    this.flip();
  }
}