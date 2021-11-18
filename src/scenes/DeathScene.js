import Phaser from "phaser";

let death;
let buttonBack;
let select, loseSound;

class DeathScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'DeathScene'
        });
    }

    preload() {
        this.load.image("youdeath", "src/image/bottom/lose.png");
        this.load.image('back', 'src/image/bottom/back.png');
        this.load.audio('selectMenu', 'src/sound/select.mp3');
        this.load.audio('loseSd', 'src/sound/lose.mp3');
    }

    create() {
        death = this.add.image(640, 360, 'youdeath')
            .setScale(0.20);

        select = this.sound.add('selectMenu').setVolume(0.4);
        loseSound = this.sound.add('loseSd').setVolume(0.4)
            .play();

        //-----------------------------ButtonBack-------------------------------//
        buttonBack = this.add.image(150, 650, 'back').setScale(0.2);
        buttonBack.setInteractive();
        buttonBack.on('pointerup', () => {
            this.scene.start('MainMenu');
            window.location.reload("Refresh")
        })
        buttonBack.on('pointerover', () => {
            buttonBack.setScale(0.3);
            select.play();
        })
        buttonBack.on('pointerout', () => {
            buttonBack.setScale(0.2);
        })

    }

    update(delta, time) {

    }
}
export default DeathScene;