class testScene extends Phaser.Scene {
    //player;
    //bullet;

    constructor(){
        super('testScene');
        this.my = {sprite: {}};
        this.my.sprite.bullet = [];
        this.maxBullets = 4;
    }

    

    preload() {
        this.load.image("bulletPlayer", "assets/laserBlue1.png");
        this.load.image("player", "assets/playerShip1_blue.png");
        this.load.image("enemyPink", "assets/shipPink_manned.png");
        this.load.image("enemyGreen", "assets/shipGreen_manned.png");
    }

    create() {
        let my = this.my;
        my.sprite.player = this.add.sprite(500, 750, "player");
        my.sprite.enemyPink1 = this.add.sprite(450, 150, "enemyPink");
        my.sprite.enemyPink2 = this.add.sprite(550, 150, "enemyPink");
        my.sprite.enemyPink3 = this.add.sprite(350, 150, "enemyPink");
        my.sprite.enemyPink4 = this.add.sprite(250, 150, "enemyPink");
        my.sprite.enemyPink5 = this.add.sprite(650, 150, "enemyPink");
        my.sprite.enemyPink1.setScale(.5);
        my.sprite.enemyPink2.setScale(.5);
        my.sprite.enemyPink3.setScale(.5);
        my.sprite.enemyPink4.setScale(.5);
        my.sprite.enemyPink5.setScale(.5);
        
        my.sprite.enemyGreen1 = this.add.sprite(350, 250, "enemyGreen");
        my.sprite.enemyGreen2 = this.add.sprite(450, 250, "enemyGreen");
        my.sprite.enemyGreen3 = this.add.sprite(550, 250, "enemyGreen");
        my.sprite.enemyGreen1.setScale(.5);
        my.sprite.enemyGreen2.setScale(.5);
        my.sprite.enemyGreen3.setScale(.5);


        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.playerSpeed = 10;
        this.bulletSpeed = 24;
    }

    update() {
        let my = this.my;

        if (this.aKey.isDown) {
            my.sprite.player.x -= this.playerSpeed; //this.player.x = this.player.x - 10;
        }
        if (this.dKey.isDown) {
            my.sprite.player.x += this.playerSpeed; //this.player.x = this.player.x + 10;
        }

        if(Phaser.Input.Keyboard.JustDown(this.spaceKey)){
            //console.log("space was read");
            if(my.sprite.bullet.length < this.maxBullets){
                //console.log("if statement ran");
                let playerbullet = this.add.sprite(my.sprite.player.x, my.sprite.player.y-(my.sprite.player.displayHeight/2), "bulletPlayer");
                my.sprite.bullet.push(playerbullet);
                playerbullet.setScale(0.35);
            }
        }

        for(let bullet of my.sprite.bullet){
            bullet.y -= this.bulletSpeed;
        }

        my.sprite.bullet = my.sprite.bullet.filter((bullet) => bullet.y > -(bullet.displayHeight/2));
    }

}