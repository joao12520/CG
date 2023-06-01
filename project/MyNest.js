import {CGFobject, CGFappearance, CGFtexture} from '../lib/CGF.js';
import { MyHalfSphere } from './MyHalfSphere.js';

/**
 * MySphere
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyNest extends CGFobject {
	constructor(scene, slices, stacks) {
		super(scene);
		this.slices = slices;
        this.stacks = stacks;
        this.halfSphere1 = new MyHalfSphere(this.scene,20,20,false);
        this.halfSphere2 = new MyHalfSphere(this.scene,20,20,true);
        this.texture = new CGFtexture(scene, "images/nest.png");
        this.appearance = new CGFappearance(this.scene);
        this.appearance.setTexture(this.texture)
        this.appearance.setAmbient(1.5,1.5,1.5,0);
        this.position = [50,-42.12,40];
        this.eggOffsets = [[0.45,-0.3,0.5],[0.35,-0.325,-0.45],[-0.45,-0.275,0.45],[-0.5,-0.3,-0.45]];
        this.eggs = [];
        this.scaleFactor = 4;
	}

    addEgg(egg) {
        this.eggs.push(egg);
        console.log("Added egg to nest");
        this.scene.displayEggs[this.scene.eggs.indexOf(egg)] = false;
    }

    containsEgg(egg) {
        return this.eggs.includes(egg);
    }

    getPos(){
        return this.position;
    }
	
	display() {
        this.scene.pushMatrix();
        this.scene.translate(...this.position);
        this.scene.scale(this.scaleFactor,this.scaleFactor,this.scaleFactor);

        this.scene.pushMatrix();
        this.appearance.apply();
        this.scene.scale(1,0.9,1);	
        this.scene.rotate(Math.PI,1,0,0);
        this.halfSphere1.display();
        this.halfSphere2.display();
        this.scene.popMatrix();

        this.eggs.forEach((egg, i1) => {
            this.scene.pushMatrix();
            this.scene.scale(0.25,0.25,0.25);
            this.scene.translate(...this.position.map((element, i2) => this.scaleFactor*(this.eggOffsets[i1][i2])));
            egg.display();
            this.scene.popMatrix();
        });

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


