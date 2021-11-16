import Phaser from "phaser";

let death;

class DeathScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'DeathScene'
        });
    }

    preload() {
        this.load.image("youdeath", "src/image/bottom/lose.png"); 
    }

    create() {
        death = this.add.image(640,360, 'youdeath')
            .setScale(0.18);
    }

    update(delta, time) {
    
    }
}
export default DeathScene;