import Phaser from "phaser";

let buttonBack;
let win, winSound, select;

class WinScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'WinScene'
        });
    }

    preload() {
        this.load.image("youwin", "src/image/bottom/win.png");
        this.load.audio("winner", "src/sound/win.mp3");
        this.load.image('back', 'src/image/bottom/back.png');
        this.load.audio('selectMenu', 'src/sound/select.mp3');
    }

    create() {
        win = this.add.image(640, 360, 'youwin')
            .setScale(0.20);

        winSound = this.sound.add("winner")
            .setVolume(1)
            .play();

        select = this.sound.add('selectMenu')
        .setVolume(0.4);

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
export default WinScene;