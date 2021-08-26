import Phaser from "phaser";
let player;
let keyw;
let keya;
let keys;
let keyd;

class GameScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'GameScene'
        });
    }

    preload() {
      this.load.image('player','src\image\profile.png')
    }

    create() {
    player = this.physics.add.image(300,300,'player');
    keyw= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.w);
    keya= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.a);
    keys= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.s);
    keyd= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.d);
    }
    
    update(delta, time) {
       
    }
}

export default GameScene;
