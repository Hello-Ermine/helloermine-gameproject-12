import Phaser from "phaser";
import { NONE } from "phaser/src/const";

let mainbg, player;
let keyA, keyD, keyVis;
let music,soundVis;

class GameScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'GameScene'
        });
    }

    preload() {
        this.load.image('mainbg', 'src/image/BackG.jpg');
        this.load.spritesheet('player', 'src/image/player1.png', { frameWidth: 180, frameHeight: 247 });
        this.load.audio('song','src/image/song/gamesong.mp3');
        this.load.audio('soundVis','src/image/song/visiblesoundDis.mp3');
    }

    create() {
        //BackG
        mainbg = this.add.tileSprite(0,0, 1280, 720,'mainbg')
            .setScale(1.5)
            .setOrigin(0,0);

        //Player
        player = this.physics.add.sprite(100, 600, 'player')
            .setDepth(10)
            .setScale(0.8);

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
        //KEY
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyVis = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        //wallblock
        player.setCollideWorldBounds(true);
        //music
        music = this.sound.add('song')
            .setVolume(0.6)
            .play({loop: true});
        soundVis = this.sound.add('soundVis');
    }

    update(delta, time) {
        mainbg.tilePositionX += 4;
        //Key A D STOP
        if (keyA.isDown) {player.setVelocityX(-200);}
        else if (keyD.isDown) {player.setVelocityX(300);}
        else {player.setVelocityX(0);}
        
        //Anims
        if (keyA.isDown) {
            player.anims.play('playerrun', true);
        }
        else if (keyD.isDown) {
            player.anims.play('playerrun', true);
        }
        else {player.anims.play('playerrun', false);}
        
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
