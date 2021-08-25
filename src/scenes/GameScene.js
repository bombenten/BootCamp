import Phaser from "phaser";

let backGround;
let cookiePlayer;
let monster;
let goldManPlayer;
let bullet;

//Control
let keyW;
let keyA;
let keyS;
let keyD;

let keyFire;

let bulletspeed = -200;

//event
let bulletEvent;
let monsterEvent;
let monsterGroup;
let bulletGroup;

class GameScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'GameScene'
        });
    }

    preload() {
        this.load.image('map', 'src/img/map.jpg');

        this.load.spritesheet('goldMan', 'src/img/goldman.png',
        {frameWidth: 39.33333333333333, frameHeight: 41});

        this.load.spritesheet('monster', 'src/img/monster2.png',
        {frameWidth: 52, frameHeight: 64});

        this.load.spritesheet('bulletcoin', 'src/img/spinning-coin-spritesheet-removebg-preview.png',
        {frameWidth: 500, frameHeight: 35.71428571428571});

    }

    create() {
        //Show X Y
        this.label = this.add.text(0, 0, '(x, y)', { fontFamily: '"Monospace"' })
            .setDepth(100);
        this.pointer = this.input.activePointer;

        backGround = this.add.tileSprite(0, 0, 450, 720, 'map')
        .setOrigin(0, 0)
        .setScale(1.17);

        goldManPlayer = this.physics.add.sprite(235, 630, 'goldMan')
        .setImmovable()
        .setCollideWorldBounds(true)
        .setScale(2);

        function DestroyMonster(bullet, monster){
            monster.destroy();
        }

        monsterGroup = this.physics.add.group();

        //Monster Event
        monsterEvent = this.time.addEvent({
            delay: Phaser.Math.Between(500, 1000),
            callback: function () {
                monster = this.physics.add.sprite(Phaser.Math.Between(1, 450), 0, 'monster')
                .setScale(2);
                monsterGroup.add(monster);
                monsterGroup.setVelocityY(200);
                
                monster.anims.play('animonster',true);
                this.physics.add.collider(bullet, monster, DestroyMonster);
            },
            callbackScope: this,
            loop: true,
            paused: false
        })

        bulletGroup = this.physics.add.group();
        
        

        this.anims.create({
            key: 'anigoldman',
            frames: this.anims.generateFrameNumbers('goldMan',{
                start:0,
                end:5
            }),
            duration:900,
            repeat: -1
        });

        this.anims.create({
            key: 'animonster',
            frames: this.anims.generateFrameNumbers('monster',{
                start:0,
                end:7
            }),
            duration:900,
            repeat: -1
        });

        this.anims.create({
            key: 'anicoin',
            frames: this.anims.generateFrameNumbers('bulletcoin',{
                start:0,
                end:13
            }),
            duration:900,
            repeat: -1
        });

        

        //Player Pointermove
        // this.input.on('pointermove', (pointer)=>{
        //     cookiePlayer.x = pointer.x
        //     cookiePlayer.y = pointer.y
        // })

        //Player Control
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        keyFire = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    }
    
    update(delta, time) {
        //Show X Y
        this.label.setText('(' + this.pointer.x + ', ' + this.pointer.y + ')');
        
        backGround.tilePositionY -= 1.5;

        
        goldManPlayer.anims.play('anigoldman',true);
        
        

        //setRun
        if(keyW.isDown){
            goldManPlayer.setVelocityY(-500);
        }else if(keyS.isDown){
            goldManPlayer.setVelocityY(500);
        }else{
            goldManPlayer.setVelocityY(0);
        }
        if(keyA.isDown){
            goldManPlayer.setVelocityX(-500);
        }else if(keyD.isDown){
            goldManPlayer.setVelocityX(500);
        }else{
            goldManPlayer.setVelocityX(0);
        }

        if(Phaser.Input.Keyboard.JustDown(keyFire)){
            bullet = this.physics.add.sprite(goldManPlayer.x,goldManPlayer.y,"bulletcoin")
            .setImmovable()
            .setScale(1)
            .setSize(1);
            // bulletGroup.body.velocity.y= -bulletspeed;
            bulletGroup.add(bullet);
            bulletGroup.setVelocityY(-200);
        }

        for (let i = 0; i < monsterGroup.getChildren().length; i++) {
            if (monsterGroup.getChildren()[i].y > 700) {
                monsterGroup.getChildren()[i].destroy();
            }
        }
        

        for (let i = 0; i < bulletGroup.getChildren().length; i++) {
            if (bulletGroup.getChildren()[i].y > 700) {
                    bulletGroup.getChildren()[i].destroy();
            }
        }
    }
}

export default GameScene;
