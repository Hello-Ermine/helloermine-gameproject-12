import Phaser from "phaser";

let tutorials,buttonPlay,background;
let buttonBack;
let menutheme,select;

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
        this.load.audio('menutheme', 'src/image/song/mainsong.mp3');
        this.load.audio('selectMenu', 'src/sound/select.mp3');
    }

    create() {
        menutheme = this.sound.add('menutheme').setVolume(0.8);
        menutheme.play({loop: true});

        select = this.sound.add('selectMenu').setVolume(0.5);

        background = this.add.tileSprite(0, 0, 1280, 720, 'bg')
        .setOrigin(0);

        tutorials = this.add.image(640, 360, 'tutorialBg').setScale(1);

        //-----------------------------ButtonBack-------------------------------//
        buttonBack = this.add.image(150, 650, 'back').setScale(0.2);
        buttonBack.setInteractive();
        buttonBack.on('pointerup', () => {
            this.scene.start('MainMenu');
            menutheme.stop();
        })
        buttonBack.on('pointerover', () => {
            buttonBack.setScale(0.3);
            select.play();
        })
        buttonBack.on('pointerout', () => {
            buttonBack.setScale(0.2);
        })

    //     //ButtonPlay
    //     buttonPlay = this.add.image(1130, 650, 'play').setScale(0.2);
    //     buttonPlay.setInteractive();
    //     buttonPlay.on('pointerup', () => {
    //         this.scene.start('GameScene');
    //         menutheme.stop();
    //     })
    //     buttonPlay.on('pointerover', () => {
    //         buttonPlay.setScale(0.3);
    //         select.play();
    //     })
    //     buttonPlay.on('pointerout', () => {
    //         buttonPlay.setScale(0.2);
    //     })
    }
    
    
    update() {
        background.tilePositionX += 1.5;
    }
}

export default tutorial;