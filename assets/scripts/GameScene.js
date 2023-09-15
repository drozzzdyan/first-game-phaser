class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
    this.load.image('bg', 'assets/sprites/background.png');
    this.load.image('card', 'assets/sprites/card.png');
    for (let i = 1; i < config.cards.length + 1; i++) {
      this.load.image(`card${i}`, `assets/sprites/card${i}.png`);
    }
  }

  create() {
    this.createBackground();
    this.createText();
    this.createCards();
    this.start();
  }

  start() {
    this.openedCard = null;
    this.openedCardsCount = 0;
    this.initCards();
  }

  initCards() {
    let positions = this.getCardsPositions();
    this.cards.forEach(card => {
      let position = positions.pop();
      card.close();
      card.setPosition(position.x, position.y);
    })
  }

  createBackground() {
    this.add.sprite(0, 0, 'bg').setOrigin(0, 0);
  }

  createText() {
    this.timeoutText = this.add.text(10, 330, 'Time:', {
      fontFamily: 'Arial',
      fontSize: '24px',
      color: 'white',
    })

    console.log(this.timeoutText)
  }

  createCards() {
    this.cards = [];

    for (const value of config.cards) {
      for (let i = 0; i < 2; i++) {
        this.cards.push(new Card(this, value));
      }
    }

    this.input.on('gameobjectdown', this.onCardClicked, this)
  }

  onCardClicked(pointer, card) {
    if (card.opened) return false;

    if (this.openedCard) {
      if (this.openedCard.value === card.value) {
        this.openedCard = null;
        ++this.openedCardsCount;
      } else {
        this.openedCard.close();
        this.openedCard = card;
      }
    } else {
      this.openedCard = card;
    }

    card.open();
    if (this.openedCardsCount === this.cards.length / 2) {
      this.start();
    }
  }

  getCardsPositions() {
    let positions = [];
    const cardTextures = this.textures.get('card').getSourceImage();
    const cardWidth = cardTextures.width;
    const cardHeight = cardTextures.height;
    const cardGap = 10;

    const offsetX = (config.width - (cardWidth + cardGap) * config.cols) / 2 + cardWidth / 2;
    const offsetY = (config.height - (cardHeight + cardGap) * config.rows) / 2 + cardHeight / 2;

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

    return Phaser.Utils.Array.Shuffle(positions);
  }
}
