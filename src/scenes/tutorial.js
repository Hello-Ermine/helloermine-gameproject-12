import Phaser from "phaser";

let tutorials,background;
let buttonBack;
let select;

class tutorial extends Phaser.Scene {  
    constructor(test) {
        super({
            key: 'tutorial'  
        });
    }

    preload() {
        this.load.image("tutorialBg", "src/image/tutorial_bg.png");
        this.load.image("bg", "src/image/bgnight02.png");

        // this.load.image('play', 'src/image/bottom/play.png');
        this.load.image('back', 'src/image/bottom/back.png');

        //Sound
        this.load.audio('selectMenu', 'src/sound/select.mp3');
    }

    create() {

        select = this.sound.add('selectMenu').setVolume(0.5);

        background = this.add.tileSprite(0, 0, 1280, 720, 'bg')
            .setOrigin(0);

        tutorials = this.add.image(640, 360, 'tutorialBg').setScale(1);

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
    
    update() {
        background.tilePositionX += 1.5;
    }
}

export default tutorial;