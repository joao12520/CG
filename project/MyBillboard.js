import {CGFobject, CGFappearance, CGFtexture, CGFshader} from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';

/**
 * MySphere
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBillboard extends CGFobject {
	constructor(scene, x, y, z, height, width) {
		super(scene);
        this.position = [x,y,z];
        this.scene = scene;
        this.height = height;
        this.width = width;
		this.quad = new MyQuad(this.scene);
        
	}
	
	display() {
        this.scene.pushMatrix();
        let aux = vec3.create();
        vec3.subtract(aux, this.scene.camera.position, this.position);
        aux[1] = 0;
        vec3.normalize(aux, aux);

        let dotProduct = vec3.dot(vec3.fromValues(0,0,1), aux);
        let angle = Math.acos(dotProduct);
        let axis = vec3.create();
        vec3.cross(axis, vec3.fromValues(0,0,1), aux);

        this.scene.translate(this.position[0], this.position[1] + this.height/2, this.position[2]);
        this.scene.rotate(angle, axis[0], axis[1], axis[2]);
        this.scene.scale(this.width, this.height, this.width);
        

        // Display the object
        this.quad.display();
    
        this.scene.popMatrix();
    }

    enableNormalViz() {
        this.quad.enableNormalViz();
    }

    disableNormalViz() {
        this.quad.disableNormalViz();
    }

}


