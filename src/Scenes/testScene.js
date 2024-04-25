class testScene extends Phaser.Scene {
    player;
    bullet;

    constructor(){
        super('testScene');
    }

    

    preload() {
        this.load.image("bullet", "assets/character_handPurple.png");
        this.load.image("player", "assets/character_roundPurple.png");
    }

    create() {
        this.player = this.add.sprite(250, 600, "player");
        this.bullet = this.add.sprite(250, 600, "bullet");
        this.bullet.setVisible(false);
        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if (this.aKey.isDown) {
            this.player.x = this.player.x - 5;
        }
        if (this.dKey.isDown) {
            this.player.x = this.player.x + 5;
        }
        if (this.spaceKey.isDown) {
            this.bullet.setVisible(true);
            this.bullet.x = this.player.x;
            this.bullet.y = this.player.y;
        }
        this.bullet.y = this.bullet.y - 8;
        if(this.bullet.y < 0){
            this.bullet.setVisible(false);
            //test
        }
    }

}