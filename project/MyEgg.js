import {CGFobject, CGFappearance, CGFtexture} from '../lib/CGF.js';
import { MyHalfSphere } from './MyHalfSphere.js';

/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyEgg extends CGFobject {
	constructor(scene) {
		super(scene);
        this.scene = scene;
        this.texture = new CGFtexture(scene, "images/egg.jpg");
        this.halfSphere1 = new MyHalfSphere(this.scene,20,20,false);
        this.halfSphere2 = new MyHalfSphere(this.scene,20,20,false);
        this.appearence = new CGFappearance(this.scene);
		this.appearence.setTexture(this.texture);

        this.position = [0,0,0];
        this.dropInstant = 0;
        this.speedVec =[];
        this.groundLevel = -60;
	}

    update(time) {
        if(!this.isFalling)
            return;
    
        const gravity = 1;
        const timeInSeconds = (time - this.dropInstant) / 1000;
    
        this.position[0] += this.speedVec[0];
        this.position[1] -= 0.5 * gravity * Math.pow(timeInSeconds, 2) + this.speedVec[1];
        this.position[2] += this.speedVec[2];

        if (this.position[1] <= this.groundLevel) {
            this.isFalling = false;
            this.scene.droppedEgg = null;
        }
    }
    

    drop(time, pos, speedVec){
        if(this.isFalling)
            return;
        this.speedVec = speedVec;
        console.log(this.speedVec);
        this.position = pos;
        this.dropInstant = time;
        this.scene.droppedEgg = this;
        this.isFalling = true;
    }
    
	
	display() {
        this.scene.pushMatrix();
        this.scene.scale(1,1,1);

        this.scene.pushMatrix();
        this.appearence.apply();
        this.scene.scale(1,1.7,1);
        this.halfSphere1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI,1,0,0);
        this.halfSphere2.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
	}

    enableNormalViz() {
        this.halfSphere1.enableNormalViz();
        this.halfSphere2.enableNormalViz();
    }

    disableNormalViz() {
        this.halfSphere1.disableNormalViz();
        this.halfSphere2.disableNormalViz();
    }
}
