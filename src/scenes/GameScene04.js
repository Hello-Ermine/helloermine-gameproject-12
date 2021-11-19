import Phaser from "phaser";

let bgRun01, block, block2, block3, block4, player, FruitGroup,
    FruitEvent, fruit, monster, monsterGroup, monsterSpawn,
    monster2Group, monster2Spawn, monster2,
    monster3Group, monster3Spawn, monster3,
    Bulletmonster3Group, Bulletmonster3Spawn, Bulletmonster3,
    rock, rockGroup, rockSpawn,
    rock2, rock2Group, rock2Spawn;
let heartGroup, heart, manyheart = 8;
let monheartGroup, monheart, manymonheart = 40;
let keyA, keyD, keyW, keyS, keyQ;
let monsterPain, music, winSound, bossSound, playerSound, bossBullet;

class GameScene04 extends Phaser.Scene {

    constructor(test) {
        super({
            key: 'GameScene04'
        });
    }

    preload() {
        this.load.image("mainbg", "src/image/bgnight01.png");
        this.load.image("bgRun01", "src/image/bgnight02.png");
        this.load.image("home", "src/image/home.png");
        this.load.image("block", "src/image/block2.png");
        this.load.image("fruit", "src/image/ninja-fruit.png");
        this.load.spritesheet("player", "src/image/ninja.png", { frameWidth: 227.7, frameHeight: 280 });

        //--------------------------------------sound--------------------------------------//
        this.load.audio("run", "src/image/song/run.aiff");
        this.load.audio("bosssong", "src/image/song/bossTheme.mp3");
        this.load.audio("BossHaha", "src/sound/hahaha.mp3");
        this.load.audio("fruitSound", "src/sound/fruitSd.mp3");
        this.load.audio("lazerSound", "src/sound/lazer2.mp3");

        //--------------------------------------rock-------------------------------------//
        this.load.image("rock", "src/image/rock01.png");
        this.load.image("rock2", "src/image/rock02.png");

        //--------------------------------------purple-------------------------------------//
        this.load.spritesheet("monsterPurple", "src/image/Purple.png", { frameWidth: 122, frameHeight: 130 });
        this.load.spritesheet("monsterPurpleDie", "src/image/PurpleDie.png", { frameWidth: 122, frameHeight: 130 });
        this.load.spritesheet("monsterPurpleAtk", "src/image/PurpleAtk.png", { frameWidth: 122, frameHeight: 130 });
        this.load.spritesheet("monsterPurpleHurt", "src/image/PurpleHurt.png", { frameWidth: 122, frameHeight: 130 });
        this.load.spritesheet("monsterPurpleSkill", "src/image/PurpleSkill.png", { frameWidth: 87, frameHeight: 54 });
    }

    create() {
        music = this.sound.add("bosssong").setVolume(1);
        music.play({ loop: true });

        monsterPain = this.sound.add("painSound").setVolume(0.5);
        bossSound = this.sound.add("BossHaha").setVolume(1);
        bossSound.play();

        bossBullet = this.sound.add("lazerSound").setVolume(0.5);

        playerSound = this.sound.add("fruitSound").setVolume(0.2);

        //--------------------------------------BackGround--------------------------------------//
        bgRun01 = this.add.tileSprite(0, 0, 1280, 720, "bgRun01")
            .setDepth(0)
            .setOrigin(0);

        //--------------------------------------block--------------------------------------//
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
        block3 = this.physics.add.image(-950, 20, "block")
            .setDepth(100)
            .setVisible(0)
            .setImmovable()
            .setSize(50, 720)
            .setOffset(1250, 300);


        //--------------------------------------player--------------------------------------//
        player = this.physics.add.sprite(100, 450, "player")
            .setDepth(10)
            .setScale(0.7)
            .setSize(100, 100)
            .setOffset(50, 100);
        this.anims.create({
            key: "playerrunlv4",
            frames: this.anims.generateFrameNumbers("player", {
                start: 0,
                end: 9,
            }),
            duration: 300,
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

        //--------------------------------------Spawn rock01--------------------------------------//
        rockGroup = this.physics.add.group();

        rockSpawn = this.time.addEvent({
            delay: 3000,
            callback: function () {
                rock = this.physics.add.image(Phaser.Math.Between(1000, 1280), Phaser.Math.Between(300, 600), "rock")
                    .setDepth(8)
                    .setScale(0.25)
                    .setSize(600, 400)
                    .setOffset(50, 150)
                    .setImmovable();
                rockGroup.add(rock).setVelocityX(-600);
            },
            callbackScope: this,
            loop: true,
            // repeat: 5,
            pause: false,
        })

        //--------------------------------------Spawn rock02--------------------------------------//
        rock2Group = this.physics.add.group();

        rock2Spawn = this.time.addEvent({
            delay: 8000,
            callback: function () {
                rock2 = this.physics.add.image(Phaser.Math.Between(1000, 1280), Phaser.Math.Between(500, 750), "rock2")
                    .setDepth(8)
                    .setScale(0.25)
                    .setSize(600, 400)
                    .setOffset(50, 150)
                    .setImmovable();
                rock2Group.add(rock2).setVelocityX(-600);
            },
            callbackScope: this,
            loop: true,
            // repeat: 5,
            pause: false,
        })

        //--------------------------------------create animation Purple--------------------------------------//
        this.anims.create({
            key: "monsterPurpleanim",
            frames: this.anims.generateFrameNumbers("monsterPurple", {
                start: 0,
                end: 4,
            }),
            duration: 400,
            framerate: 5,
        });

        this.anims.create({
            key: "monsterPurpleDieanim",
            frames: this.anims.generateFrameNumbers("monsterPurpleDie", {
                start: 0,
                end: 4,
            }),
            duration: 400,
            framerate: 0,
        });

        this.anims.create({
            key: "monsterPurpleHurtanim",
            frames: this.anims.generateFrameNumbers("monsterPurpleHurt", {
                start: 0,
                end: 4,
            }),
            duration: 400,
            framerate: 0,
        });

        this.anims.create({
            key: "monsterPurpleSkillanim",
            frames: this.anims.generateFrameNumbers("monsterPurpleSkill", {
                start: 0,
                end: 4,
            }),
            duration: 1200,
            framerate: 0,
            // loop: true,
            // pause: false,
        });

        //--------------------------------------Spawn Purple--------------------------------------//
        monster3Group = this.physics.add.group();

        monster3Spawn = this.time.addEvent({
            delay: 100,
            callback: function () {
                monster3 = this.physics.add.sprite(1080, 500, 'monsterPurple')
                    .setDepth(8)
                    .setScale(3)
                    .setSize(100, 100)
                    .setOffset(10, 10);
                monster3Group.add(monster3)
                    .setVelocityX(0);
                monster3.anims.play("monsterPurpleanim", true);
                monster3.flipX = false;
            },
            callbackScope: this,
            loop: false,
            repeat: 0,
            pause: false
        });

        //monheart
        monheartGroup = this.physics.add.group();
        for (let i = 0; i < manymonheart; i++) {
            monheart = this.physics.add.image(50 + i * 30, 100, "heart")
                .setScale(0.1)
                .setDepth(1000);
            monheartGroup.add(monheart);
        }

        //--------------------------------------Spawn bullet Purple--------------------------------------//
        Bulletmonster3Group = this.physics.add.group();

        Bulletmonster3Spawn = this.time.addEvent({
            delay: 250,
            callback: function () {
                Bulletmonster3 = this.physics.add.sprite(1100, Phaser.Math.Between(250, 650), 'monsterPurpleSkill')
                    .setDepth(7)
                    .setScale(1)
                    .setSize(0, 0)
                    .setOffset(0, 0);
                Bulletmonster3Group.add(Bulletmonster3)
                    .setVelocityX(-700);
                Bulletmonster3.anims.play("monsterPurpleSkillanim", true);
                Bulletmonster3.flipX = true;

                bossBullet.play();
            },
            callbackScope: this,
            loop: true,
            pause: false,
        });

        //--------------------------------------Fruit set--------------------------------------//
        FruitGroup = this.physics.add.group();

        //--------------------------------------KEY set--------------------------------------//
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //--------------------------------------wallblock--------------------------------------//
        player.setCollideWorldBounds(true);
        this.physics.add.collider(player, block);
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
        this.physics.add.collider(block3, Bulletmonster3Group, (block3, Bulletmonster3) => {
            manyheart--;
            for (let i = heartGroup.getChildren().length - 1; i >= 0; i--) {
                if (manyheart < i + 1) {
                    heartGroup.getChildren()[i].setVisible(false);
                } else {
                    heartGroup.getChildren()[i].setVisible(true);
                }
            }
            Bulletmonster3.destroy();
        });

        //--------------------------------------player Vs monster--------------------------------------//
        this.physics.add.collider(player, monster3Group, (player, monster3) => {
            this.scene.start('DeathScene')
            music.stop();
        });

        this.physics.add.collider(player, Bulletmonster3Group, (player, Bulletmonster3) => {
            manyheart--;
            for (let i = heartGroup.getChildren().length - 1; i >= 0; i--) {
                if (manyheart < i + 1) {
                    heartGroup.getChildren()[i].setVisible(false);
                } else {
                    heartGroup.getChildren()[i].setVisible(true);
                }
            }
            Bulletmonster3.destroy();
        });

        this.physics.add.collider(FruitGroup, Bulletmonster3Group, (fruit, Bulletmonster3) => {
            fruit.destroy();
            Bulletmonster3.destroy();
        });

        //--------------------------------------fruit Vs Purple--------------------------------------//
        this.physics.add.overlap(FruitGroup, monster3Group, (fruit, monster3) => {
            monster3.anims.play("monsterPurpleHurtanim", true);
            manymonheart--;
            for (let i = monheartGroup.getChildren().length - 1; i >= 0; i--) {
                if (manymonheart < i + 1) {
                    monheartGroup.getChildren()[i].setVisible(false);
                } else {
                    monheartGroup.getChildren()[i].setVisible(true);
                }
            }
            monster3.setVelocityX(0);
            monsterPain.play();

            fruit.destroy();
            this.time.addEvent({
                delay: 500,
                callback: function () {
                    // monster3.destroy();
                },
                callbackScope: this,
                loop: false
            })
        });

        //-------------------------------------Rock Vs Player--------------------------------------//
        this.physics.add.collider(player, rockGroup, (player, rock) => {
            rock.setVelocityX(-600);

        })

        this.physics.add.collider(player, rock2Group, (player, rock2) => {
            rock2.setVelocityX(-600);

        })

    }


    update() {
        bgRun01.tilePositionX += 7;
        player.anims.play("playerrunlv4", true);
        if (manyheart == 0) {

            this.scene.start('DeathScene')
            music.stop();
        }
        if (manymonheart == 0) {
            this.scene.start('WinScene')
            music.stop();
        }

        //Key WS STOP
        if (keyS.isDown) { player.setVelocityY(600); }
        else if (keyW.isDown) { player.setVelocityY(-600); }
        else { player.setVelocityY(0); }
        //Key AD STOP
        if (keyA.isDown) { player.setVelocityX(-600); }
        else if (keyD.isDown) { player.setVelocityX(400); }
        else { player.setVelocityX(0); }

        //KeyQ
        if (Phaser.Input.Keyboard.JustDown(keyQ)) {
            playerSound.play();
            fruit = this.physics.add.image(player.x, player.y, 'fruit')
                .setScale(0.12)
            FruitGroup.add(fruit)
            FruitGroup.setVelocityX(2000)
        }

        //--------------------------------------Rotate fruits--------------------------------------//
        for (var i = 0; i < FruitGroup.getChildren().length; i++) {
            var fruits = FruitGroup.getChildren()[i];
            fruits.rotation += 1;

            if (fruits.x > 1280) {
                fruits.destroy();
            }
        }
    }
}

export default GameScene04;