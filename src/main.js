import 'phaser';
import Phaser from 'phaser';
import GameScene from './scenes/GameScene';
import MainMenu from './scenes/MainMenu';


const config = {
    // For more settings see <https://github.com/photonstorm/phaser/blob/master/src/boot/Config.js>
    type: Phaser.WEBGL,
    pixelArt: true,
    roundPixels: true,
    parent: 'content',
    width: 1080,
    height: 720,
    physics: {
        default: 'arcade',
        arcade: {
            debug:true
        }
    },
    scene: [
        GameScene,
        MainMenu
    ],
    
    
};

const game = new Phaser.Game(config);