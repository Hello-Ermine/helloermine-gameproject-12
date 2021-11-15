import Phaser from "phaser";

let buttonPlay;
let bg;
let mainmusic;

class MainMenu extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'MainMenu'
        });
    }

    preload() {
        this.load.image('bg', 'src/image/MainBG.jpg');
        this.load.image('play', 'src/image/start.png');
        this.load.audio('mainmusic', 'src/image/song/mainsong.mp3');
    }

    create() {
        //mainmusic = this.sound.add('mainmusic').play();
        //mainBG
        bg = this.add.tileSprite(0, 0, 1360, 340, 'bg')
            .setScale(2)
            .setOrigin(0, 0);

        //Button
        buttonPlay = this.add.image(680, 340, 'play').setScale(1.5);
        buttonPlay.setInteractive();
        buttonPlay.on('pointerup', () => {
            this.scene.start('GameScene')
        })


    }

    update(delta, time) {
        bg.tilePositionX += 1;
    }
}
export default MainMenu;