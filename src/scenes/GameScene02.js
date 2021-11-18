import Phaser from "phaser";

let bgRun01, block, block2, block3, block4, block5,
    player,
    FruitGroup, FruitEvent, fruit, monster,
    monsterGroup, monsterSpawn;
let heartGroup, heart, manyheart = 5;
let keyA, keyD, keyW, keyS, keyQ;
let music, monsterPain, playerSound;

class GameScene02 extends Phaser.Scene {
    constructor(test) {
        super({
            key: "GameScene02",
        });
    }

    preload() {
        this.load.image("mainbg", "src/image/bgnight01.png");
        this.load.image("bgRun01", "src/image/bgnight02.png");
        this.load.image("home", "src/image/home.png");
        this.load.image("block", "src/image/block2.png");
        this.load.image("fruit", "src/image/ninja-fruit.png");
        this.load.spritesheet("player", "src/image/ninja.png", { frameWidth: 227.7, frameHeight: 280, });

        //--------------------------------------เสียง--------------------------------------//
        this.load.audio("run", "src/sound/run.mp3");
        this.load.audio("painSound", "src/sound/pain.mp3");
        this.load.audio("song", "src/image/song/gamesong.wav");
        this.load.audio("fruitSound", "src/sound/fruitSd.mp3");


        this.load.spritesheet("monsterOrange", "src/image/ส้มเดิน.png", { frameWidth: 179, frameHeight: 193, });
        this.load.spritesheet("monsterOrangeDie", "src/image/ส้มตุย2.png", { frameWidth: 205, frameHeight: 201, });
        this.load.spritesheet("monsterOrangeAtk", "src/image/ส้มตี.png", { frameWidth: 179, frameHeight: 193, });
    }

    create() {
        music = this.sound.add("song").setVolume(0.2);
        music.play({ loop: true });

        playerSound = this.sound.add("fruitSound").setVolume(0.1);

        monsterPain = this.sound.add("painSound").setVolume(0.2);

        //BackGround
        bgRun01 = this.add.tileSprite(0, 0, 1280, 720, "bgRun01")
            .setDepth(0)
            .setOrigin(0);
        block = this.physics.add.image(355, -20, "block")
            .setDepth(100)
            .setVisible(0)
            .setImmovable()
            .setSize(1280, 0)
            .setOffset(0, 0);
        block2 = this.physics.add.image(355, 20, "block")
            .setDepth(100)
            .setVisible(0)
            .setImmovable()
            .setSize(50, 720)
            .setOffset(1250, 300);
        block3 = this.physics.add.image(-110, 20, "block")
            .setDepth(100)
            .setVisible(0)
            .setImmovable()
            .setSize(50, 720)
            .setOffset(1250, 300);
        block4 = this.physics.add.image(-450, 20, "block")
            .setDepth(100)
            .setVisible(0)
            .setImmovable()
            .setSize(50, 720)
            .setOffset(1250, 300);
        block5 = this.physics.add.image(-950, 20, "block")
            .setDepth(100)
            .setVisible(0)
            .setImmovable()
            .setSize(50, 720)
            .setOffset(1250, 300);

        //Player
        player = this.physics.add.sprite(100, 450, "player")
            .setDepth(10)
            .setScale(0.7)
            .setSize(100, 100)
            .setOffset(50, 100);
        this.anims.create({
            key: "playerrun",
            frames: this.anims.generateFrameNumbers("player", {
                start: 0,
                end: 9,
            }),
            duration: 700,
            framerate: 0,
            repeat: -1,
        });
        //heart
        heartGroup = this.physics.add.group();

        for (let i = 0; i < manyheart; i++) {
            heart = this.physics.add.image(50 + i * 80, 670, "heart")
                .setScale(0.1)
                .setDepth(1000);
            heartGroup.add(heart);
        }

        //Enemy set
        this.anims.create({
            key: "monsterOrangeanim",
            frames: this.anims.generateFrameNumbers("monsterOrange", {
                start: 0,
                end: 4,
            }),
            duration: 500,
            framerate: 0,
            repeat: -1,
        });

        this.anims.create({
            key: "monsterOrangeDieanim",
            frames: this.anims.generateFrameNumbers("monsterOrangeDie", {
                start: 0,
                end: 7,
            }),
            duration: 800,
            framerate: 0,
        });

        this.anims.create({
            key: "monsterOrangeAtkanim",
            frames: this.anims.generateFrameNumbers("monsterOrangeAtk", {
                start: 0,
                end: 3,
            }),
            duration: 400,
            framerate: 0,
            loop: true,
            pause: false,
        });

        this.anims.create({
            key: "monsterOrangeAtkanim2",
            frames: this.anims.generateFrameNumbers("monsterOrangeAtk", {
                start: 0,
                end: 3,
            }),
            duration: 400,
            framerate: 0,
            loop: true,
            pause: false,
        });

        monsterGroup = this.physics.add.group();

        monsterSpawn = this.time.addEvent({
            delay: 700,
            callback: function () {
                monster = this.physics.add.sprite(Phaser.Math.Between(1300, 1280), Phaser.Math.Between(250, 680), "monsterOrange")
                    .setDepth(8)
                    .setScale(0.7)
                    .setSize(100, 160)
                    .setOffset(50, 10);
                monsterGroup.add(monster).setVelocityX(-500);
                monster.anims.play("monsterOrangeanim", true);
                monster.flipX = true;
            },
            callbackScope: this,
            loop: false,
            repeat: 25,
            pause: false,
        });

        //Fruit set
        FruitGroup = this.physics.add.group();

        //KEY
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //wallblock
        player.setCollideWorldBounds(true);
        this.physics.add.collider(player, block);
        this.physics.add.collider(player, block2, (player, block2) => {
            this.scene.start("GameScene03");
            music.stop();
        });
        //fruit vs block2
        this.physics.add.overlap(block2, FruitGroup, (block2, fruit) => {
            fruit.destroy();
            manyheart--;
            for (let i = heartGroup.getChildren().length - 1; i >= 0; i--) {
                if (manyheart < i + 1) {
                    heartGroup.getChildren()[i].setVisible(false);
                } else {
                    heartGroup.getChildren()[i].setVisible(true);
                }
            }
        });

        this.physics.add.collider(block5, monsterGroup, (block5, monster) => {
            manyheart--;
            for (let i = heartGroup.getChildren().length - 1; i >= 0; i--) {
                if (manyheart < i + 1) {
                    heartGroup.getChildren()[i].setVisible(false);
                } else {
                    heartGroup.getChildren()[i].setVisible(true);
                }
            }
            monster.destroy();
        });

        //Vs monster
        this.physics.add.collider(player, monsterGroup, (player, monster) => {
            manyheart--;
            for (let i = heartGroup.getChildren().length - 1; i >= 0; i--) {
                if (manyheart < i + 1) {
                    heartGroup.getChildren()[i].setVisible(false);
                } else {
                    heartGroup.getChildren()[i].setVisible(true);
                }
            }
            monster.destroy();
        });

        this.physics.add.overlap(
            monsterGroup,
            block3,
            (monsterGroup, block3) => {
                monster.anims.play("monsterOrangeAtkanim", true);
                monster.setVelocityX(-900);
            }
        );

        this.physics.add.overlap(
            monsterGroup,
            block4,
            (monsterGroup, block4) => {
                monster.anims.play("monsterOrangeanim", true);
                // monster.setVelocityX(-600);
            }
        );

        this.physics.add.overlap(FruitGroup, monsterGroup, (fruit, monster) => {
            monster.anims.play("monsterOrangeDieanim", true);
            monster.setVelocityX(0);
            monster.setOffset(-2000, 5000);
            monsterPain.play();

            fruit.destroy();
            this.time.addEvent({
                delay: 600,
                callback: function () {
                    monster.destroy();
                },
                callbackScope: this,
                loop: false,
            });
        });
    }

    update(delta, time) {
        bgRun01.tilePositionX += 3;
        player.anims.play("playerrun", true);
        if (manyheart == 0) {
            this.scene.start('DeathScene')
            music.stop();
        }

        //Key WS STOP
        if (keyS.isDown) {
            player.setVelocityY(400);
        } else if (keyW.isDown) {
            player.setVelocityY(-400);
        } else {
            player.setVelocityY(0);
        }
        //Key AD STOP
        if (keyA.isDown) {
            player.setVelocityX(-600);
        } else if (keyD.isDown) {
            player.setVelocityX(400);
        } else {
            player.setVelocityX(0);
        }

        //KeyQ
        if (Phaser.Input.Keyboard.JustDown(keyQ)) {
            playerSound.play();
            fruit = this.physics.add
                .image(player.x, player.y, "fruit")
                .setScale(0.1);
            // fruit.rotation += 1;
            FruitGroup.add(fruit);
            FruitGroup.setVelocityX(800);
        }

        for (var i = 0; i < FruitGroup.getChildren().length; i++) {
            var fruits = FruitGroup.getChildren()[i];
            fruits.rotation += 0.2;

            if (fruits.x > 1280) {
                fruits.destroy();
            }
        }
    }
}
export default GameScene02;
