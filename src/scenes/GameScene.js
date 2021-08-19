import Phaser from "phaser";

let pikachu;
let background;
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
        this.load.image('bg', 'src/images/bg1.png');
        this.load.spritesheet('pc','src/images/pikachu2.png',
            {frameWidth: 40.25 , frameHeight: 38});
        
          
    }

    create() {
        background = this.add.tileSprite(0, 0, 1083, 1086, 'bg').setOrigin(0, 0);

        pikachu = this.add.sprite(541, 600, 'pc').setScale(2);
        this.anims.create({
            key: 'pikachuAni',
            frames: this.anims.generateFrameNumbers('pc', {
                start: 0,
                end: 3
            }),
            duration: 500,    
            repeat: -1
        })
        // this.input.on('pointermove', (pointer)=>{
        //     pikachu.x = pointer.x
        //     pikachu.y = pointer.y  //ตั้งให้ตำแหน่งตัวละครไปตามเมาส์ของเรา
        // })
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);




    }
    
    update(delta, time) {
        pikachu.anims.play('pikachuAni', true);
        background.tilePositionY -= 2;

        // if(keyW.isDown){
        //     pikachu.setVelocityY(-500);
        // }else if(keyS.isDown){
        //     pikachu.setVelocityY(500);
        // }else{
        //     pikachu.setVelocityY(0);
        // }
        // if(keyA.isDown){
        //     pikachu.setVelocityX(-500);
        // }else if(keyD.isDown){
        //     pikachu.setVelocityX(500);
        // }else{
        //     pikachu.setVelocityX(0);
        // }

        if(keyW.isDown){
            pikachu.setVelocityY(-500);
        }else if(keyS.isDown){
            pikachu.setVelocityY(500);
        }else{
            pikachu.setVelocityY(0);
        }
        if(keyA.isDown){
            pikachu.setVelocityX(-500);
        }else if(keyD.isDown){
            pikachu.setVelocityX(500);
        }else{
            pikachu.setVelocityX(0);
        }

    }
}

export default GameScene;
