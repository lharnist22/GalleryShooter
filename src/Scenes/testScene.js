class testScene extends Phaser.Scene {
    //player;
    //bullet;

    constructor(){
        super('testScene');
        this.my = {sprite: {}};
        this.my.sprite.bullet = [];
        this.my.sprite.enemyBullets = [];
        this.maxBullets = 4;
        this.my.sprite.enemyArray = [];
        this.my.score = 0;
        this.my.scoretext;
        this.my.lives = 3;
        this.my.livestext;

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
        this.load.audio("greenlaser", "assets/laserLarge_000.ogg")
        this.load.audio("pinklaser", "assets/laserLarge_001.ogg")
        this.load.audio("bluelaser", "assets/laserLarge_002.ogg")
        this.load.audio("explosion", "assets/Explosion_Sound.mp3")
    }

    create() {
        let my = this.my;

        this.points1 = [
            292, 212,
            450,   594,
            800, 300,
            1200, 300,
            292, 212
        ];

        this.points2 = [
            773, 115,
            590, 501,
            790, 521,
            1550, 115,
            773, 115
        ];

        this.path1 = new Phaser.Curves.Spline(this.points1);
        this.path2 = new Phaser.Curves.Spline(this.points2);

        my.sprite.player = this.add.sprite(500, 750, "player");
        my.sprite.enemyPink1 = this.add.follower(this.path2, 450, 150, "enemyPink");
        my.sprite.enemyPink2 = this.add.follower(this.path2, 550, 150, "enemyPink");
        my.sprite.enemyPink3 = this.add.follower(this.path2, 350, 150, "enemyPink");
        my.sprite.enemyPink4 = this.add.follower(this.path2, 250, 150, "enemyPink");
        my.sprite.enemyPink5 = this.add.follower(this.path2, 650, 150, "enemyPink");
        //console.log(typeof(my.sprite.enemyPink1));
        my.sprite.enemyArray.push(my.sprite.enemyPink1);
        my.sprite.enemyArray.push(my.sprite.enemyPink2);
        my.sprite.enemyArray.push(my.sprite.enemyPink3);
        my.sprite.enemyArray.push(my.sprite.enemyPink4);
        my.sprite.enemyArray.push(my.sprite.enemyPink5);
        my.sprite.enemyPink1.setScale(.5);
        my.sprite.enemyPink2.setScale(.5);
        my.sprite.enemyPink3.setScale(.5);
        my.sprite.enemyPink4.setScale(.5);
        my.sprite.enemyPink5.setScale(.5);
        
        my.sprite.enemyGreen1 = this.add.follower(this.path1, 350, 250, "enemyGreen");
        my.sprite.enemyGreen2 = this.add.follower(this.path1, 450, 250, "enemyGreen");
        my.sprite.enemyGreen3 = this.add.follower(this.path1, 550, 250, "enemyGreen");
        my.sprite.enemyArray.push(my.sprite.enemyGreen1);
        my.sprite.enemyArray.push(my.sprite.enemyGreen2);
        my.sprite.enemyArray.push(my.sprite.enemyGreen3);
        my.sprite.enemyGreen1.setScale(.5);
        my.sprite.enemyGreen2.setScale(.5);
        my.sprite.enemyGreen3.setScale(.5);


        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.rKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
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

        my.sprite.enemyGreen1.startFollow({
            from: 0,
            to: 1,
            delay: 0,
            duration: 10000,
            //ease: 'Sine.easeInOut',
            repeat: -1,
            yoyo: false,
            rotateToPath: false,
            rotationOffset: -90
        });

        my.sprite.enemyGreen2.startFollow({
            from: 0,
            to: 1,
            delay: 0,
            duration: 10000,
            //ease: 'Sine.easeInOut',
            repeat: -1,
            yoyo: false,
            rotateToPath: false,
            rotationOffset: -90
        });

        my.sprite.enemyGreen3.startFollow({
            from: 0,
            to: 1,
            delay: 0,
            duration: 10000,
            //ease: 'Sine.easeInOut',
            repeat: -1,
            yoyo: false,
            rotateToPath: false,
            rotationOffset: -90
        });

        my.sprite.enemyPink1.startFollow({
            from: 0,
            to: 1,
            delay: 0,
            duration: 10000,
            //ease: 'Sine.easeInOut',
            repeat: -1,
            yoyo: false,
            rotateToPath: false,
            rotationOffset: -90
        });

        my.sprite.enemyPink2.startFollow({
            from: 0,
            to: 1,
            delay: 0,
            duration: 10000,
            //ease: 'Sine.easeInOut',
            repeat: -1,
            yoyo: false,
            rotateToPath: false,
            rotationOffset: -90
        });

        my.sprite.enemyPink3.startFollow({
            from: 0,
            to: 1,
            delay: 0,
            duration: 10000,
            //ease: 'Sine.easeInOut',
            repeat: -1,
            yoyo: false,
            rotateToPath: false,
            rotationOffset: -90
        });

        my.sprite.enemyPink4.startFollow({
            from: 0,
            to: 1,
            delay: 0,
            duration: 10000,
            //ease: 'Sine.easeInOut',
            repeat: -1,
            yoyo: false,
            rotateToPath: false,
            rotationOffset: -90
        });

        my.sprite.enemyPink5.startFollow({
            from: 0,
            to: 1,
            delay: 0,
            duration: 10000,
            //ease: 'Sine.easeInOut',
            repeat: -1,
            yoyo: false,
            rotateToPath: false,
            rotationOffset: -90
        });
        console.log(my.score);
        this.my.scoretext = this.add.text(20, 750,'Score: ' + my.score);
        this.my.livestext = this.add.text(800, 750, 'Lives: ' + my.lives);
        
    }

    update() {
        let my = this.my;
        if(this.my.lives <= 0){
            this.add.text(300, 400,'Game over!', { fontSize: 48 });
            this.add.text(300, 500,'Press R to restart', { fontSize: 38 });
        }

        if (this.aKey.isDown) {
            if(my.sprite.player.x >= 50){
                my.sprite.player.x -= this.playerSpeed; //this.player.x = this.player.x - 10;
            }
        }
        if (this.dKey.isDown) {
            if(my.sprite.player.x <= 950){
                my.sprite.player.x += this.playerSpeed; //this.player.x = this.player.x + 10;
            }
        }

        if(this.rKey.isDown){
            this.my.lives = 3;
            this.my.score = 0;
            this.scene.restart();
        }

        if(my.sprite.enemyGreen1.x <= 100 && my.sprite.enemyGreen1.x >= 96 ||
           my.sprite.enemyGreen1.x <= 305 && my.sprite.enemyGreen1.x >= 301 ||
           my.sprite.enemyGreen1.x <= 605 && my.sprite.enemyGreen1.x >= 601){
             let enemyGreenBullet1 = this.add.sprite(my.sprite.enemyGreen1.x, my.sprite.enemyGreen1.y - (my.sprite.enemyGreen1.displayHeight/2), "bulletGreen");
             this.sound.play("greenlaser");
             my.sprite.enemyBullets.push(enemyGreenBullet1);
             enemyGreenBullet1.setScale(0.35);
        }

        if(my.sprite.enemyGreen2.x <= 150 && my.sprite.enemyGreen2.x >= 146 ||
            my.sprite.enemyGreen2.x <= 355 && my.sprite.enemyGreen2.x >= 351 ||
            my.sprite.enemyGreen2.x <= 655 && my.sprite.enemyGreen2.x >= 651){
              let enemyGreenBullet2 = this.add.sprite(my.sprite.enemyGreen2.x, my.sprite.enemyGreen2.y - (my.sprite.enemyGreen2.displayHeight/2), "bulletGreen");
              this.sound.play("greenlaser");
              my.sprite.enemyBullets.push(enemyGreenBullet2);
              enemyGreenBullet2.setScale(0.35);
         }

         if(my.sprite.enemyGreen3.x <= 200 && my.sprite.enemyGreen3.x >= 196 ||
            my.sprite.enemyGreen3.x <= 405 && my.sprite.enemyGreen3.x >= 401 ||
            my.sprite.enemyGreen3.x <= 705 && my.sprite.enemyGreen3.x >= 701){
              let enemyGreenBullet3 = this.add.sprite(my.sprite.enemyGreen3.x, my.sprite.enemyGreen3.y - (my.sprite.enemyGreen3.displayHeight/2), "bulletGreen");
              this.sound.play("greenlaser");
              my.sprite.enemyBullets.push(enemyGreenBullet3);
              enemyGreenBullet3.setScale(0.35);
         }

        if(my.sprite.enemyPink1.x <= 300 && my.sprite.enemyPink1.x >= 296 ||
            my.sprite.enemyPink1.x <= 502 && my.sprite.enemyPink1.x >= 498 ||
            my.sprite.enemyPink1.x <= 705 && my.sprite.enemyPink1.x >= 699){
              let enemyPinkBullet1 = this.add.sprite(my.sprite.enemyPink1.x, my.sprite.enemyPink1.y - (my.sprite.enemyPink1.displayHeight/2), "bulletPink");
              this.sound.play("pinklaser");
              my.sprite.enemyBullets.push(enemyPinkBullet1);  
              enemyPinkBullet1.setScale(0.35);
        }

        if(my.sprite.enemyPink2.x <= 400 && my.sprite.enemyPink2.x >= 396 ||
            my.sprite.enemyPink2.x <= 502 && my.sprite.enemyPink2.x >= 498 ||
            my.sprite.enemyPink2.x <= 705 && my.sprite.enemyPink2.x >= 701){
                let enemyPinkBullet2 = this.add.sprite(my.sprite.enemyPink2.x, my.sprite.enemyPink2.y - (my.sprite.enemyPink2.displayHeight/2), "bulletPink");
                this.sound.play("pinklaser");
                my.sprite.enemyBullets.push(enemyPinkBullet2);
                enemyPinkBullet2.setScale(0.35);
        }

        if(my.sprite.enemyPink3.x <= 500 && my.sprite.enemyPink3.x >= 496 ||
            my.sprite.enemyPink3.x <= 602 && my.sprite.enemyPink3.x >= 598 ||
            my.sprite.enemyPink3.x <= 705 && my.sprite.enemyPink3.x >= 701){
                let enemyPinkBullet3 = this.add.sprite(my.sprite.enemyPink3.x, my.sprite.enemyPink3.y - (my.sprite.enemyPink3.displayHeight/2), "bulletPink");
                this.sound.play("pinklaser");
                my.sprite.enemyBullets.push(enemyPinkBullet3);  
                enemyPinkBullet3.setScale(0.35);
         }

        if(Phaser.Input.Keyboard.JustDown(this.spaceKey)){
            //console.log("space was read");
            if(my.sprite.bullet.length < this.maxBullets){
                //console.log("if statement ran");
                this.sound.play("bluelaser");
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
                this.sound.play("explosion");
                this.explosionBlue = this.add.sprite(bullet.x, bullet.y, "blueExplosion").play("explosionBlue");
                //console.log("This is enemy", enemy);
                enemy.stopFollow();
                my.sprite.enemyArray.pop(enemy);
                bullet.y = -100;
                enemy.visible = false;
                //enemy.x = -1000;
                my.score += 25;
                
                if (this.my.scoretext) {
                    // If it exists, update its text content
                    this.my.scoretext.setText('Score: ' + my.score);
                }
                /*else{
                    scoretext = this.add.text(500, 500, my.score);
                }*/

                console.log(my.score);
                
                this.explosionBlue.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
                    enemy.visible = true;
                    enemy.x = Math.random()*300;
                    enemy.y = -100;
                    enemy.startFollow(10000);
                    //.x = Math.random()*config.width;
                }, this);
                }
            }
        }
        for(let enemybullet of my.sprite.enemyBullets){
            //console.log((enemybullet.texture.key));
            if(this.collides(my.sprite.player, enemybullet)){
                if(enemybullet.texture.key == "bulletGreen"){
                    this.sound.play("explosion");
                    this.explosionGreen = this.add.sprite(enemybullet.x, enemybullet.y, "greenExplosion").play("explosionGreen");
                    enemybullet.y = 900;
                    this.my.lives -= 1;
                    this.my.livestext.setText('Lives: ' + my.lives);
                }
                if(enemybullet.texture.key == "bulletPink"){
                    this.sound.play("explosion");
                    this.explosionPink = this.add.sprite(enemybullet.x, enemybullet.y, "pinkExplosion").play("explosionPink");
                    enemybullet.y = 900;
                    this.my.lives -= 1;
                    this.my.livestext.setText('Lives: ' + my.lives);
                }
            }
        }

        my.sprite.enemyArray = my.sprite.enemyArray.filter(enemy => enemy.visible);
        
        

        console.log(this.my.lives);

        for (let enemy of [
            my.sprite.enemyGreen1,
            my.sprite.enemyGreen2,
            my.sprite.enemyGreen3,
            my.sprite.enemyPink1,
            my.sprite.enemyPink2,
            my.sprite.enemyPink3,
            my.sprite.enemyPink4,
            my.sprite.enemyPink5,
        ])
        if(enemy.x < 0 || enemy.x > 1000){
            if(enemy.y < -50 || enemy.y > 1000){
                enemy.y = -10;
                enemy.startFollow(10000);
            }
            enemy.x = Math.random()*900;
            enemy.startFollow(10000);
        }
        

    }

    collides(a,b){
        if(Math.abs(a.x - b.x) > (a.displayWidth/2 + b.displayWidth/2)) return false;
        if(Math.abs(a.y - b.y) > (a.displayHeight/2 + b.displayHeight/2)) return false;
        return true;
    }

    

}