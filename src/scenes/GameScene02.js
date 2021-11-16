import Phaser from "phaser";

let bgRun01, block, block2, block3, block4, player, enemy1, FruitGroup,
    FruitEvent, fruit, monster, monsterGroup, monsterSpawn;
let keyA, keyD, keyW, keyS, keyQ;
let music;
let home;

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
        this.load.spritesheet("player", "src/image/ninja.png", { frameWidth: 227.7, frameHeight: 280 });
        this.load.audio("song", "src/image/song/gamesong.mp3");
        this.load.spritesheet("monsterOrange", "src/image/ส้มเดิน.png", { frameWidth: 179, frameHeight: 193 });
        this.load.spritesheet("monsterOrangeDie", "src/image/ส้มตุย2.png", { frameWidth: 205, frameHeight: 201 });
        this.load.spritesheet("monsterOrangeDie", "src/image/ส้มตุย2.png", { frameWidth: 205, frameHeight: 201 });
        this.load.spritesheet("monsterOrangeAtk", "src/image/ส้มตี.png", { frameWidth: 179, frameHeight: 193 });
    }

    create() {
        //music
        music = this.sound.add("song").setVolume(0.1);
        music.play({ loop: true });
        //BackGround
        bgRun01 = this.add
            .tileSprite(0, 0, 1280, 720, "bgRun01")
            .setDepth(0)
            .setOrigin(0);
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
        block3 = this.physics.add
            .image(-110, 20, "block")
            .setDepth(100)
            .setVisible(0)
            .setImmovable()
            .setSize(50, 720)
            .setOffset(1250, 300);
        block4 = this.physics.add
            .image(-450, 20, "block")
            .setDepth(100)
            .setVisible(0)
            .setImmovable()
            .setSize(50, 720)
            .setOffset(1250, 300);

        //Player
        player = this.physics.add
            .sprite(100, 450, "player")
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
                end: 6,
            }),
            duration: 400,
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
            delay: 1000,
            callback: function () {
                monster = this.physics.add
                    .sprite(Phaser.Math.Between(1000, 1280),
                        Phaser.Math.Between(400, 600), 'monsterOrange')
                    .setDepth(8)
                    .setScale(0.7)
                    .setSize(100, 160)
                    .setOffset(50, 10);
                monsterGroup.add(monster)
                    .setVelocityX(-600);
                monster.anims.play("monsterOrangeanim", true);
                monster.flipX = true;
            },
            callbackScope: this,
            loop: false,
            repeat: 10,
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
            music.stop();
            this.scene.start('GameScene03')
        });
        this.physics.add.collider(player, home);
        this.physics.add.collider(player, enemy1);
        //Vs monster
        this.physics.add.collider(player, monsterGroup, (player, monster) => {
            monster.destroy();
        });

        this.physics.add.overlap(monsterGroup, block3, (monsterGroup, block3) => {
            monster.anims.play("monsterOrangeAtkanim", true);
            monster.setVelocityX(-900);
        })

        this.physics.add.overlap(monsterGroup, block4, (monsterGroup, block4) => {
            monster.anims.play("monsterOrangeanim", true);
            // monster.setVelocityX(-600);
        })

        this.physics.add.overlap(FruitGroup, monsterGroup, (fruit, monster) => {
            monster.anims.play("monsterOrangeDieanim", true);
            monster.setVelocityX(1000);
            fruit.destroy();
            this.time.addEvent({
                delay: 200,
                callback: function () {
                    monster.destroy();
                },
                callbackScope: this,
                loop: false
            })
        });

        this.physics.add.overlap(monsterGroup, block2, (monsterGroup, block2) => {
            monster.destroy();
        });




    }

    update(delta, time) {
        bgRun01.tilePositionX += 2;
        player.anims.play("playerrun", true);

        //Key WS STOP
        if (keyS.isDown) { player.setVelocityY(500); }
        else if (keyW.isDown) { player.setVelocityY(-500); }
        else { player.setVelocityY(0); }
        //Key AD STOP
        if (keyA.isDown) { player.setVelocityX(-300); }
        else if (keyD.isDown) { player.setVelocityX(300); }
        else { player.setVelocityX(0); }

        //KeyQ
        if (Phaser.Input.Keyboard.JustDown(keyQ)) {
            fruit = this.physics.add.image(player.x, player.y, 'fruit')
                .setScale(0.1)
            // fruit.rotation += 1;
            FruitGroup.add(fruit)
            FruitGroup.setVelocityX(800)
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
