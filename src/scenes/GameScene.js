import Phaser from "phaser";

let backGround;
let cookiePlayer;
let monster;

//Control
let keyW;
let keyA;
let keyS;
let keyD;

//event
let monsterEvent;
let monsterGroup;

class GameScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'GameScene'
        });
    }

    preload() {
        this.load.image('map', 'src/img/map.jpg');
        this.load.image('cookie', 'src/img/cookie.png');
        this.load.image('monster', 'src/img/monster.png');

    }

    create() {
        //Show X Y
        this.label = this.add.text(0, 0, '(x, y)', { fontFamily: '"Monospace"' })
            .setDepth(100);
        this.pointer = this.input.activePointer;

        backGround = this.add.tileSprite(0, 0, 450, 720, 'map')
        .setOrigin(0, 0)
        .setScale(1.17);

        cookiePlayer = this.physics.add.image(235, 630, 'cookie')
        // .setImmovable()
        .setCollideWorldBounds(true)
        .setScale(0.5);

        // monsterGroup = this.physics.add.group();

        //Monster Event
        monsterEvent = this.time.addEvent({
            delay: Phaser.Math.Between(1000, 3000),
            callback: function () {
                monster = this.physics.add.image(Phaser.Math.Between(1, 450), 0, 'monster')
                .setScale(0.3);
                
                
                // monsterGroup.add(monster);
                // monsterGroup.setVelocityY(200);
                
                // this.physics.add.collider(cookie, monster, () => {
                    
                //     this.scene.start('GameOver');
                // });
            },
            callbackScope: this,
            loop: true,
            paused: false
        })
        // this.physics.add.collider(cookie, monster);
        
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

    }
    
    update(delta, time) {
        //Show X Y
        this.label.setText('(' + this.pointer.x + ', ' + this.pointer.y + ')');
        
        backGround.tilePositionY -= 1.5;

        //setRun
        if(keyW.isDown){
            cookiePlayer.setVelocityY(-500);
        }else if(keyS.isDown){
            cookiePlayer.setVelocityY(500);
        }else{
            cookiePlayer.setVelocityY(0);
        }
        if(keyA.isDown){
            cookiePlayer.setVelocityX(-500);
        }else if(keyD.isDown){
            cookiePlayer.setVelocityX(500);
        }else{
            cookiePlayer.setVelocityX(0);
        }
    }
}

export default GameScene;
