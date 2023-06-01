import {CGFappearance, CGFobject} from '../lib/CGF.js';
import { MySphere } from './MySphere.js';
/**
 * MyPanorama
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPanorama extends CGFobject {
	constructor(scene, radius, slices, stacks, texture) {
		super(scene);
		this.scene = scene;
		this.radius = radius;
		this.slices = slices;
		this.stacks = stacks;
		this.appearence = new CGFappearance(this.scene);
		this.appearence.setTexture(texture)
		this.appearence.setAmbient(3,3,3,0);
		this.initBuffers();
	}
	
	initBuffers() {
		this.sphere = new MySphere(this.scene,this.slices,this.stacks,true);
	}

	display(){
		this.scene.pushMatrix();
		this.appearence.apply();
		this.scene.scale(this.radius,this.radius,this.radius);
		this.sphere.display();
		this.scene.popMatrix();
	}

	enableNormalViz(){
		this.sphere.enableNormalViz();
	}

	disableNormalViz(){
		this.sphere.disableNormalViz();
	}
}
