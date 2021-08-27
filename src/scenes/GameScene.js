import Phaser from "phaser";
let player;
let backGround;
let monster;
let eventmonster;
let objmonster;
let objem;
let keyFire ;
let emSpeed =900 ;
let nakom;
let Bababoi;

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
       this.load.spritesheet('player','/src/image/Bababoi1.png',
       {frameWidth: 224 , frameHeight: 225});
       this.load.spritesheet('monster','src/image/monster.png',
       {frameWidth: 17.3 , frameHeight: 18});
       this.load.image('em','src/image/submarine .png');
       this.load.audio('nakom','src/sound/nakom.mp3')
       this.load.audio('Ba','src/sound/bababoi-sound-effect.mp3')
    
    }

    create() {
         // Background
         backGround = this.add.tileSprite(0,0,850,1400, 'TileSprite').setOrigin(0,0).setScale(8);

         //player
         player = this.physics.add.sprite(190,600,'player')
    .setScale(0.7)
    .setImmovable()
   .setCollideWorldBounds(true)
   .setSize(120,225)
   .setOffset(40,0)
   ;
   
        //sound
        nakom =this.sound.add('nakom');
        Bababoi = this.sound.add('Ba');
//    monster= this.physics.add.sprite(150,100,'monster') 
//    .setScale(1)
//    .setImmovable()
//   .setCollideWorldBounds(true);
  //oject 
       // monster = this.physics.add.Group(monster);
     
    
   // player animetion
   this.anims.create({
    key: 'playerAni',
    frames: this.anims.generateFrameNumbers('player', {
        start: 0,
        end: 1
    }),
    duration: 400,    
    repeat: -1
});

//monster animetion
this.anims.create({
    key: 'monsterAni',
    frames: this.anims.generateFrameNumbers('monster', {
        start: 0,
        end: 7
    }),
    duration: 1500,    
    repeat: -1
});

 //group
objmonster = this.physics.add.group();
objem = this.physics.add.group();



//event
eventmonster = this.time.addEvent({
    delay: 300,
    callback: function () {
        monster = this.physics.add.sprite(Phaser.Math.Between(0, 450) , -50, 'monster')
        .setScale(3)
        .setImmovable()
   
        monster.anims.play('monsterAni', true);
        objmonster.add(monster);
        monster.setVelocityY(Phaser.Math.Between(500, 700));
        
        this.physics.add.overlap(monster, player, function monsterDestroy(monster, player) {
            nakom.play();
            monster.destroy();
            console.log(true);
        
        } );
    },
    callbackScope: this,
    loop: true,
    paused: false,
});




    //Emoji hit
this.physics.add.overlap(objmonster,objem,function onHit(monster, em){
    Bababoi.play();
    em.destroy()
    monster.destroy();
    console.log(false);
});
    
//controll
keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
keyFire = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
}
    
    
    update(delta, time) {
       // Background
       backGround.tilePositionY -= 0.1;
       
       
       //animetion monster
      
       player.anims.play('playerAni',true);

       
      
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
         //Monster Destroy
         for (let i = 0; i < objmonster.getChildren().length; i++) {
            if (objmonster.getChildren()[i].y > 700) {
                objmonster.getChildren()[i].destroy();
            }
        }
             //fire and update
        if (Phaser.Input.Keyboard.JustDown(keyFire)) {
            let em = this.physics.add.sprite(player.x, player.y, "em");
            em.setScale(0.2);
            em.setSize(200,512);
            em.setOffset(200,0);
            objem.add(em);
            em.body.velocity.y = -emSpeed;
            
            
        }
        for (let i = 0; i < objem.getChildren().length; i++) {
            let em = objem.getChildren()[i];
            if (em.y < -40) {
                em.destroy();
            }
        }
        
    }

}
export default GameScene;
