import Phaser from "phaser";
import src from "phaser/plugins/camera3d/src";
let jotaro;
let priToL;
let priToR;
let priToLDs;
let priToRDs;
let monsEvent;
let monsEventR;

let groupToL;
let groupToR;
let bullet;
let bulletGroup;
let bulletLDs;
let bulletRDs;

let background;
let tileBg;

let ground;
let block1;
let block2;

let imgQ;
let hitboxQ
let imgW;
let hitboxW;

let left;
let right;
let up;
let down;
let keyBullet;

let score = 0;
let scoreText;

class GameScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'GameScene'
        });
    }

    preload() {
      //     this.load.image('milos', 'src/image/bigmilos.png');
    //     this.load.image('ground','src/image/ground.png');
         
        //this.load.image('bg', 'src/image/TileSprite (2).png');
        //this.load.image('poke1','src/image/images/pokemon/poke (4).png');
        this.load.spritesheet('priToL','src/image/flyTo.png',
        {frameWidth:36 , frameHeight:25});
        this.load.spritesheet('priToR','src/image/flyTo.png',
        {frameWidth:36 , frameHeight:25});
        this.load.spritesheet('jotaro','src/image/jotaro.png',
        { frameWidth: 22.75 , frameHeight: 32}); 
        this.load.image('bg','src/image/ManiaPic/background8-bit.png');
        this.load.image('tileBg','src/image/TileSprite02.png');
        this.load.image('imgQ','src/image/ManiaPic/buttonRed.png');
        this.load.image('imgW','src/image/ManiaPic/buttonGreen.png');
        this.load.image('block1','src/image/ManiaPic/mania-bg.png');
        this.load.image('block2','src/image/ManiaPic/mania-bg.png');
        this.load.spritesheet('bullet','src/image/flymons.png',
        {frameWidth:28 , frameHeight:18});
    }

    create() {
        //tileBackground
        tileBg = this.add.tileSprite(89,0,550,1450,'tileBg').setOrigin(0,0)
        .setScale(0.5)
        .setDepth(2);
        block1 = this.physics.add.image(-261,0,'block1').
        setOrigin(0,0)
        .setDepth(3)
        .setOffset(174, 362)
        .setImmovable()
        .setVisible();
        block2 = this.physics.add.image(364,0,'block2')
        .setOrigin(0,0)
        .setDepth(3)
        .setOffset(174, 362)
        .setImmovable()
        .setVisible();
        
        //background
        background = this.add.tileSprite(0,0,450,800,'bg').setOrigin(0,0).setScale(1).setDepth(1);
        imgQ = this.physics.add.image(-59.5,310,'imgQ').setOrigin(0,0)
        .setDepth(3)
        .setScale(1.38)
        .setAlpha(0.2)
        .setOffset(-200,0);
        imgW = this.physics.add.image(79,310,'imgW').setOrigin(0,0)
        .setDepth(3)
        .setScale(1.38)
        .setAlpha(0.2)
        .setOffset(500,0);
        
        //player
        jotaro = this.physics.add.sprite(220,650,'jotaro')
        .setScale(2).setDepth(3);
        this.physics.add.collider(block1,jotaro);
        this.physics.add.collider(block2,jotaro);
        jotaro.setCollideWorldBounds(true);


        
        //animation player
        this.anims.create(
            {
            key: 'jotaroAniLeft',
            frames: this.anims.generateFrameNumbers('jotaro', {
                start: 0,
                end: 3
            }),
            duration: 500,
            framerate: 0,
            repeat: -1
        }        
        )
        this.anims.create(
            {
            key: 'jotaroAniRight',
            frames: this.anims.generateFrameNumbers('jotaro', {
                start: 4,
                end: 7
            }),
            duration: 500,
            framerate: 0,
            repeat: -1
        }
        )

        //animation bullet
        this.anims.create(
            {
            key: 'bulletAni',
            frames: this.anims.generateFrameNumbers('bullet', {
                start: 0,
                end: 7
            }),
            duration: 500,
            framerate: 0,
            repeat: -1
        }
        )
               
        //key input
        left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyBullet = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //event monsterLeft
        groupToL = this.physics.add.group();
        monsEvent = this.time.addEvent({
            delay: (Math.random() * 3000)+1000,
            callback: function () {               
                priToL = this.physics.add.sprite(155,10,'priToL').setDepth(3).setScale(3.5).setOffset(0,5);
                priToL.rotation += 1.58;
                groupToL.add(priToL);
                this.anims.create(
                    {
                        key:'priToLAni',
                        frames: this.anims.generateFrameNumbers('priToL',{
                            start:8,
                            end:15
                        }),
                        duration: 500,
                     framerate: 0,
                     repeat: -1
                    } 
                 )
                groupToL.setVelocityY((Math.random() * +500)+300);
                priToL.anims.play('priToLAni',true);
                this.physics.add.overlap(bulletGroup,groupToL,bulletLDs);
                
            },
            callbackScope: this,
            loop: true,
            paused: false
        })
        //event monsterRight
        groupToR = this.physics.add.group();
        monsEventR = this.time.addEvent({
            delay: (Math.random() * 3000)+1000,
            callback: function () {               
                priToR = this.physics.add.sprite(290,10,'priToR').setDepth(3).setScale(3.5).setOffset(2,5);
                priToR.rotation += 1.58;
                groupToR.add(priToR);                 
            this.anims.create(
                {
                key:'priToRAni',
                frames: this.anims.generateFrameNumbers('priToL',{
                    start:8,
                    end:15
                }),
                duration: 500,
             framerate: 0,
             repeat: -1
            } 
         )
                groupToR.setVelocityY((Math.random() * +500)+300);
                priToR.anims.play('priToRAni',true);
                this.physics.add.overlap(bulletGroup,groupToR,bulletRDs);
                
            },
            callbackScope: this,
            loop: true,
            paused: false
        })

        //overlap monsL
        this.physics.add.overlap(jotaro,groupToL,priToLDs);          
        function priToLDs(jotaro,priToL){
            priToL.destroy();         
            score++;
        }
        //overlap monsR
        this.physics.add.overlap(jotaro,groupToR,priToRDs);
        function priToRDs(jotaro,priToR){
            priToR.destroy();
            score++;
        }

        // this.physics.add.overlap(bulletGroup,groupToL,bulletLDs);
        function bulletLDs(bullet,priToR){
            priToL.destroy();
            bullet.destroy();
            score++;
        }

        
        function bulletRDs(bullet,priToR){
            priToR.destroy();
            bullet.destroy();
            score++;
        }

        bulletGroup = this.physics.add.group();
        

        scoreText = this.add.text(10, 20, 'score: 0', 
        { font: "50px Pixel Operator 8", fill: '#ffff' }).setDepth(5).setScale(2);
               

    }

    
    update(delta, time) {
        background.tilePositionX -= 0.5;
        //ปรับขนาดรูปให้โฟกัสทั้งรูปไม่เป็น ทำงี้ไปก่อนนะ555
        background.tilePositionY = -10000;
        tileBg.tilePositionY -= 2;

        scoreText.setText('Score: ' + score);

        //imgQ.setAlpha((Q.isDown) ? 1 : 0.2);
        //imgW.setAlpha((W.isDown) ? 1 : 0.2);
        
        //can't setSize(); :(
        if(left.isDown){       
            imgQ.setAlpha(1);//.setOffset(32,552.5);
            jotaro.anims.play('jotaroAniLeft', true);           
            jotaro.setVelocityX(-700);
        }else if(right.isDown){
            imgW.setAlpha(1);//.setOffset(281,552.5);
            jotaro.anims.play('jotaroAniRight', true);
            jotaro.setVelocityX(700);
        }else{           
            imgQ.setAlpha(0.2);//.setOffset(-200,0);
            imgW.setAlpha(0.2);//.setOffset(500,0);
            jotaro.setVelocityX(0);        
        }
        if(up.isDown){
            jotaro.setVelocityY(-500);
        } 
        else if(down.isDown){
            jotaro.setVelocityY(500);
        }
        else{
            jotaro.setVelocityY(0);
        }
        
        //destroy not work :(
        for (let i = 0; i < groupToL.getChildren().length; i++) {
            console.log("wow");
            if (groupToL.getChildren()[i].y > 720) {
                    groupToL.getChildren()[i].destroy();
            }
        }
        for (let i = 0; i < groupToR.getChildren().length; i++) {
            console.log("wow2");
            if (groupToR.getChildren()[i].y > 720) {
                    groupToR.getChildren()[i].destroy();
            }
        }


        if(Phaser.Input.Keyboard.JustDown(keyBullet)){
            bullet = this.physics.add.sprite(jotaro.x, jotaro.y,'bullet')
            .setScale(1.5).setDepth(3);
            bullet.rotation -= 1.58
            bullet.anims.play('bulletAni',true);
            bulletGroup.add(bullet);
            bullet.body.velocity.y = -500;                                
        }

        for (let i = 0; i < bulletGroup.getChildren().length; i++) {           
            if (bulletGroup.getChildren()[i].y < 0) {
                    bulletGroup.getChildren()[i].destroy();
            }
        }


    }
        
}

        

export default GameScene;
