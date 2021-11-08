import Phaser from "phaser";
import { NONE } from "phaser/src/const";

let mainbg, player;
let keyA, keyD, keyVis;
let music,soundVis;
let enemy1;

class GameScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'GameScene'
        });
    }

    preload() {
        this.load.image('mainbg', 'src/image/BackG.jpg');
        this.load.spritesheet('player', 'src/image/player1.png', { frameWidth: 180, frameHeight: 247 });
        this.load.spritesheet('enemy1', 'src/image/enemy1.png', { frameWidth: 170, frameHeight: 173 });
        this.load.audio('song','src/image/song/gamesong.mp3');
        this.load.audio('soundVis','src/image/song/visiblesound.mp3');
    }

    create() {
        //BackG
        mainbg = this.add.tileSprite(0,0, 1280, 720,'mainbg')
            .setScale(1.5)
            .setOrigin(0,0);

        //Player
        player = this.physics.add.sprite(400, 600, 'player')
            .setDepth(10)
            .setScale(0.8)
            .setSize(80, -180)
            .setOffset(60, 220);
        //Aims set
        this.anims.create({
            key: 'playerrun',
            frames: this.anims.generateFrameNumbers('player', {
                start: 0,
                end: 4
            }),
            duration: 500,
            framerate: 0,
            repeat: -1
        })

        //Enemy01
        enemy1 = this.physics.add.sprite(1200, 600, 'enemy1')
            .setDepth(10)
            .setScale(0.75);
        
        //Aims set
        this.anims.create({
            key: 'enemy1anim',
            frames: this.anims.generateFrameNumbers('enemy1', {
                start: 0,
                end: 4
            }),
            duration: 300,
            framerate: 0,
            repeat: -1
        })
            
        //KEY
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyVis = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //wallblock
        player.setCollideWorldBounds(true);
        this.physics.add.overlap(player, enemy1, ()=>console.log('test'));

        //music
        music = this.sound.add('song')
            .setVolume(0.25)
            .play({loop: true});
        soundVis = this.sound.add('soundVis')
            .setVolume(0.6);
    }

    update(delta, time) {
        mainbg.tilePositionX += 1;

        //Enemy1 Anims
        enemy1.anims.play('enemy1anim', true);
        enemy1.setVelocityX(-80);

        //Key A D STOP
        if (keyA.isDown) {
            player.setVelocityX(-1000);
            mainbg.tilePositionX -= 4;
        }
        else if (keyD.isDown) {
            player.setVelocityX(1000);
            mainbg.tilePositionX += 4;
        }
        else {player.setVelocityX(0);}
        
        //Anims
        if (keyA.isDown) {
            player.anims.play('playerrun', true);
            player.flipX=true;
        }
        else if (keyD.isDown) {
            player.anims.play('playerrun', true);
            player.flipX=false;
        }
        
        //Visible
        if (keyVis.isDown) {
            player.setVisible()
        } else if (keyVis.isUp) {
            player.setVisible(1)
            soundVis.play();
        } 
    }
}
export default GameScene;
