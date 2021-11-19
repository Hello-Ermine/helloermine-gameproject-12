import Phaser from "phaser";

let buttonBack;
let background;
let select;
let bg;
class credit extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'credit'
        });
    }

    preload() {
        this.load.image("wallcredit", "src/image/credit.png");
        this.load.image('back', 'src/image/bottom/back.png');
        this.load.audio('selectMenu', 'src/sound/select.mp3');
        this.load.image("bg", "src/image/bgnight02.png");
    }

    create() {

        select = this.sound.add('selectMenu').setVolume(0.5);
        bg = this.add.tileSprite(0, 0, 1280, 720, 'bg')
            .setOrigin(0);
        background = this.add.image(150, 80, 'wallcredit')
            .setScale(0.8)
            .setOrigin(0);

        //-----------------------------ButtonBack-------------------------------//
        buttonBack = this.add.image(100, 650, 'back').setScale(0.2);
        buttonBack.setInteractive();
        buttonBack.on('pointerup', () => {
            this.scene.start('MainMenu');
            window.location.reload("Refresh")
        })
        buttonBack.on('pointerover', () => {
            buttonBack.setScale(0.25);
            select.play();
        })
        buttonBack.on('pointerout', () => {
            buttonBack.setScale(0.2);
        })
    }

    update(delta, time) {
        bg.tilePositionX += 1.5;
    }
}
export default credit;