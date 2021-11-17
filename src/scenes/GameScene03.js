import Phaser from "phaser";

let bgRun01, block, block2, block3, block4,
    player,
    FruitGroup, FruitEvent, fruit,
    monster, monsterGroup, monsterSpawn,
    monster2Group, monster2Spawn, monster2,
    rock, rockGroup, rockSpawn,
    rock2, rock2Group, rock2Spawn;
let heartGroup, heart,manyheart = 5;
let keyA, keyD, keyW, keyS, keyQ;

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

        //--------------------------------------player--------------------------------------//
        player = this.physics.add.sprite(100, 450, "player")
            .setDepth(10)
            .setScale(0.7)
            .setSize(100, 100)
            .setOffset(50, 100);
        this.anims.create({
            key: "playerrunLv2",
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

        for (let i = 0; i < manyheart ; i++) {
            heart = this.physics.add.image(50 + i*80,670, "heart")
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
                end: 6,
            }),
            duration: 100,
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
                rock = this.physics.add.image(Phaser.Math.Between(1000, 1280), Phaser.Math.Between(300, 600), "rock")
                    .setDepth(8)
                    .setScale(0.25)
                    .setSize(600, 400)
                    .setOffset(50, 150);
                rockGroup.add(rock).setVelocityX(-600);
            },
            callbackScope: this,
            loop: false,
            repeat: 5,
            pause: false,
        })

        //--------------------------------------Spawn หิน2--------------------------------------//
        rock2Group = this.physics.add.group();

        rock2Spawn = this.time.addEvent({
            delay: 8000,
            callback: function () {
                rock2 = this.physics.add.image(Phaser.Math.Between(1000, 1280), Phaser.Math.Between(500, 750), "rock2")
                    .setDepth(8)
                    .setScale(0.25)
                    .setSize(600, 400)
                    .setOffset(50, 150);
                rock2Group.add(rock2).setVelocityX(-600);
            },
            callbackScope: this,
            loop: false,
            repeat: 5,
            pause: false,
        })


        //--------------------------------------Spawn มอนส้ม--------------------------------------//
        monsterGroup = this.physics.add.group();

        monsterSpawn = this.time.addEvent({
            delay: 3000,
            callback: function () {
                monster = this.physics.add.sprite(Phaser.Math.Between(1000, 1280), Phaser.Math.Between(400, 600), "monsterOrange")
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
            repeat: 10,
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
            duration: 100,
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
            delay: 2000,
            callback: function () {
                monster2 = this.physics.add.sprite(Phaser.Math.Between(1000, 1280), Phaser.Math.Between(450, 650), "monsterPink")
                    .setDepth(8)
                    .setScale(0.7)
                    .setSize(100, 160)
                    .setOffset(50, 10);
                monster2Group.add(monster2).setVelocityX(-600);
                monster2.anims.play("monsterPinkanim", true);
                monster2.flipX = true;
            },
            callbackScope: this,
            loop: false,
            repeat: 10,
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
        this.physics.add.collider(player, block2, (player, block2) => {
            this.scene.start("GameScene04");
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
            fruit.destroy();
            this.time.addEvent({
                delay: 200,
                callback: function () {
                    monster.destroy();
                },
                callbackScope: this,
                loop: false,
            });
        });

        //--------------------------------------ทำลายมอนส้ม--------------------------------------//
        // this.physics.add.overlap(
        //     monsterGroup,
        //     block2,
        //     (monsterGroup, block2) => {
        //         monster.destroy();
        //     }
        // );

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
            (monsterGroup, block4) => {
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
                fruit.destroy();
                this.time.addEvent({
                    delay: 200,
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

        //--------------------------------------ทำลายมอนชมพู--------------------------------------//
        // this.physics.add.overlap(
        //     monster2Group,
        //     block2,
        //     (monster2Group, block2) => {
        //         monster2.destroy();
        //     }
        // );
    }

    update(delta, time) {
        bgRun01.tilePositionX += 7;
        player.anims.play("playerrunLv2", true);
        if (manyheart == 0){
            this.scene.start('DeathScene')
        }

        //Key WS STOP
        if (keyS.isDown) {
            player.setVelocityY(500);
        } else if (keyW.isDown) {
            player.setVelocityY(-500);
        } else {
            player.setVelocityY(0);
        }
        //Key AD STOP
        if (keyA.isDown) {
            player.setVelocityX(-300);
        } else if (keyD.isDown) {
            player.setVelocityX(1000);
        } else {
            player.setVelocityX(0);
        }

        //KeyQ
        if (Phaser.Input.Keyboard.JustDown(keyQ)) {
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
