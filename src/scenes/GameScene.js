import Phaser from "phaser";
let player

class GameScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'GameScene'
        });
    }

    preload() {
      this.load.image('player','D:\drawing\profile.png')
    }

    create() {
    player = this.physics.add.image(200,300,'player');
    }
    
    update(delta, time) {
       
    }
}

export default GameScene;
