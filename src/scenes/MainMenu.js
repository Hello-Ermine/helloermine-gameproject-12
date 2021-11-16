import Phaser from "phaser";

let buttonPlay;
let bg,logo;
let mainmusic;

class MainMenu extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'MainMenu'
        });
    }

    preload() {
        this.load.image("menubg", "src/image/bgnight02.png");
        this.load.image('play', 'src/image/bottom/play.png');
        this.load.image('logo', 'src/image/bottom/logo.png');
        this.load.audio('mainmusic', 'src/image/song/mainsong.mp3');
    }

    create() {
        //mainmusic = this.sound.add('mainmusic').play();

        //mainBG
        bg = this.add.tileSprite(0, 0, 1280, 720, 'menubg')
            .setOrigin(0);
        logo = this.add.image(640,200, 'logo')
            .setScale(0.1);

        //Button
        buttonPlay = this.add.image(640, 340, 'play')
        .setScale(0.35);
        buttonPlay.setInteractive();
        buttonPlay.on('pointerup', () => {
            this.scene.start('GameScene')
        })


    }

    update(delta, time) {
        bg.tilePositionX += 0.7;
    }
}
export default MainMenu;