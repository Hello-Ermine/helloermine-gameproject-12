import Phaser from "phaser";

let mainbg, block, block2, player, enemy1, FruitGroup,
    FruitEvent, fruit, monster, monster1, monsterss, monsterGroup, monsterSpawn, monsterSpawns,
    heartGroup, playerHeart;
let keyA, keyD, keyW, keyS, keyQ;
let music;
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

        this.load.image("fruit", "src/image/ninja-fruit.png");
        this.load.spritesheet("player", "src/image/ninja.png", { frameWidth: 227.7, frameHeight: 280 });
        this.load.audio("song", "src/image/song/gamesong.mp3");
        this.load.spritesheet("monsterSheap", "src/image/แกะเดิน.png", { frameWidth: 372, frameHeight: 293 });
        this.load.spritesheet("monsterSheapDie", "src/image/แกะตุย.png", { frameWidth: 376, frameHeight: 293 });
        this.load.spritesheet("monsterSheapSleep", "src/image/แกะตุย2.png", { frameWidth: 376, frameHeight: 293 });
        this.load.spritesheet("monsterSheapSkill", "src/image/พลังแกะ.png", { frameWidth: 405, frameHeight: 407 });
    }

    create() {
        //music
        music = this.sound.add("song").setVolume(0);
        music.play({ loop: true });
        //BackGround
        mainbg = this.add
            .tileSprite(0, 0, 1280, 720, "mainbg")
            .setDepth(0)
            .setOrigin(0);
        home = this.physics.add
            .image(0, 0, "home")
            .setDepth(9)
            .setOrigin(0)
            .setImmovable()
            .setOffset(-350, 500);
        block = this.physics.add
            .image(355, -20, "block")
            .setDepth(100)
            .setVisible(0)
            .setImmovable()
            .setSize(1280, 0)
            .setOffset(0, 0);
        block2 = this.physics.add
            .image(355, 20, "block")
            .setDepth(100)
            .setVisible(0)
            .setImmovable()
            .setSize(50, 720)
            .setOffset(1250, 300);

        //Player
        player = this.physics.add
            .sprite(400, 600, "player")
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

        //Enemy set
        this.anims.create({
            key: "monsterSheapanim",
            frames: this.anims.generateFrameNumbers("monsterSheap", {
                start: 0,
                end: 4,
            }),
            duration: 500,
            framerate: 0,
            repeat: -1,
        });

        this.anims.create({
            key: "monsterSheapDieanim",
            frames: this.anims.generateFrameNumbers("monsterSheapDie", {
                start: 2,
                end: 6,
            }),
            duration: 400,
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
            key: "monsterSheapSkillanim",
            frames: this.anims.generateFrameNumbers("monsterSheapSkill", {
                start: 0,
                end: 2,
            }),
            duration: 400,
            framerate: 0,
        });


        monsterGroup = this.physics.add.group();

        monster1 = this.physics.add
            .sprite(1100, 500, "monsterSheapSleep")
            .setScale(0.5)
            .setVelocityX(0);

        monsterSpawns = this.time.addEvent({
            delay: 500,
            callback: function () {
                monsterGroup.add(monster1)
                    .setVelocityX(0);
                monster1.anims.play("monsterSheapanim", true)
                monster1.flipX = false;
            },
            callbackScope: this,
            loop: false,
            pause: false
        });

        monsterSpawn = this.time.addEvent({
            delay: 3000,
            callback: function () {
                monster = this.physics.add
                    .sprite(Phaser.Math.Between(1000, 1280),
                        Phaser.Math.Between(400, 600), 'monsterSheap')
                    .setDepth(8)
                    .setScale(0.4)
                    .setSize(100, 160)
                    .setOffset(50, 10);
                monsterGroup.add(monster)
                    .setVelocityX(-600);
                monster.anims.play("monsterSheapanim", true)
                monster.flipX = false;
            },
            callbackScope: this,
            loop: true,
            pause: false
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
            this.scene.start('GameScene02');
            music.stop();
        });
        this.physics.add.collider(player, home);
        this.physics.add.collider(player, enemy1);
        //Vs monster
        this.physics.add.collider(player, monsterGroup, (player, monster) => {
            monster.destroy();
        });


        this.physics.add.overlap(FruitGroup, monsterGroup, (fruit, monster) => {
            monster.anims.play("monsterSheapDieanim", true);
            monster.setVelocityX(0);
            fruit.destroy();
            this.time.addEvent({
                delay: 500,
                callback: function () {
                    monster.destroy();
                    // monster1.destroy();
                },
                callbackScope: this,
                loop: false
            })
        });

        // this.physics.add.overlap(monsterGroup, block2, (monsterGroup, block2) => {
        //     monster.destroy();
        // })



    }

    update(delta, time) {
        mainbg.tilePositionX += 0;
        player.anims.play("playerrun", true);

        //Key WS STOP
        if (keyS.isDown) { player.setVelocityY(300); }
        else if (keyW.isDown) { player.setVelocityY(-300); }
        else { player.setVelocityY(0); }
        //Key AD STOP
        if (keyA.isDown) { player.setVelocityX(-300); }
        else if (keyD.isDown) { player.setVelocityX(1000); }
        else { player.setVelocityX(0); }

        //KeyQ
        if (Phaser.Input.Keyboard.JustDown(keyQ)) {
            fruit = this.physics.add.image(player.x + 50, player.y, 'fruit')
                .setScale(0.1)
            FruitGroup.add(fruit)
            FruitGroup.setVelocityX(600)
            fruit.rotation += 0.04;
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
export default GameScene;
