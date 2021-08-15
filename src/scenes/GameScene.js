import Phaser from "phaser";

let background;
let player;
let girl;
let girlGroup;
let girlEvent;

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
        this.load.image('bg', 'src/image/tileSprite.png');
        this.load.spritesheet('player', 'src/image/playerSprite.png',
            { frameWidth: 15, frameHeight: 21 });
        this.load.spritesheet('girl', 'src/image/playerGirl.png',
            { frameWidth: 17, frameHeight: 21 });

    }

    create() {
        //Show X Y
        this.label = this.add.text(0, 0, '(x, y)', { fontFamily: '"Monospace"' })
            .setDepth(100);
        this.pointer = this.input.activePointer;

        background = this.add.tileSprite(0, 0, 850, 1400, 'bg')
            .setOrigin(0, 0)
            .setScale(9.375);
        player = this.physics.add.sprite(225, 600, 'player').setScale(5);
        player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'allAni',
            frames: this.anims.generateFrameNumbers('player', {
                start: 0,
                end: 8
            }),
            duration: 400,
            repeat: -1
        })
        // player.anims.play('allAni', true);

        this.anims.create({
            key: 'goAni',
            frames: this.anims.generateFrameNumbers('player', {
                start: 4,
                end: 5
            }),
            duration: 400,
            repeat: -1
        })
        // player.anims.play('goAni', true);

        this.anims.create({
            key: 'backAni',
            frames: this.anims.generateFrameNumbers('player', {
                start: 2,
                end: 3
            }),
            duration: 400,
            repeat: -1
        })
        // player.anims.play('backAni', true);

        this.anims.create({
            key: 'leftAni',
            frames: this.anims.generateFrameNumbers('player', {
                start: 6,
                end: 8
            }),
            duration: 400,
            repeat: -1
        })
        // player.anims.play('leftAni', true);

        this.anims.create({
            key: 'rightAni',
            frames: this.anims.generateFrameNumbers('player', {
                start: 6,
                end: 8
            }),
            duration: 400,
            repeat: -1
        })
        // player.anims.play('rightAni', true).setFlipX(true);



        this.anims.create({
            key: 'girlAni',
            frames: this.anims.generateFrameNumbers('girl', {
                start: 2,
                end: 3
            }),
            duration: 400,
            repeat: -1
        })



        girlGroup = this.physics.add.group();

        girlEvent = this.time.addEvent({
            delay: Phaser.Math.Between(500, 1000),
            callback: function () {
                girl = this.physics.add.sprite(Phaser.Math.Between(78, 388), -100, 'girl')
                    .setScale(5);
                girlGroup.add(girl);
                girl.anims.play('girlAni', true);
                girl.setVelocityY(Phaser.Math.Between(200, 600));
                this.physics.add.overlap(player, girl, girlDestroy);
            },
            callbackScope: this,
            loop: true,
            paused: false,
        });

        function girlDestroy(player, girl,){
            girl.destroy();

        }

        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    }

    update(delta, time) {
        //Show X Y
        this.label.setText('(' + this.pointer.x + ', ' + this.pointer.y + ')');

        background.tilePositionY -= 1;

        if (keyW.isDown) {
            player.setVelocityY(-500);
        } else if (keyS.isDown && !keyA.isDown && !keyD.isDown) {
            player.setVelocityY(400);
            player.anims.play('backAni', true);
        } else if (!keyA.isDown && !keyD.isDown) {
            player.setVelocityY(0);
            player.anims.play('goAni', true);
        }
        if (keyA.isDown && keyS.isDown) {
            player.setVelocityX(-500);
            player.setVelocityY(400);
            player.anims.play('leftAni', true).setFlipX(false);
        } else if (keyD.isDown && keyS.isDown) {
            player.setVelocityX(500);
            player.setVelocityY(400);
            player.anims.play('rightAni', true).setFlipX(true);
        } else if (keyA.isDown) {
            player.setVelocityX(-500);
            player.anims.play('leftAni', true).setFlipX(false);
        } else if (keyD.isDown) {
            player.setVelocityX(500);
            player.anims.play('rightAni', true).setFlipX(true);
        } else {
            player.setVelocityX(0);
        }

        for (let i = 0; i < girlGroup.getChildren().length; i++) {
            if (girlGroup.getChildren()[i].y > 720+50) {
                girlGroup.getChildren()[i].destroy();
            }
        }
    }
}
    export default GameScene;
