import Phaser from "phaser";
let player;
let backGround;
let monster;
let event;
let objmonster;
let monsterDestroy;

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
       this.load.spritesheet('player','/src/image/Bababoi.png',
       {frameWidth: 750 , frameHeight: 828});
       this.load.spritesheet('monster','src/image/monster.png',
       {frameWidth: 17.3 , frameHeight: 18});
      
    
    }

    create() {
         // Background
         backGround = this.add.tileSprite(0,0,850,1400, 'TileSprite').setOrigin(0,0).setScale(8);

         
         player = this.physics.add.sprite(220,700,'player')
    .setScale(0.2)
    .setImmovable()
   .setCollideWorldBounds(true);
   
//    monster= this.physics.add.sprite(150,100,'monster') 
//    .setScale(1)
//    .setImmovable()
//   .setCollideWorldBounds(true);
  //oject 
       // monster = this.physics.add.Group(monster);
     
    
   // player
   this.anims.create({
    key: 'playerAni',
    frames: this.anims.generateFrameNumbers('player', {
        start: 0,
        end: 1
    }),
    duration: 400,    
    repeat: -1
});

//monster
this.anims.create({
    key: 'monsterAni',
    frames: this.anims.generateFrameNumbers('monster', {
        start: 0,
        end: 7
    }),
    duration: 1500,    
    repeat: -1
});
 
objmonster = this.physics.add.group();
    
event = this.time.addEvent({
    delay: 1000,
    callback: function () {
        monster = this.physics.add.sprite(Phaser.Math.Between(0, 450) , -50, 'monster')
        .setScale(3)
        .setImmovable()
   
        monster.anims.play('monsterAni', true);
        objmonster.add(monster);
        monster.setVelocityY(Phaser.Math.Between(500, 700));
        this.physics.add.overlap(monster, player, monsterDestroy);
    },
    callbackScope: this,
    loop: true,
    paused: false,
});

function monsterDestroy(monster, player) {
    monster.destroy();

} 

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
       //animetion monster
       //monster.anims.play('monsterAni',true)

       
      
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
         // Monster Destroy
         for (let i = 0; i < objmonster.getChildren().length; i++) {
            if (objmonster.getChildren()[i].y > 700) {
                objmonster.getChildren()[i].destroy();
            }
        }
    }
}

export default GameScene;
