import Phaser from "phaser";

let bg;
let jett;
let keyUp, keyDown, keyLeft, keyRight,keyFire;
let daggerSpeed = 900;
let phxGrp;
let daggerGrp;
let phxSpacing = 80;


class GameScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'GameScene'
        });
    }

    preload() {
        this.load.image('bg', 'src/img/mid-spilt crop.jpg');
        this.load.image('dagger', 'src/img/jettdagg.png');
        this.load.image('jett', 'src/img/jettEmbarrassing.png');
        this.load.image('phx', 'src/img/My-Eyes.png');
    }

    create() {
        this.label = this.add.text(0,0,'(x,y)',{fontFamily: '"Monspace"'}).setDepth(100);
        this.pointer = this.input.activePointer;

        bg = this.add.tileSprite(0, 0, 450, 720, 'bg').setOrigin(0, 0);
        
        //createJett
        jett = this.physics.add.sprite(240, 720, "jett");
        jett.setScale(0.25);
        jett.speed = 600;
        jett.setCollideWorldBounds(true);

        daggerGrp = this.add.group();
        phxGrp = this.add.group();

        //createphx
        for (let i = 0; i < 5; i++) {
            let phx = this.physics.add.sprite(70 + (i*phxSpacing), 0, "phx");
            phx.setScale(0.2);
            phx.speed = (Math.random() * 2) + 1;
            phx.startY = -(phx.height);
            phx.y = phx.startY;
            phx.magnitude = Math.random() * 20;
            phxGrp.add(phx);
        }

        //check collisions
        this.physics.add.overlap(phxGrp,daggerGrp,function onHit(phx, dagger){
            dagger.destroy();
            phx.y = phx.startY;
            phx.speed = (Math.random() * 2) + 1;
        });
        this.physics.add.overlap(phxGrp,jett,function onHit(phx, jett){
            phx.y = phx.startY;
            phx.speed = (Math.random() * 2) + 1;
        });
        

        //input
        keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyFire = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
    
    update(delta, time) {
        this.label.setText('(' + this.pointer.x + ', ' + this.pointer.y + ')');
        //movement
        if (keyUp.isDown) {
            jett.setVelocityY(-jett.speed);
        } else if (keyDown.isDown) {
            jett.setVelocityY(jett.speed);
        } else {
            jett.setVelocityY(0);
        }
        if (keyLeft.isDown) {
            jett.setVelocityX(-jett.speed);
        } else if (keyRight.isDown) {
            jett.setVelocityX(jett.speed);
        } else {
            jett.setVelocityX(0);
        }

        //fire and update
        if (Phaser.Input.Keyboard.JustDown(keyFire)) {
            let dagger = this.physics.add.sprite(jett.x, jett.y, "dagger");
            dagger.setScale(0.19);
            dagger.body.velocity.y = -daggerSpeed;
            daggerGrp.add(dagger);
            
        }
        for (let i = 0; i < daggerGrp.getChildren().length; i++) {
            let dagger = daggerGrp.getChildren()[i];
            if (dagger.y < 0) {
                dagger.destroy();
            }
        }

        //updatephx
        for (let i = 0; i < phxGrp.getChildren().length; i++) {
            let phx = phxGrp.getChildren()[i];
            phx.y += phx.speed;

            if(phx.y > 720 + phx.height){
                phx.speed = (Math.random() * 2) + 1;
                phx.y = phx.startY;
            }
        }
    }
    
}

export default GameScene;
