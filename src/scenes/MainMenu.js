import Phaser from "phaser";

let buttonPlay;
let bg,logo;
let menutheme;

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

        //Sound
        this.load.audio('menutheme', 'src/image/song/mainsong.mp3');
    }

    create() {
        menutheme = this.sound.add('menutheme').setVolume(0.8);
        menutheme.play({loop: true});

        //mainBG
        bg = this.add.tileSprite(0, 0, 1280, 720, 'menubg')
            .setOrigin(0);
        logo = this.add.image(640,200, 'logo')
            .setScale(0.1);

        //Button
        buttonPlay = this.add.image(640, 340, 'play').setScale(0.35);
        buttonPlay.setInteractive();
        buttonPlay.on('pointerup', () => {
            this.scene.start('GameScene');
            menutheme.stop();
        })


    }

    update(delta, time) {
        bg.tilePositionX += 0.8;
    }
}
export default MainMenu;