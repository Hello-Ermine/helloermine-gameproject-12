import Phaser from "phaser";

let mainbg, block, player, enemy1;
let keyA, keyD, keyW, keyS, keyVis;
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
        this.load.spritesheet("player", "src/image/player1.png", {
            frameWidth: 180,
            frameHeight: 247,
        });
        this.load.spritesheet("smoke", "src/image/smoke.png", {
            frameWidth: 125.25,
            frameHeight: 100,
        });
        this.load.audio("song", "src/image/song/gamesong.mp3");
        this.load.audio("soundVis", "src/image/song/visiblesoundDis.mp3");
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
            .image(640, 100, "block")
            .setDepth(10)
            .setVisible(0)
            .setImmovable()
            .setSize(1280, 50);
        block = this.physics.add
            .image(640, 500, "block")
            .setDepth(10)
            .setVisible(0)
            .setSize(1280, 50);

        //Player
        player = this.physics.add
            .sprite(400, 600, "player")
            .setDepth(10)
            .setScale(0.8)
            .setSize(80, -180)
            .setOffset(60, 220);

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
        enemy1 = this.physics.add
            .sprite(1200, 600, "enemy1")
            .setScale(0.75)
            .setImmovable();

        //Enemy set
        this.anims.create({
            key: "enemy1anim",
            frames: this.anims.generateFrameNumbers("enemy1", {
                start: 0,
                end: 4,
            }),
            duration: 500,
            framerate: 0,
            repeat: -1,
        });

        //KEY
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyVis = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.SPACE
        );

        //wallblock
        player.setCollideWorldBounds(true);
        this.physics.add.collider(player, block);
        this.physics.add.collider(player, enemy1);
        //music
        music = this.sound.add("song").setVolume(0).play({ loop: true });
        soundVis = this.sound.add("soundVis").setVolume(0.5);
    }

    update(delta, time) {
        mainbg.tilePositionX += 0;

        //Enemy1 Anims
        enemy1.anims.play("enemy1anim", true);
        enemy1.setVelocityX(0);

        //Key ADWS STOP
        if (keyS.isDown) {
            player.setVelocityY(200);
        } else if (keyW.isDown) {
            player.setVelocityY(-200);
        } else {
            player.setVelocityY(0);
        }
        if (keyA.isDown) {
            player.setVelocityX(-100);
            mainbg.tilePositionX -= 2;
            player.anims.play("playerrun", true);
            player.flipX = true;
        } else if (keyD.isDown) {
            player.setVelocityX(200);
            mainbg.tilePositionX += 2;
            player.anims.play("playerrun", true);
            player.flipX = false;
        } else {
            player.setVelocityX(0);
            player.anims.play("playerrun", false);
        }
        if (keyVis.isDown) {
            player.anims.play("smokeVis", true);
        }else if (keyVis.isUp) {
            soundVis.play();
        }
    }
}
export default GameScene;
