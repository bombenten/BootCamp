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
let tdGroup;
let td;
let keylight;

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
        this.load.image('td', 'src/images/thumder.png');


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

        // tdGroup = this.physics.add.group()

        // thunderEvent = this.time.addEvent({
        //     delay: 1000,
        //     callback : function(){
        //         td = this.physics.add.image(pikachu.x, pikachu.y-50,'td')
        //             .setScale(0.05) ;   

        //         tdGroup.add(td);
        //         tdGroup.setVelocityY(-200);
        //     },
        //     callbackScope: this,
        //     loop: true,
        //     pause: false
        // });



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
        keylight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


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
                this.physics.add.overlap(tdGroup, objGroup, tdDestroy);
            },
            callbackScope: this,
            loop: true,
            timeScale: 1

        })

        function priDestroy(pikachu, pri1,) {
            pri1.destroy();

        }

        function tdDestroy(tdGroup, objGroup) {
            tdGroup.destroy();
            objGroup.destroy();
        }

        tdGroup = this.physics.add.group()

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

        if (Phaser.Input.Keyboard.JustDown(keylight)) {
            td = this.physics.add.image(pikachu.x, pikachu.y - 50, 'td')
                .setScale(0.05);
            tdGroup.add(td);
            tdGroup.setVelocityY(-500);
            
        }

        for (let i = 0; i < objGroup.getChildren().length; i++) {
            if (objGroup.getChildren()[i].y > 1300) {
                objGroup.getChildren()[i].destroy();
            }
        }

        for (let i = 0; i < tdGroup.getChildren().length; i++) {
            if (tdGroup.getChildren()[i].y <= -50) {
                tdGroup.getChildren()[i].destroy();
            }
        }


    }
}

export default GameScene;
