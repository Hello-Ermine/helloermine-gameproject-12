import Phaser from "phaser";

let bgRun01, block, block2, player, enemy1, FruitGroup,
    FruitEvent, fruit, monster, monsterGroup, monsterSpawn;
let keyA, keyD, keyW, keyS, keyQ;
let music;
let home;

class GameScene03 extends Phaser.Scene {
    constructor(test) {
        super({
            key: "GameScene03",
        });
    }

    preload() {
        this.load.image("mainbg", "src/image/bgnight01.png");
        this.load.image("bgRun01", "src/image/bgnight02.png");
        this.load.image("home", "src/image/home.png");

        this.load.image("block", "src/image/block2.png");

        this.load.image("fruit", "src/image/ninja-fruit.png");
        this.load.spritesheet("player", "src/image/ninja.png", {frameWidth: 227.7,frameHeight: 280});
        this.load.audio("song", "src/image/song/gamesong.mp3");
        this.load.spritesheet("monsterOrange", "src/image/ส้มเดิน.png", {frameWidth: 178.75,frameHeight: 185});
    }

    create() {
        //music
        music = this.sound.add("song").setVolume(0.1);
        music.play({ loop: true });
<<<<<<< Updated upstream
        //BackGround
        bgRun01 = this.add
            .tileSprite(0, 0, 1280, 720, "bgRun01")
            .setDepth(0)
            .setOrigin(0);
        block = this.physics.add
            .image(355, -20, "block")
=======

        //--------------------------------------BackGround--------------------------------------//
        bgRun01 = this.add.tileSprite(0, 0, 1280, 720, "bgRun01")
            .setDepth(0)
            .setOrigin(0);

        //--------------------------------------block--------------------------------------//
        block = this.physics.add.image(355, -20, "block")
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream

        //Player
        player = this.physics.add
            .sprite(100, 450, "player")
=======
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
>>>>>>> Stashed changes
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
            duration: 200,
            framerate: 0,
            repeat: -1,
        });

        //Enemy set
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

        monsterGroup = this.physics.add.group();

        monsterSpawn = this.time.addEvent({
            delay: 3000,
            callback: function () {
<<<<<<< Updated upstream
                monster = this.physics.add
                    .sprite(Phaser.Math.Between(900, 1100),
=======
                monster = this.physics.add.sprite(Phaser.Math.Between(1000, 1280),
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
            loop: true,
=======
            loop: false,
            repeat: 10,
            pause: false
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
            duration: 400,
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
                monster2 = this.physics.add.sprite(Phaser.Math.Between(1000, 1280),
                        Phaser.Math.Between(450, 650), 'monsterPink')
                    .setDepth(8)
                    .setScale(0.7)
                    .setSize(100, 160)
                    .setOffset(50, 10);
                monster2Group.add(monster2)
                    .setVelocityX(-600);
                monster2.anims.play("monsterPinkanim", true);
                monster2.flipX = true;
            },
            callbackScope: this,
            loop: false,
            repeat: 10,
>>>>>>> Stashed changes
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
            this.scene.start('GameScene02')
        });
        this.physics.add.collider(player, home);
        this.physics.add.collider(player, enemy1);
        //Vs monster
        this.physics.add.collider(player, monsterGroup, (player, monster) => {
            monster.destroy();
        });
        this.physics.add.collider(FruitGroup, monsterGroup, (fruit, monster) => {
            fruit.destroy();
            monster.destroy();
        });





    }

    update(delta, time) {
        bgRun01.tilePositionX += 7;
        player.anims.play("playerrunLv2", true);

        //Key WS STOP
        if (keyS.isDown) {player.setVelocityY(300);} 
        else if (keyW.isDown) {player.setVelocityY(-300);}
        else {player.setVelocityY(0);}
        //Key AD STOP
<<<<<<< Updated upstream
        if (keyA.isDown) {player.setVelocityX(-300);}
        else if (keyD.isDown) {player.setVelocityX(300);}
        else {player.setVelocityX(0);}
        
=======
        if (keyA.isDown) { player.setVelocityX(-300); }
        else if (keyD.isDown) { player.setVelocityX(1000); }
        else { player.setVelocityX(0); }

>>>>>>> Stashed changes
        //KeyQ
        if (Phaser.Input.Keyboard.JustDown(keyQ)) {
            fruit = this.physics.add.image(player.x, player.y, 'fruit')
                .setScale(0.1)
            // fruit.rotation += 1;
            FruitGroup.add(fruit)
            FruitGroup.setVelocityX(800)
        }
    }
}
export default GameScene03;
