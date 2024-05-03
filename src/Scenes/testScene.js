class testScene extends Phaser.Scene {
    //player;
    //bullet;

    constructor(){
        super('testScene');
        this.my = {sprite: {}};
        this.my.sprite.bullet = [];
        this.my.sprite.enemyBullets = [];
        this.maxBullets = 4;

    }

    

    preload() {
        this.load.image("bulletPlayer", "assets/laserBlue1.png");
        this.load.image("bulletGreen", "assets/laserGreen1.png");
        this.load.image("bulletPink", "assets/laserPink1.png");
        this.load.image("player", "assets/playerShip1_blue.png");
        this.load.image("enemyPink", "assets/shipPink_manned.png");
        this.load.image("enemyGreen", "assets/shipGreen_manned.png");
        this.load.image("pinkExplosion", "assets/laserPink_burst.png");
        this.load.image("blueExplosion", "assets/laserBlue_burst.png");
        this.load.image("greenExplosion", "assets/laserGreen_burst.png");


    }

    create() {
        let my = this.my;
        my.sprite.player = this.add.sprite(500, 750, "player");
        my.sprite.enemyPink1 = this.add.follower(this.path2, 450, 150, "enemyPink");
        my.sprite.enemyPink2 = this.add.sprite(550, 150, "enemyPink");
        my.sprite.enemyPink3 = this.add.sprite(350, 150, "enemyPink");
        my.sprite.enemyPink4 = this.add.sprite(250, 150, "enemyPink");
        my.sprite.enemyPink5 = this.add.sprite(650, 150, "enemyPink");
        my.sprite.enemyPink1.setScale(.5);
        my.sprite.enemyPink2.setScale(.5);
        my.sprite.enemyPink3.setScale(.5);
        my.sprite.enemyPink4.setScale(.5);
        my.sprite.enemyPink5.setScale(.5);
        
        my.sprite.enemyGreen1 = this.add.follower(this.path1, 350, 250, "enemyGreen");
        my.sprite.enemyGreen2 = this.add.sprite(450, 250, "enemyGreen");
        my.sprite.enemyGreen3 = this.add.sprite(550, 250, "enemyGreen");
        my.sprite.enemyGreen1.setScale(.5);
        my.sprite.enemyGreen2.setScale(.5);
        my.sprite.enemyGreen3.setScale(.5);


        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.fKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

        this.playerSpeed = 10;
        this.bulletSpeed = 24;

        this.anims.create({
            key: "explosionPink",
            frames: [
                {key: "pinkExplosion"}
            ],
            framerate: 30,
            repeat: 5,
            hideOnComplete: true
        });

        this.anims.create({
            key: "explosionBlue",
            frames: [
                {key: "blueExplosion"}
            ],
            framerate: 30,
            repeat: 5,
            hideOnComplete: true
        });

        this.anims.create({
            key: "explosionGreen",
            frames: [
                {key: "greenExplosion"}
            ],
            framerate: 30,
            repeat: 5,
            hideOnComplete: true
        });

        this.points1 = [
            292, 212,
            124, 313,
            787, 460,
            823, 741,
            9,   794
        ];

        this.points2 = [
            773, 115,
            644, 578,
            348, 299,
            187, 411,
            908, 789
        ];

        this.path1 = new Phaser.Curves.Spline(this.points1);
        this.path2 = new Phaser.Curves.Spline(this.points2);
    }

    update() {
        let my = this.my;

        if (this.aKey.isDown) {
            my.sprite.player.x -= this.playerSpeed; //this.player.x = this.player.x - 10;
        }
        if (this.dKey.isDown) {
            my.sprite.player.x += this.playerSpeed; //this.player.x = this.player.x + 10;
        }

        if (this.fKey.isDown){
            let enemyBullet = this.add.sprite(my.sprite.enemyGreen1.x, my.sprite.enemyGreen1.y - (my.sprite.enemyGreen1.displayHeight/2), "bulletGreen");
            let enemyBullet2 = this.add.sprite(my.sprite.enemyPink1.x, my.sprite.enemyPink1.y - (my.sprite.enemyPink1.displayHeight/2), "bulletPink");
            my.sprite.enemyBullets.push(enemyBullet);
            my.sprite.enemyBullets.push(enemyBullet2);
            enemyBullet.setScale(0.35);
            enemyBullet2.setScale(0.35);
            my.sprite.enemyGreen1.startFollow({
                from: 0,
                to: 1,
                delay: 0,
                duration: 2000,
                ease: 'Sine.easeInOut',
                repeat: -1,
                yoyo: true,
                rotateToPath: true,
                rotationOffset: -90
            });

            my.sprite.enemyPink1.startFollow({
                from: 0,
                to: 1,
                delay: 0,
                duration: 2000,
                ease: 'Sine.easeInOut',
                repeat: -1,
                yoyo: true,
                rotateToPath: true,
                rotationOffset: -90
            });
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

        for(let enemybullet of my.sprite.enemyBullets){
            enemybullet.y += this.bulletSpeed;
        }

        my.sprite.bullet = my.sprite.bullet.filter((bullet) => bullet.y > -(bullet.displayHeight/2));
        my.sprite.enemyBullets = my.sprite.enemyBullets.filter((enemyBullet) => enemyBullet.y < (config.height + 100));
        

        for(let bullet of my.sprite.bullet){
            for (let enemy of [
                my.sprite.enemyGreen1,
                my.sprite.enemyGreen2,
                my.sprite.enemyGreen3,
                my.sprite.enemyPink1,
                my.sprite.enemyPink2,
                my.sprite.enemyPink3,
                my.sprite.enemyPink4,
                my.sprite.enemyPink5,
            ]) {
                if(this.collides(enemy, bullet)) {
                this.explosionBlue = this.add.sprite(bullet.x, bullet.y, "blueExplosion").play("explosionBlue");
                bullet.y = -100;
                enemy.visible = false;
                enemy.x = -100;
                this.explosionBlue.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
                    enemy.visible = true;
                    //.x = Math.random()*config.width;
                }, this);
                }
            }
        }
        for(let enemybullet of my.sprite.enemyBullets){
            //console.log((enemybullet.texture.key));
            if(this.collides(my.sprite.player, enemybullet)){
                if(enemybullet.texture.key == "bulletGreen"){
                    this.explosionGreen = this.add.sprite(enemybullet.x, enemybullet.y, "greenExplosion").play("explosionGreen");
                    enemybullet.y = 900;
                }
                if(enemybullet.texture.key == "bulletPink"){
                    this.explosionPink = this.add.sprite(enemybullet.x, enemybullet.y, "pinkExplosion").play("explosionPink");
                    enemybullet.y = 900;
                }
            }
        }
    }

    collides(a,b){
        if(Math.abs(a.x - b.x) > (a.displayWidth/2 + b.displayWidth/2)) return false;
        if(Math.abs(a.y - b.y) > (a.displayHeight/2 + b.displayHeight/2)) return false;
        return true;
    }

}