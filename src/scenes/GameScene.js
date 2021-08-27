import Phaser from "phaser";

let Demon;
let backGround;
let objPacman;
let event;
let Pacman;
let objFireball;
let FireballEvent;
let Fireball;



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
        this.load.image('TileSprite', 'src/image/SkyTile.png');

        // Character
        this.load.spritesheet('Demon','src/image/Demon.png',
        {frameWidth: 86.66, frameHeight: 82});

        // Monster
        this.load.spritesheet('Pacman', 'src/image/KingSmile.png',
        {frameWidth: 17.25, frameHeight: 29});

        //Fireball
        this.load.spritesheet('Fireball','src/image/Fireball.png',
        {frameWidth: 95.5, frameHeight: 99});
    }

    create() {
        
        // Background
        backGround = this.add.tileSprite(0,0,850,1400, 'TileSprite').setOrigin(0,0);
        
        // Character
        Demon = this.physics.add.sprite(425, 700, 'Demon')
        .setScale(2)
        .setImmovable()
        .setCollideWorldBounds(true); 

        this.anims.create({
            key: 'DemonAni',
            frames: this.anims.generateFrameNumbers('Demon', {
                start: 0,
                end: 7
            }),
            duration: 500,    
            repeat: -1
        });


        // Monster
        this.anims.create({
            key: 'PacmanAni',
            frames: this.anims.generateFrameNumbers('Pacman', {
                start: 0,
                end: 7
            }),
            duration: 500,    
            repeat: -1
        });

        objPacman = this.physics.add.group();
    
        event = this.time.addEvent({
            delay: 1000,
            callback: function () {
                Pacman = this.physics.add.sprite(Phaser.Math.Between(0, 450) , -50, 'Pacman')
                .setScale(3);
                Pacman.anims.play('PacmanAni', true);
                objPacman.add(Pacman);
                Pacman.setVelocityY(Phaser.Math.Between(500, 700));
                this.physics.add.overlap(Pacman, Demon, PacDestroy);
            },
            callbackScope: this,
            loop: true,
            paused: false,
        });


        function PacDestroy(Pacman, Demon) {
            Pacman.destroy();
        } 

        //Fireball
        this.anims.create({
            key: 'FireballAni',
            frames: this.anims.generateFrameNumbers('Fireball', {
                start: 0,
                end: 5
            }),
            duration: 500,    
            repeat: -1
        });

        objFireball = this.physics.add.group();

        FireballEvent = this.time.addEvent({
            delay: 1500,
            callback: function(){
                Fireball = this.physics.add.sprite(Demon.x, Demon.y -30,'Fireball')
                    .setScale(2)
                    .setSize(2);
                Fireball.anims.play('FireballAni', true);
                objFireball.add(Fireball);
                objFireball.setVelocityY(-500);
                this.physics.add.overlap(Pacman, Fireball, FireDestroy);
                },
            callbackScope: this,
            loop: true,
            pause: false
        });

        function FireDestroy(Pacman, Fireball) {
            Fireball.destroy();
            Pacman.destroy();
        } 



        // Player Control
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }

    update(delta, time) {
        // Background
        backGround.tilePositionY -= 1;
        
        // Player 
        Demon.anims.play('DemonAni', true);

        // Player Control
        if(keyW.isDown){
            Demon.setVelocityY(-500);
        }else if(keyS.isDown){
            Demon.setVelocityY(500);
        }else{
            Demon.setVelocityY(0);
        }
        if(keyA.isDown){
            Demon.setVelocityX(-500);
        }else if(keyD.isDown){
            Demon.setVelocityX(500);
        }else{
            Demon.setVelocityX(0);
        }

        // Monster Destroy
        for (let i = 0; i < objPacman.getChildren().length; i++) {
            if (objPacman.getChildren()[i].y > 700) {
                objPacman.getChildren()[i].destroy();
            }
        }
        
        //FireballDestroy
        for (let i = 0; i <  objFireball.getChildren().length; i++) {
            if (objFireball.getChildren()[i].y <= -50) {
                objFireball.getChildren()[i].destroy();
            }
        }
    }

}

export default GameScene;
