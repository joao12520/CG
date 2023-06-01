import {CGFobject} from '../lib/CGF.js';
/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyParallelogram extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
        	0, 0, 0,	//0
            1, 1, 0,  	//1
            2, 0, 0,   	//2
			3, 1, 0,	//3

		];

		//Counter-clockwise reference of vertices
		this.indices = [
            0,1,2,
            0,2,1,
			1,2,3,
			1,3,2
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

		/**
	* @method updateTexCoords
	* Updates the list of texture coordinates of the quad
	* @param {Array} coords - Array of texture coordinates
	*/
	updateTexCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
	}
}
