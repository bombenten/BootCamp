import Phaser from "phaser";

let pikachu;
let pri1;
let background;
let keyW;
let keyA;
let keyS;
let keyD;
let event;
let objGroup;

class GameScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'GameScene'
        });
    }

    preload() {
        this.load.image('bg', 'src/images/bg1.png');
        this.load.spritesheet('pc', 'src/images/pikachu2.png',
            { frameWidth: 40.25, frameHeight: 38 });
        this.load.spritesheet('pri', 'src/images/pripri.png',
            { frameWidth: 66.5, frameHeight: 164 });


    }

    create() {
        background = this.add.tileSprite(0, 0, 1083, 1086, 'bg').setOrigin(0, 0);

        pikachu = this.physics.add.sprite(541, 600, 'pc')
            .setCollideWorldBounds(true)
            .setScale(2);
        this.anims.create({
            key: 'pikachuAni',
            frames: this.anims.generateFrameNumbers('pc', {
                start: 0,
                end: 3
            }),
            duration: 500,
            repeat: -1
        })

        this.anims.create({
            key: 'priAni',
            frames: this.anims.generateFrameNumbers('pri', {
                start: 0,
                end: 15
            }),
            duration: 1000,
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



        objGroup = this.physics.add.group();

        event = this.time.addEvent({
            delay: 1000,
            callback: function () {
                pri1 = this.physics.add.sprite(Phaser.Math.Between(150, 950), 50, 'pri')
                    .setScale(2);
                objGroup.add(pri1);
                pri1.anims.play('priAni', true);
                pri1.setVelocityY(100);
                this.physics.add.collider(pikachu, pri1, priDestroy);
            },
            callbackScope: this,
            loop: true,
            timeScale: 1

        })
        
        function priDestroy(pikachu, pri1,) {
            pri1.destroy();

        }

    }

    update(delta, time) {
        pikachu.anims.play('pikachuAni', true);
        background.tilePositionY -= 2;


        if (keyW.isDown) {
            pikachu.setVelocityY(-500);
        } else if (keyS.isDown) {
            pikachu.setVelocityY(500);
        } else {
            pikachu.setVelocityY(0);
        }
        if (keyA.isDown) {
            pikachu.setVelocityX(-500);
        } else if (keyD.isDown) {
            pikachu.setVelocityX(500);
        } else {
            pikachu.setVelocityX(0);
        }

        for (let i = 0; i < objGroup.getChildren().length; i++) {
            if (objGroup.getChildren()[i].y > 1300) {
                objGroup.getChildren()[i].destroy();
            }
        }

    }
}

export default GameScene;
