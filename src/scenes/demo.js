import Phaser from "phaser";


class demo extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'demo'
        });
    }

    preload() {
        this.load.spritesheet('pc', 'src/images/pikachu2.png',
            { frameWidth: 40.25, frameHeight: 38 });
        this.load.spritesheet('pri', 'src/images/pripri.png',
            { frameWidth: 66.5, frameHeight: 164 });
        this.load.image('td', 'src/images/thumder.png');


    }

    create() {
        

    }

    update(delta, time) {
      


    }
}

export default demo;
