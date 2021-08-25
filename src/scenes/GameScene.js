import Phaser from "phaser";
let mario;
let marioEvent;
let bg;
let background;
let monster;
let monsterEvent;
let monsterGroup
let keyW;
let keyA;
let keyS;
let keyD;
let bombbullet;
let bombgroup;
let keySpacebar;



class GameScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'GameScene'
        });
    }

    preload() {
        this.load.image('bg','src/img/TileSprite (2).png');
        this.load.spritesheet('mario','src/img/TerDjjW.png' ,
      { frameWidth:60, frameHeight:95 });
      this.load.spritesheet('monster','src/img/Frog.png' ,
      { frameWidth:41, frameHeight:47 });
      this.load.image('bombbullet','src/img/bombbullet.png');

    }

    create() {
        //show X Y
        this.label = this.add.text(0, 0, '(x, y)', { fontFamily: '"Monospace"' })
            .setDepth(100);
        this.pointer = this.input.activePointer;
        //BG
        background = this.add.tileSprite(0,0,850,1400,'bg')
        .setOrigin(0,0)
        .setScale(5.1);
        //mario
        mario = this.physics.add.sprite(225,600,'mario').setScale(1).setCollideWorldBounds(true);
        //bullet
        // bombbullet = this.physics.add.sprite(205,351,'bombbullet').setScale(1);
        bombgroup = this.physics.add.group();

 
        monsterGroup = this.physics.add.group();
        monsterEvent = this.time.addEvent({
            delay: Phaser.Math.Between(1000,2000),
            callback: function(){
                monster = this.physics.add.sprite(Phaser.Math.Between(1,450),0,'monster').setScale(3.5);
                monsterGroup.add(monster);
                monster.anims.play('monster',true);
                monster.setVelocityY(80);
                this.physics.add.overlap(mario,monster,monsterDestroy);
                // this.physics.add.overlap(bombbullet,monster,monsterDestroy);
            },
            callbackScope: this,
            loop: true,
            paused: false,
        });
       
        this.anims.create({
            key: 'gomario',
            frames: this.anims.generateFrameNumbers('mario',{
                start:0,
                end:6
            }),
            duration:900,
            repeat: -1
        })

        this.anims.create({
            key: 'monster',
            frames: this.anims.generateFrameNumbers('monster',{
                start:0,
                end:7
            }),
            duration:700,
            repeat: -1
        })
        //destroy
        this.physics.add.overlap(monsterGroup,bombgroup,function onHit(monster, bombbullet){
            bombbullet.destroy();
            monster.destroy();
            // monster.y = monster.startY;
            // monster.speed = (Math.random() * 2) + 1;
        });
        // function monsterDestroy(bombbullet, monster){
        //     monster.destroy();
        // }
        function monsterDestroy(mario, monster){
            monster.destroy();
        }
      
        //เดิน
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keySpacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    
    update(delta, time) {
    //Show X Y
    
        this.label.setText('(' + this.pointer.x + ', ' + this.pointer.y + ')');
        background.tilePositionY -=1;
        mario.anims.play('gomario',true);
        // monsterEvent.anims.play('monster',true);
        //mario ขยับ
        if(keyW.isDown){
            mario.setVelocityY(-500);
        }else if(keyS.isDown){
            mario.setVelocityY(500);
        }else{
            mario.setVelocityY(0);
        }
        if(keyA.isDown){
            mario.setVelocityX(-500);
       
        }else if(keyD.isDown){
            mario.setVelocityX(500);
        }else{
            mario.setVelocityX(0);
        }
    
        //bullet
        if(Phaser.Input.Keyboard.JustDown(keySpacebar)){
            let bombbullet = this.physics.add.sprite(mario.x,mario.y,"bombbullet");
            bombbullet.setScale(0.1);
            // bombbullet.body.velocity.y= -bombbulletspeed;
            bombgroup.add(bombbullet);
            bombgroup.setVelocityY(-200);
        }
        for(let i=0;i< bombgroup.getChildren().length;i++){
            let bombbullet = bombgroup.getChildren()[i];
            if(bombbullet.y<0){
                bombbullet.destroy();
            }
        }
        //unlag loop
        for (let i = 0; i < monsterGroup.getChildren().length; i++) {
            if (monsterGroup.getChildren()[i].y > 800) {
                monsterGroup.getChildren()[i].destroy();
            }
        }
    }
}

export default GameScene;
