import Phaser from "phaser";

let mainbg, block, player, enemy1, FruitGroup,
    FruitEvent, fruit, demon, demonGroup, demonSpawn;
let keyA, keyD, keyW, keyS, keyVis, keyQ;
let music, soundVis;

class GameScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: "GameScene",
        });
    }

    preload() {
        this.load.image("mainbg", "src/image/BG.jpg");
        this.load.image("block", "src/image/block2.png");

        this.load.image("fruit", "src/image/ninja-fruit.png");

        this.load.spritesheet("player", "src/image/ninja.png", {
            frameWidth: 229.2,
            frameHeight: 280,
        });
        this.load.spritesheet("smoke", "src/image/smoke.png", {
            frameWidth: 125.25,
            frameHeight: 100,
        });
        this.load.audio("song", "src/image/song/gamesong.mp3");
        this.load.audio("soundVis", "src/image/song/visiblesoundDis.mp3");

        this.load.spritesheet("demon", "src/image/demon.png", {
            frameWidth: 178.75,
            frameHeight: 185,
        });

        this.load.spritesheet("enemy1", "src/image/player1.png", {
            frameWidth: 180,
            frameHeight: 247,
        });
    }

    create() {
        //BackG
        mainbg = this.add
            .tileSprite(0, -20, 1280, 720, "mainbg")
            .setDepth(0)
            .setScale(2.2);

        //block ช่วยให้ตัวละครไม่เดินขึ้นไปมากกว่านี้
        block = this.physics.add
            .image(150, 130, "block")
            .setDepth(10)
            .setVisible(0)
            .setImmovable()
            .setSize(1280, 0)
            .setOffset(0, 0);

        //Player
        player = this.physics.add
            .sprite(400, 600, "player")
            .setDepth(10)
            .setScale(0.7)
            .setSize(100, 100)
            .setOffset(50, 100);
        //.setGravityY(6000);

        //Aims set
        this.anims.create({
            key: "playerrun",
            frames: this.anims.generateFrameNumbers("player", {
                start: 0,
                end: 4,
            }),
            duration: 450,
            framerate: 0,
            repeat: -1,
        });

        //smoke set
        this.anims.create({
            key: "smokeVis",
            frames: this.anims.generateFrameNumbers("smoke", {
                start: 0,
                end: 7,
            }),
            duration: 300,
            framerate: 0,
            repeat: -1,
        });

        //Enemy01

        // demon = this.physics.add
        //     .sprite(Phaser.Math.Between(600,1100),
        //             600,'demon')
        //     // (1200, 600, "demon")
        //     .setDepth(10)
        //     .setScale(0.7)
        //     .setSize(100, 100)
        //     .setOffset(50, 100)
        //     .setVelocityX(-100);

        //Enemy set
        this.anims.create({
            key: "demonanim",
            frames: this.anims.generateFrameNumbers("demon", {
                start: 0,
                end: 3,
            }),
            duration: 500,
            framerate: 0,
            repeat: -1,
        });

        demonGroup = this.physics.add.group();

        demonSpawn = this.time.addEvent({
            delay: 3000,
            callback: function () {
                demon = this.physics.add
                    .sprite(Phaser.Math.Between(900, 1100),
                        Phaser.Math.Between(400, 600), 'demon')
                    .setDepth(10)
                    .setScale(0.7)
                    .setSize(100, 160)
                    .setOffset(50, 10);

                demonGroup.add(demon)
                    .setVelocityX(-100);


                demon.anims.play("demonanim", true);
                demon.flipX = true;
            },
            callbackScope: this,
            loop: true,
            pause: false
        });


        //Fruit set
        FruitGroup = this.physics.add.group();

        // FruitEvent = this.time.addEvent({
        //     delay: 1000,
        //     callback: function () {
        //         fruits = this.physics.add.image(fruit.x, fruit.y, 'fruit')
        //             .setScale(0.2);

        //         FruitGroup.add(fruits);

        //         FruitGroup.setValocityX(-200);
        //     },
        //     callbackScope: this,
        //     loop: true,
        //     pause: false
        // });

        //KEY
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyVis = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);

        //wallblock
        player.setCollideWorldBounds(true);
        this.physics.add.collider(player, block);
        this.physics.add.collider(player, enemy1);

        this.physics.add.collider(player, demonGroup, (player, demon) => {
            demon.destroy();

        });

        this.physics.add.collider(FruitGroup, demonGroup, (fruit, demon) => {
            fruit.destroy();
            demon.destroy();
        });


        //music
        music = this.sound.add("song").setVolume(0.1).play({ loop: true });
        soundVis = this.sound.add("soundVis").setVolume(0.5);
    }

    update(delta, time) {
        mainbg.tilePositionX += 0;

        //Enemy1 Anims
        // demon.anims.play("demonanim", true);
        // demon.flipX = true;

        //Key WS STOP
        if (keyS.isDown) {
            player.setVelocityY(200);
        } else if (keyW.isDown) {
            player.setVelocityY(-200);
        } else {
            player.setVelocityY(0);
        }

        //Key AD STOP
        if (keyA.isDown) {
            player.setVelocityX(-200);
            mainbg.tilePositionX -= 2;
            player.flipX = true;
        } else if (keyD.isDown) {
            player.setVelocityX(200);
            mainbg.tilePositionX += 2;
            player.flipX = false;
        } else {
            player.setVelocityX(0);
            player.anims.play("playerrun", true);
        }

        //KeySpace
        if (keyVis.isDown) {
            player.anims.play("smokeVis", true);
            player.setVelocityX(-50);
        } else if (keyVis.isUp) {
            player.anims.play("playerrun", true);
            //mainbg.tilePositionX += 4;
            soundVis.play();
        }

        //KeyQ
        if (Phaser.Input.Keyboard.JustDown(keyQ)) {

            fruit = this.physics.add.image(player.x, player.y, 'fruit')
                .setScale(0.1);
            // fruit.rotation += 1;
            FruitGroup.add(fruit);
            FruitGroup.setVelocityX(200)
        }

        // this.physics.add.collider(fruit, demon, (fruit, demon)=> {

        //     fruit.destroy();
        //     demon.destroy();
        //     });
    }
}
export default GameScene;
