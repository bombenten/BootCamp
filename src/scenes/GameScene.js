import Phaser from "phaser";
let player;
let monster;
let backGround;
let eventMonster;
let monsterGroup;

//Control
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
        this.load.image('bg', 'src/image/gamebg.PNG');
        this.load.spritesheet('player','src/image/player.png',
        {frameWidth: 29, frameHeight: 32});
        this.load.spritesheet('monster','src/image/monster.png',
        {frameWidth: 27.5, frameHeight: 21});
        
    }

    create() {
        //Show X , Y
        this.label = this.add.text(0, 0, '(x, y)', { fontFamily: '"Monospace"' })
            .setDepth(100);
        this.pointer = this.input.activePointer;

        backGround = this.add.tileSprite(0, 0, 850, 1400, 'bg')
        .setOrigin(0, 0)
        .setScale(3);

        player = this.physics.add.sprite(240, 600, 'player')
        .setScale(3)
        .setCollideWorldBounds(true);

        //Animation
            //player
        this.anims.create({
            key: 'playerAni',
            frames: this.anims.generateFrameNumbers('player', {
                start: 0,
                end: 2
            }),
            duration: 500,
            repeat: -1
        })
            //monster
        this.anims.create({
            key: 'monsterAni',
            frames: this.anims.generateFrameNumbers('monster', {
                start: 0,
                end: 1
            }),
            duration: 500,
            repeat: -1
        })



        monsterGroup = this.physics.add.group();
        //MonsterEvent
        eventMonster = this.time.addEvent({
            delay: Phaser.Math.Between(1000,5000),
            callback: function(){
                monster = this.physics.add.sprite(Phaser.Math.Between(1,400),0,'monster')
                .setScale(3);
                monsterGroup.add(monster);
                monster.anims.play('monsterAni',true);
                monster.setVelocityY(100);
                this.physics.add.overlap(player,monster,monsterDestroy);
            },
            callbackScope: this,
            loop: true,
            paused: false,

        });

        function monsterDestroy(player, monster){
            monster.destroy();
        }


        //keyMapping
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    }
    
    update(delta, time) {
        //Show X Y
        this.label.setText('(' + this.pointer.x + ', ' + this.pointer.y + ')');

        backGround.tilePositionY -= 1;

        //setMove
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
        player.anims.player('playerAni', true);
        
        for (let i = 0; i < monsterGroup.getChildren().length; i++) {
            if (monsterGroup.getChildren()[i].y > 800) {
                monsterGroup.getChildren()[i].destroy();
            }
        }
    }
}

export default GameScene;
