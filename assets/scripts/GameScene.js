class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
    this.load.image('bg', 'assets/sprites/background.png');
    this.load.image('card', 'assets/sprites/card.png');
  }

  create() {
    // this.add.sprite(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'bg');
    this.add.sprite(0, 0, 'bg').setOrigin(0, 0);

    let positions = this.getCardsPositions();

    for (const position of positions) {
      this.add.sprite(position.x, position.y, 'card').setOrigin(0, 0);
    }
  }

  getCardsPositions() {
    let positions = [];
    const cardTextures = this.textures.get('card').getSourceImage();
    const cardWidth = cardTextures.width;
    const cardHeight = cardTextures.height;
    const cardGap = 10;

    const offsetX = (config.width - (cardWidth + cardGap) * config.cols) / 2;
    const offsetY = (config.height - (cardHeight + cardGap) * config.rows) / 2;;

    for (let row = 0; row < config.rows; row++) {
      for (let col = 0; col < config.cols; col++) {
        positions.push(
          {
            x: offsetX + col * (cardWidth + cardGap),
            y: offsetY + row * (cardHeight + cardGap),
          },
        )
      }
    }

    return positions;
  }
}
