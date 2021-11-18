import 'phaser';
import Phaser from 'phaser';
import GameScene from './scenes/GameScene';
import GameScene02 from './scenes/GameScene02';
import GameScene03 from './scenes/GameScene03';
import GameScene04 from './scenes/GameScene04';
import DeathScene from './scenes/DeathScene';
import WinScene from './scenes/WinScene';
import MainMenu from './scenes/MainMenu';


const config = {
    // For more settings see <https://github.com/photonstorm/phaser/blob/master/src/boot/Config.js>
    type: Phaser.WEBGL,
    pixelArt: true,
    roundPixels: true,
    parent: 'content',
    width: 1280,
    height: 720,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: [
        MainMenu,
        GameScene,
        GameScene02,
        GameScene03,
        GameScene04,
        DeathScene,
        WinScene,
        
    ],


};

const game = new Phaser.Game(config);