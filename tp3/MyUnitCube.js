import {CGFobject} from '../lib/CGF.js';
/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {

		/*for(xSign in [-1,1]){
			for(ySign in [-1,1]){
				for(zSign in [-1,1]){
					
				}
			}
		}*/

		this.vertices = [ 
            
            -0.5, -0.5, -0.5, 
            -0.5, -0.5, -0.5,
            -0.5, -0.5, -0.5,

            0.5, -0.5, -0.5,  
            0.5, -0.5, -0.5,
            0.5, -0.5, -0.5,

            -0.5, 0.5, -0.5,  
            -0.5, 0.5, -0.5,
            -0.5, 0.5, -0.5,

            0.5, 0.5, -0.5,  
            0.5, 0.5, -0.5,
            0.5, 0.5, -0.5,
            
            -0.5, -0.5, 0.5,
            -0.5, -0.5, 0.5,
            -0.5, -0.5, 0.5,

            0.5, -0.5, 0.5,
            0.5, -0.5, 0.5,
            0.5, -0.5, 0.5,

            -0.5, 0.5, 0.5,
            -0.5, 0.5, 0.5,
            -0.5, 0.5, 0.5,

            0.5, 0.5, 0.5,
            0.5, 0.5, 0.5,
            0.5, 0.5, 0.5
		];

        this.normals = [

            0, 0, -1, // 0
            0, -1, 0, // 1
            -1, 0, 0, // 2

            0, 0, -1, // 3
            0, -1, 0, // 4
            1, 0, 0, // 5

            0, 0, -1, // 6
            0, 1, 0,  // 7
            -1, 0, 0, // 8

            0, 0, -1, // 9
            0, 1, 0, // 10
            1, 0, 0, // 11

            0, 0, 1, // 12
            0, -1, 0, // 13
            -1, 0, 0, // 14

            0, 0, 1, // 15
            0, -1, 0, // 16
            1, 0, 0, // 17

            0, 0, 1, // 18
            0, 1, 0, // 19
            -1, 0, 0, // 20

            0, 0, 1, // 21
            0, 1, 0, // 22
            1, 0, 0, // 23
        ];

		// Counter-clockwise reference of vertices
		this.indices = [
            0, 6, 3, 
            6, 9, 3, // virada para baixo

            12, 15, 18, 
            15, 21, 18, // virada para cima

            1, 4, 16, 
            1, 16, 13, // perpendicular ao eixo do y, no lado negativo

            7, 22, 10, 
            7, 19, 22, // perpendicular ao eixo do y, no lado positivo

            11, 17, 5, 
            17, 11, 23, // perpendicular ao eixo do x, no lado positivo

            2, 14, 20, 
            8, 2, 20 // perpendicular ao eixo do x, no lado negativo
            ];


		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}