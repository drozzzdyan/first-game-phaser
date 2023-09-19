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
    this.load.audio('card', 'assets/sounds/card.mp3');
    this.load.audio('complete', 'assets/sounds/complete.mp3');
    this.load.audio('success', 'assets/sounds/success.mp3');
    this.load.audio('theme', 'assets/sounds/theme.mp3');
    this.load.audio('timeout', 'assets/sounds/timeout.mp3');
  }

  create() {
    this.timeout = config.timeout;
    this.createSounds();
    this.createTimer();
    this.createBackground();
    this.createText();
    this.createCards();
    this.start();
  }

  start() {
    this.timeout = config.timeout;
    this.openedCard = null;
    this.openedCardsCount = 0;
    this.timer.paused = false,
    this.initCards();
    this.showCards();
  }

  restart() {
    let count = 0;
    let onCardMoveCopleted = () => {
      ++count;
      if (count >= this.cards.length) {
        this.start();
      }
    }
    for (let i = 0; i < this.cards.length; i++) {
      const card = this.cards[i];
      card.move({
        x: this.sys.game.config.width + card.width,
        y: this.sys.game.config.height + card.height,
        delay: card.delay,
        callback: onCardMoveCopleted,
      })
    }
  }

  createSounds() {
    this.sounds = {
      card: this.sound.add('card'),
      complete: this.sound.add('complete'),
      success: this.sound.add('success'),
      theme: this.sound.add('theme'),
      timeout: this.sound.add('timeout'),
    }

    this.sounds.theme.play({ volume: 0.04 });
  }

  createTimer() {
    this.timer = this.time.addEvent({
      delay: 1000,
      loop: true,
      callbackScope: this, // передали контекст
      callback: this.onTimerTick,
    });
  }

  onTimerTick() {
    this.timeoutText.setText(`Time: ${this.timeout}`);
    if (this.timeout > 0) {
      --this.timeout;
    } else {
      this.timer.paused = true,
      this.sounds.timeout.play({ volume: 0.2 });
      this.restart();
    }
  }

  initCards() {
    let positions = this.getCardsPositions();
    this.cards.forEach(card => {
      card.init(positions.pop());
    })
  }

  showCards() {
    this.cards.forEach(card => {
      card.move({
        x: card.position.x,
        y: card.position.y,
        delay: card.delay,
      })
    })
  }

  createBackground() {
    this.add.sprite(0, 0, 'bg').setOrigin(0, 0);
  }

  createText() {
    this.timeoutText = this.add.text(10, 330, `Time: ${this.timeout}`, {
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
        this.cards.push(new Card(this, value, value * (i + 1) * 50));
      }
    }

    this.input.on('gameobjectdown', this.onCardClicked, this)
  }

  onCardClicked(pointer, card) {
    if (card.opened) return false;

    this.sounds.card.play({ volume: 0.1 });

    if (this.openedCard) {
      if (this.openedCard.value === card.value) {
        this.sounds.success.play({ volume: 0.1 });
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
      this.sounds.complete.play({ volume: 0.2 });
      this.restart();
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
