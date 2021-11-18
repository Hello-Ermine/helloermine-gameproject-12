import Phaser from "phaser";

let buttonBack;
let background;
let select;

class credit extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'credit'
        });
    }

    preload() {
        this.load.image("wallcredit", "src/image/CREDIT.png");
        this.load.image('back', 'src/image/bottom/back.png');
        this.load.audio('selectMenu', 'src/sound/select.mp3');
    }

    create() {

        select = this.sound.add('selectMenu').setVolume(0.5);

        background = this.add.image(0, 0, 'wallcredit')
            .setOrigin(0);

        //-----------------------------ButtonBack-------------------------------//
        buttonBack = this.add.image(200, 200, 'back').setScale(0.5);
        buttonBack.setInteractive();
        buttonBack.on('pointerup', () => {
            this.scene.start('MainMenu');
            window.location.reload("Refresh")
        })
        buttonBack.on('pointerover', () => {
            buttonBack.setScale(0.8);
            select.play();
        })
        buttonBack.on('pointerout', () => {
            buttonBack.setScale(0.5);
        })
    }

    update(delta, time) {

    }
}
export default credit;