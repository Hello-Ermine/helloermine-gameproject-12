import Phaser from "phaser";

let buttonPlay,tutorial,credit;
let bg,logo;
let menutheme,select;

class MainMenu extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'MainMenu'
        });
    }

    preload() {
        this.load.image("menubg", "src/image/bgnight02.png");
        this.load.image('play', 'src/image/bottom/play.png');
        this.load.image('tutorial', 'src/image/bottom/tutorial.png');
        this.load.image('credit', 'src/image/bottom/credit.png');

        this.load.image('logo', 'src/image/bottom/logo.png');

        //Sound
        this.load.audio('menutheme', 'src/image/song/mainsong.mp3');
        this.load.audio('selectMenu', 'src/sound/select.mp3');
    }

    create() {
        menutheme = this.sound.add('menutheme').setVolume(0.5);
        menutheme.play({loop: true});

        select = this.sound.add('selectMenu').setVolume(0.5);

        //mainBG
        bg = this.add.tileSprite(0, 0, 1280, 720, 'menubg')
            .setOrigin(0);
        logo = this.add.image(640,280, 'logo')
            .setScale(0.25);

        //ButtonPlay
        buttonPlay = this.add.image(1040, 550, 'play').setScale(0.4);
        buttonPlay.setInteractive();
        buttonPlay.on('pointerup', () => {
            this.scene.start('GameScene');
            menutheme.stop();
        })
        buttonPlay.on('pointerover', () => {
            buttonPlay.setScale(0.5);
            select.play();
        })
        buttonPlay.on('pointerout', () => {
            buttonPlay.setScale(0.4);
        })

        //ButtonTutorial
        tutorial = this.add.image(640, 550, 'tutorial').setScale(0.4);
        tutorial.setInteractive();
        tutorial.on('pointerup', () => {
            this.scene.start('tutorial');
        })
        tutorial.on('pointerover', () => {
            tutorial.setScale(0.5);
            select.play();
        })
        tutorial.on('pointerout', () => {
            tutorial.setScale(0.4);
        })

        //ButtonCredit
        credit = this.add.image(240, 550, 'credit').setScale(0.4);
        credit.setInteractive();
        credit.on('pointerup', () => {
            this.scene.start('credit');
            menutheme.stop();
        })
        credit.on('pointerover', () => {
            credit.setScale(0.5);
            select.play();
        })
        credit.on('pointerout', () => {
            credit.setScale(0.4);
        })


    }

    update(delta, time) {
        bg.tilePositionX += 1.5;
    }
}
export default MainMenu;