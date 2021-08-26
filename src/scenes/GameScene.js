import Phaser from "phaser";
let player;
let backGround;
//Controller
let keyW;
let keyA;
let keyS;
let keyD;

class GameScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'GameScene'
        });
    }

    preload() {
         // BackGround
       this.load.image('TileSprite', 'src/image/background_Jerom.png');
       // Character
       this.load.spritesheet('player','/src/image/Pacman.png',
       {frameWidth: 750 , frameHeight: 828});
      
    
    }

    create() {
         // Background
         backGround = this.add.tileSprite(0,0,850,1400, 'TileSprite').setOrigin(0,0).setScale(8);

         
         player = this.physics.add.sprite(150,300,'player')
    .setScale(0.4)
    .setImmovable()
   .setCollideWorldBounds(true); 


   // Monster
   this.anims.create({
    key: 'playerAni',
    frames: this.anims.generateFrameNumbers('player', {
        start: 0,
        end: 1
    }),
    duration: 400,    
    repeat: -1
});

keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    }
    
    update(delta, time) {
       // Background
       backGround.tilePositionY -= 0.1;
       //animetion player
       player.anims.play('playerAni',true)

        // Player Control
        if(keyW.isDown){
            player.setVelocityY(-500);
        }else if(keyS.isDown){
            player.setVelocityY(500);
        }else{
            player.setVelocityY(0);
        }
        if(keyA.isDown){
            player.setVelocityX(-500);
        }else if(keyD.isDown){
            player.setVelocityX(500);
        }else{
            player.setVelocityX(0);
        }
    }
}

export default GameScene;
