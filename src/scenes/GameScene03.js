import Phaser from "phaser";

let bgRun01, block, block2, block3, block4, block5,
    block6,block6Spawns,block6Group,
    player,
    FruitGroup, FruitEvent, fruit,
    monster, monsterGroup, monsterSpawn,
    monster2Group, monster2Spawn, monster2,
    rock, rockGroup, rockSpawn,
    rock2, rock2Group, rock2Spawn;
let heartGroup, heart, manyheart = 5;
let keyA, keyD, keyW, keyS, keyQ;
let monsterPain, music, playerSound;

class GameScene03 extends Phaser.Scene {
    constructor(test) {
        super({
            key: "GameScene03",
        });
    }

    preload() {
        this.load.image("mainbg", "src/image/bgnight01.png");
        this.load.image("bgRun01", "src/image/bgnight02.png");
        this.load.image("block", "src/image/block2.png");
        this.load.image("fruit", "src/image/ninja-fruit.png");
        this.load.spritesheet("player", "src/image/ninja.png", { frameWidth: 227.7, frameHeight: 280, });

        //--------------------------------------เสียง--------------------------------------//
        this.load.audio("run", "src/sound/run.mp3");
        this.load.audio("painSound", "src/sound/pain.mp3");
        this.load.audio("Bebosssong", "src/image/song/BeBoss.wav");
        this.load.audio("fruitSound", "src/sound/fruitSd.mp3");

        //--------------------------------------หิน--------------------------------------//
        this.load.image("rock", "src/image/หิน1.png");
        this.load.image("rock2", "src/image/หิน2.png");

        //--------------------------------------มอนส้ม--------------------------------------//
        this.load.spritesheet("monsterOrange", "src/image/ส้มเดิน.png", { frameWidth: 178.75, frameHeight: 185, });
        this.load.spritesheet("monsterOrangeDie", "src/image/ส้มตุย2.png", { frameWidth: 205, frameHeight: 201, });
        this.load.spritesheet("monsterOrangeAtk", "src/image/ส้มตี.png", { frameWidth: 179, frameHeight: 193, });

        //--------------------------------------มอนชมพู--------------------------------------//
        this.load.spritesheet("monsterPink", "src/image/ชมพูเดิน.png", { frameWidth: 300, frameHeight: 165, });
        this.load.spritesheet("monsterPinkDie", "src/image/ชมพูตุย.png", { frameWidth: 214, frameHeight: 206, });
        this.load.spritesheet("monsterPinkAtk", "src/image/ชมพูตี.png", { frameWidth: 300, frameHeight: 165, });
    }

    create() {
        music = this.sound.add("Bebosssong").setVolume(0.2);
        music.play({ loop: true });

        playerSound = this.sound.add("fruitSound").setVolume(0.1);

        monsterPain = this.sound.add("painSound").setVolume(0.2);

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

        //block can go
        block6Group = this.physics.add.group();
        block6Spawns = this.time.addEvent({
            delay: 20000,
            callback: function () {
                block6 = this.physics.add.image(340, 20, "block")
                    .setDepth(100)
                    .setVisible(0)
                    .setImmovable()
                    .setSize(10, 720)
                    .setOffset(1250, 300);
                block6Group.add(block6);
            },
            callbackScope: this,
            loop: false,
            repeat: 1,
            pause: false,
        });

        //--------------------------------------player--------------------------------------//
        player = this.physics.add.sprite(100, 450, "player")
            .setDepth(10)
            .setScale(0.7)
            .setSize(100, 100)
            .setOffset(50, 100);
        this.anims.create({
            key: "playerrunLv3",
            frames: this.anims.generateFrameNumbers("player", {
                start: 0,
                end: 9,
            }),
            duration: 500,
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

        //--------------------------------------create animation มอนส้ม--------------------------------------//
        this.anims.create({
            key: "monsterOrangeanim",
            frames: this.anims.generateFrameNumbers("monsterOrange", {
                start: 0,
                end: 3,
            }),
            duration: 350,
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

        //--------------------------------------Spawn หิน1--------------------------------------//
        rockGroup = this.physics.add.group();

        rockSpawn = this.time.addEvent({
            delay: 3000,
            callback: function () {
                rock = this.physics.add.image(Phaser.Math.Between(1300, 1400), Phaser.Math.Between(250, 650), "rock")
                    .setDepth(8)
                    .setScale(0.25)
                    .setSize(600, 400)
                    .setOffset(50, 150);
                rockGroup.add(rock).setVelocityX(-400);
            },
            callbackScope: this,
            loop: false,
            repeat: 8,
            pause: false,
        })

        //--------------------------------------Spawn หิน2--------------------------------------//
        rock2Group = this.physics.add.group();

        rock2Spawn = this.time.addEvent({
            delay: 6000,
            callback: function () {
                rock2 = this.physics.add.image(Phaser.Math.Between(1300, 1500), Phaser.Math.Between(250, 600), "rock2")
                    .setDepth(8)
                    .setScale(0.25)
                    .setSize(600, 400)
                    .setOffset(50, 150);
                rock2Group.add(rock2).setVelocityX(-400);
            },
            callbackScope: this,
            loop: false,
            repeat: 5,
            pause: false,
        })


        //--------------------------------------Spawn มอนส้ม--------------------------------------//
        monsterGroup = this.physics.add.group();

        monsterSpawn = this.time.addEvent({
            delay: 1000,
            callback: function () {
                monster = this.physics.add.sprite(Phaser.Math.Between(1300, 1400), Phaser.Math.Between(250, 680), "monsterOrange")
                    .setDepth(8)
                    .setScale(0.7)
                    .setSize(100, 160)
                    .setOffset(50, 10);
                monsterGroup.add(monster).setVelocityX(-600);
                monster.anims.play("monsterOrangeanim", true);
                monster.flipX = true;
            },
            callbackScope: this,
            loop: false,
            repeat: 20,
            pause: false,
        });

        //--------------------------------------create animation มอนชมพู--------------------------------------//
        this.anims.create({
            key: "monsterPinkanim",
            frames: this.anims.generateFrameNumbers("monsterPink", {
                start: 1,
                end: 4,
            }),
            duration: 400,
            framerate: 5,
            repeat: -1,
        });

        this.anims.create({
            key: "monsterPinkDieanim",
            frames: this.anims.generateFrameNumbers("monsterPinkDie", {
                start: 0,
                end: 7,
            }),
            duration: 800,
            framerate: 0,
        });

        this.anims.create({
            key: "monsterPinkAtkanim",
            frames: this.anims.generateFrameNumbers("monsterPinkAtk", {
                start: 0,
                end: 5,
            }),
            duration: 400,
            framerate: 0,
        });

        //--------------------------------------Spawn มอนชมพู--------------------------------------//
        monster2Group = this.physics.add.group();

        monster2Spawn = this.time.addEvent({
            delay: 1600,
            callback: function () {
                monster2 = this.physics.add.sprite(Phaser.Math.Between(1300, 1280), Phaser.Math.Between(250, 680), "monsterPink")
                    .setDepth(8)
                    .setScale(0.8)
                    .setSize(100, 160)
                    .setOffset(50, 10);
                monster2Group.add(monster2).setVelocityX(-600);
                monster2.anims.play("monsterPinkanim", true);
                monster2.flipX = true;
            },
            callbackScope: this,
            loop: false,
            repeat: 15,
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
        this.physics.add.collider(player, block6Group, (player, block6) => {
            this.scene.start("GameScene04");
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
        this.physics.add.collider(block5, monster2Group, (block5, monster2) => {
            manyheart--;
            for (let i = heartGroup.getChildren().length - 1; i >= 0; i--) {
                if (manyheart < i + 1) {
                    heartGroup.getChildren()[i].setVisible(false);
                } else {
                    heartGroup.getChildren()[i].setVisible(true);
                }
            }
            monster2.destroy();
        });

        //------------------------------ตัวส้มโจมตี------------------------------//
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

        //--------------------------------------fruit Vs มอนส้ม(ตาย)--------------------------------------//
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

        //------------------------------ตัวชมพูโจมตี------------------------------//
        this.physics.add.overlap(
            monster2Group,
            block3,
            (monster2Group, block3) => {
                monster2.anims.play("monsterPinkAtkanim", true);
                monster2.setVelocityX(-900);
            }
        );

        this.physics.add.overlap(
            monsterGroup,
            block4,
            (monster2Group, block4) => {
                monster2.anims.play("monsterPinkanim", true);
                // monster.setVelocityX(-600);
            }
        );

        //--------------------------------------player Vs monsterOrange --------------------------------//
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
        this.physics.add.collider(player, monster2Group, (player, monster2) => {
            manyheart--;
            for (let i = heartGroup.getChildren().length - 1; i >= 0; i--) {
                if (manyheart < i + 1) {
                    heartGroup.getChildren()[i].setVisible(false);
                } else {
                    heartGroup.getChildren()[i].setVisible(true);
                }
            }
            monster2.destroy();
        });

        //--------------------------------------fruit Vs มอนชมพู(ตาย)--------------------------------------//
        this.physics.add.overlap(
            FruitGroup,
            monster2Group,
            (fruit, monster2) => {
                monster2.anims.play("monsterPinkDieanim", true);
                monster2.setVelocityX(0);
                monster2.setOffset(-2000, 5000);
                monsterPain.play();

                fruit.destroy();
                this.time.addEvent({
                    delay: 600,
                    callback: function () {
                        monster2.destroy();
                    },
                    callbackScope: this,
                    loop: false,
                });
            }
        );

        //-------------------------------------ชนหินแล้วโดนบีบ--------------------------------------//
        this.physics.add.collider(player, rockGroup, (player, rock) => {
            rock.setVelocityX(-600);

        })

        this.physics.add.collider(player, rock2Group, (player, rock2) => {
            rock2.setVelocityX(-600);

        })
    }

    update(delta, time) {
        bgRun01.tilePositionX += 5;
        player.anims.play("playerrunLv3", true);
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

        //--------------------------------------Rotate fruits--------------------------------------//
        for (var i = 0; i < FruitGroup.getChildren().length; i++) {
            var fruits = FruitGroup.getChildren()[i];
            fruits.rotation += 0.2;

            if (fruits.x > 1280) {
                fruits.destroy();
            }
        }
    }
}
export default GameScene03;
