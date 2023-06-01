import {CGFobject} from '../lib/CGF.js';
import { MyTriangle } from './MyTriangle.js';
import { MyTriangleBig } from './MyTriangleBig.js';
import { MyTriangleSmall } from './MyTriangleSmall.js';
/**
 * MyWing
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyRightWing extends CGFobject {
	constructor(scene) {
		super(scene);
		this.triange1 = new MyTriangle(scene);
        this.triange2 = new MyTriangle(scene);
        this.triangeSmall = new MyTriangleSmall(scene);
        this.triange1.scaleTexCoords(0.55, 0.55);
        this.triange2.scaleTexCoords(0.55, 0.55);
        this.triangeSmall.scaleTexCoords(0.55, 0.55);
	}
	
	display() {
        this.scene.pushMatrix();
        this.scene.scale(0.9, 0.9, 0.9);
        this.triange1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.2, -0.2, 0);
        this.scene.rotate(-Math.PI/4, 0, 0, 1);
        this.triangeSmall.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1.52, -0.19, -0.26);
        this.scene.rotate(Math.PI/8, 0, 1, 0);
        this.scene.scale(0.675, 0.71, 0.685);
        this.triange2.display();
        this.scene.popMatrix();
    }

    enableNormalViz() {
        this.triange1.enableNormalViz();
        this.triange2.enableNormalViz();
        this.triangeSmall.enableNormalViz();
    }

    disableNormalViz() {
        this.triange1.disableNormalViz();
        this.triange2.disableNormalViz();
        this.triangeSmall.disableNormalViz();
    }
}

