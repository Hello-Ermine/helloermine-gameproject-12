import Phaser from "phaser";

let mainbg, block, block2, block3,
    block4,block4Spawns,block4Group,
    player,
    FruitGroup, fruit,
    monster, monster1, monsterGroup, monsterSpawn, monsterSpawns,
    heartGroup, heart, manyheart = 5;
let keyA, keyD, keyW, keyS, keyQ;
let music, run, runSound, playerSound, monsterPain;
let home;

class GameScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: "GameScene",
        });
    }

    preload() {
        this.load.image("mainbg", "src/image/bgnight01.png");
        this.load.image("bgRun01", "src/image/bgnight02.png");
        this.load.image("home", "src/image/home.png");
        this.load.image("block", "src/image/block2.png");
        this.load.image("heart", "src/image/heart.png");
        this.load.image("fruit", "src/image/ninja-fruit.png");
        this.load.spritesheet("player", "src/image/ninja.png", { frameWidth: 227.7, frameHeight: 280, });

        //--------------------------------------sound--------------------------------------//
        this.load.audio("song", "src/image/song/gamesong.wav");
        this.load.audio("run", "src/sound/run.mp3");
        this.load.audio("fruitSound", "src/sound/fruitSd.mp3");
        this.load.audio("painSound", "src/sound/pain.mp3");


        this.load.spritesheet("monsterSheap", "src/image/Sheap.png", { frameWidth: 372, frameHeight: 293, });
        this.load.spritesheet("monsterSheapDie", "src/image/SheapDie.png", { frameWidth: 376, frameHeight: 293, });
        this.load.spritesheet("monsterSheapSleep", "src/image/SheapSleep.png", { frameWidth: 376, frameHeight: 293, });
        this.load.spritesheet("monsterSheapAtk", "src/image/SheapAtk.png", { frameWidth: 500, frameHeight: 293, });
        this.load.spritesheet("monsterSheapSkill", "src/image/SheapSkill.png", { frameWidth: 405, frameHeight: 407, });


    }

    create() {
        //music
        music = this.sound.add("song").setVolume(0.3);
        music.play({ loop: true });

        playerSound = this.sound.add("fruitSound").setVolume(0.2);

        monsterPain = this.sound.add("painSound").setVolume(0.3);

        //runsound
        // runSound = this.sound.add("run").setVolume(0.25);
        // runSound.play({ loop: true });

        //BackGround
        mainbg = this.add.tileSprite(0, 0, 1280, 720, "mainbg")
            .setDepth(0)
            .setOrigin(0);
        home = this.physics.add.image(0, 0, "home")
            .setDepth(5)
            .setOrigin(0)
            .setImmovable()
            .setOffset(-350, 500);
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
            .setSize(10, 720)
            .setOffset(1250, 300);
        block3 = this.physics.add.image(-20, 20, "block")
            .setDepth(100)
            .setVisible(0)
            .setImmovable()
            .setSize(10, 720)
            .setOffset(1250, 300);

        //block can go
        block4Group = this.physics.add.group();
        block4Spawns = this.time.addEvent({
            delay: 15000,
            callback: function () {
                block4 = this.physics.add.image(340, 20, "block")
                    .setDepth(100)
                    .setVisible(0)
                    .setImmovable()
                    .setSize(10, 720)
                    .setOffset(1250, 300);
                block4Group.add(block4);
            },
            callbackScope: this,
            loop: false,
            repeat: 1,
            pause: false,
        });


        //Player
        player = this.physics.add.sprite(400, 600, "player")
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
            key: "monsterSheapanim",
            frames: this.anims.generateFrameNumbers("monsterSheap", {
                start: 0,
                end: 4,
            }),
            duration: 400,
            framerate: 0,
            loop: true,
            repeat: 10,
        });

        this.anims.create({
            key: "monsterSheapDieanim",
            frames: this.anims.generateFrameNumbers("monsterSheapDie", {
                start: 0,
                end: 6,
            }),
            duration: 800,
            framerate: 0,
        });

        this.anims.create({
            key: "monsterSheapSleepanim",
            frames: this.anims.generateFrameNumbers("monsterSheapSleep", {
                start: 2,
                end: 6,
            }),
            duration: 400,
            framerate: 0,
        });

        this.anims.create({
            key: "monsterSheapAtkanim",
            frames: this.anims.generateFrameNumbers("monsterSheapAtk", {
                start: 0,
                end: 8,
            }),
            duration: 700,
            loop: true,
            pause: false,
            framerate: 0,
        });

        this.anims.create({
            key: "monsterSheapSkillanim",
            frames: this.anims.generateFrameNumbers("monsterSheapSkill", {
                start: 1,
                end: 3,
            }),
            duration: 600,
            framerate: 0,
        });

        monsterGroup = this.physics.add.group();

        monster1 = this.physics.add.sprite(1100, 500, "monsterSheapSleep")
            .setScale(0.5)
            .setVelocityX(0);

        monsterSpawns = this.time.addEvent({
            delay: 500,
            callback: function () {
                monsterGroup.add(monster1).setVelocityX(0);
                monster1.anims.play("monsterSheapanim", true);
                monster1.flipX = false;
            },
            callbackScope: this,
            loop: false,
            pause: false,
        });

        monsterSpawn = this.time.addEvent({
            delay: 2000,
            callback: function () {
                monster = this.physics.add.sprite(Phaser.Math.Between(1200, 1280), Phaser.Math.Between(300, 700), "monsterSheap")
                    .setDepth(8)
                    .setScale(0.4);
                monsterGroup.add(monster).setVelocityX(-500);
                monster.anims.play("monsterSheapanim", true);
                monster.flipX = false;
            },
            callbackScope: this,
            loop: false,
            repeat: 10,
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
        this.physics.add.collider(player, home);
        this.physics.add.collider(player, block4Group, (player, block4) => {
            this.scene.start("GameScene02");
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

        //monster Vs home
        this.physics.add.overlap(home, monsterGroup, (home, monster) => {
            monster.anims.play("monsterSheapSkillanim", true);
            manyheart--;
            for (let i = heartGroup.getChildren().length - 1; i >= 0; i--) {
                if (manyheart < i + 1) {
                    heartGroup.getChildren()[i].setVisible(false);
                } else {
                    heartGroup.getChildren()[i].setVisible(true);
                }
            }
            monster.setVelocityX(0);
            monster.setOffset(-2000, 5000);
            this.time.addEvent({
                delay: 200,
                callback: function () {
                    monster.destroy();
                },
                callbackScope: this,
                loop: false,
            });
        });

        //Vs monster
        this.physics.add.overlap(player, monsterGroup, (player, monster) => {
            monster.anims.play("monsterSheapSkillanim", true);
            manyheart--;
            for (let i = heartGroup.getChildren().length - 1; i >= 0; i--) {
                if (manyheart < i + 1) {
                    heartGroup.getChildren()[i].setVisible(false);
                } else {
                    heartGroup.getChildren()[i].setVisible(true);
                }
            }
            monster.setVelocityX(0);
            monster.setOffset(-2000, 5000);
            this.time.addEvent({
                delay: 200,
                callback: function () {
                    monster.destroy();
                },
                callbackScope: this,
                loop: false,
            });
        });

        this.physics.add.overlap(monsterGroup, block3, (monsterGroup, block3) => {
            monster.anims.play("monsterSheapAtkanim", true);
            monster.setVelocityX(-500);
        }
        );

        this.physics.add.overlap(monsterGroup, block3, (monsterGroup, block3) => {
            monster1.anims.play("monsterSheapAtkanim", true);
        }
        );


        this.physics.add.overlap(FruitGroup, monsterGroup, (fruit, monster) => {
            monster.anims.play("monsterSheapDieanim", true);
            monster.setVelocityX(0);
            monster.setOffset(-2000, 5000);
            monsterPain.play();

            fruit.destroy();
            this.time.addEvent({
                delay: 800,
                callback: function () {
                    monster.destroy();
                    // monster1.destroy();
                },
                callbackScope: this,
                loop: false,
            });
        });
    }

    update(delta, time) {
        mainbg.tilePositionX += 0;
        player.anims.play("playerrun", true);
        if (manyheart == 0) {
            this.scene.start('DeathScene')
            music.stop();
            // runSound.stop();
        }

        //Key WS STOP
        if (keyS.isDown) {
            player.setVelocityY(600);

        } else if (keyW.isDown) {
            player.setVelocityY(-600);

        } else {
            player.setVelocityY(0);

        }
        //Key AD STOP
        if (keyA.isDown) {
            player.setVelocityX(-600);

        } else if (keyD.isDown) {
            player.setVelocityX(600);

        } else {
            player.setVelocityX(0);

        }

        //KeyQ
        if (Phaser.Input.Keyboard.JustDown(keyQ)) {
            playerSound.play();
            fruit = this.physics.add
                .image(player.x + 50, player.y, "fruit")
                .setScale(0.1);
            FruitGroup.add(fruit);
            FruitGroup.setVelocityX(800);
        }

        for (var i = 0; i < FruitGroup.getChildren().length; i++) {
            var fruits = FruitGroup.getChildren()[i];
            fruits.rotation += 0.8;

            if (fruits.x > 1280) {
                fruits.destroy();
            }
        }
    }
}
export default GameScene;
