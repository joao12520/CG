import {CGFobject} from '../lib/CGF.js';
/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTriangle extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
            -1, 1, 0,   //0
            -1, -1, 0,  //1
            1, -1, 0,    //2
			-1, 1, 0,   //0
            -1, -1, 0,  //1
            1, -1, 0    //2
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
			3, 5, 4
		];

		this.normals = [
			0,0,1,
			0,0,1,
			0,0,1,
			0,0,-1,
			0,0,-1,
			0,0,-1,
		];

		this.texCoords = [
			0, 0,
			0, 1,
			1, 1,
			0, 0,
			0, 1,
			1, 1,
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

	setTexCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
	}

	scaleTexCoords(length_s, length_t) {
		for (let i = 0; i < this.texCoords.length; i+=2) {
			this.texCoords[i] *= length_s;
			this.texCoords[i+1] *= length_t;
		}
		this.updateTexCoordsGLBuffers();
	}
}
