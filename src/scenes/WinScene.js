import Phaser from "phaser";

let win;

class WinScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'WinScene'
        });
    }

    preload() {
        this.load.image("youwin", "src/image/bottom/win.png"); 
    }

    create() {
        win = this.add.image(640,360, 'youwin')
            .setScale(0.18);
    }

    update(delta, time) {
    
    }
}
export default WinScene;