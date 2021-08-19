import Phaser from "phaser";

let Jotaro;
let backGround;
let objPacman;
let event;
let Pacman;


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
        this.load.image('TileSprite', 'src/image/TileSprite.png');

        // Character
        this.load.spritesheet('jotaro','src/image/Demon.png',
        {frameWidth: 86.66 , frameHeight: 82});

        // Monster
        this.load.spritesheet('Pacman', 'src/image/Pacman.png',
        {frameWidth: 17.375 , frameHeight: 18});
    }

    create() {
        
        // Background
        backGround = this.add.tileSprite(0,0,850,1400, 'TileSprite').setOrigin(0,0);
        
        // Character
        Jotaro = this.physics.add.sprite(425, 700, 'jotaro')
        .setScale(2)
        .setImmovable()
        .setCollideWorldBounds(true); 

        this.anims.create({
            key: 'jotaroAni',
            frames: this.anims.generateFrameNumbers('jotaro', {
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
                Pacman = this.physics.add.sprite(Phaser.Math.Between(0, 450) , 50, 'Pacman')
                .setScale(3);
                Pacman.anims.play('PacmanAni', true);
                objPacman.add(Pacman);
                Pacman.setVelocityY(Phaser.Math.Between(500, 200));
                this.physics.add.overlap(Pacman, Jotaro, PacDestroy);
            },
            callbackScope: this,
            loop: true,
            paused: false,
        });

        function PacDestroy(Pacman, Jotaro) {
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
        backGround.tilePositionY -= 0.5;
        
        // Player 
        Jotaro.anims.play('jotaroAni', true);
        
        // Player Control
        if(keyW.isDown){
            Jotaro.setVelocityY(-500);
        }else if(keyS.isDown){
            Jotaro.setVelocityY(500);
        }else{
            Jotaro.setVelocityY(0);
        }
        if(keyA.isDown){
            Jotaro.setVelocityX(-500);
        }else if(keyD.isDown){
            Jotaro.setVelocityX(500);
        }else{
            Jotaro.setVelocityX(0);
        }
        
        // Monster Destroy
        for (let i = 0; i < objPacman.getChildren().length; i++) {
            if (objPacman.getChildren()[i].y > 700) {
                objPacman.getChildren()[i].destroy();
            }
        }
    }
}

export default GameScene;
