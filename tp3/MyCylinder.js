import {CGFobject} from '../lib/CGF.js';
/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCylinder extends CGFobject {
	constructor(scene, slices, stacks) {
		super(scene);
		this.slices = slices;
		this.stacks = stacks;
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [];

        this.normals = [];

		// Counter-clockwise reference of vertices
		this.indices = [];

		const ang = 2*Math.PI / this.slices;
		const stackLen = 1 / (this.stacks);
		let nVertices = 0;
		let alpha = 0;
        let z = stackLen;

        let points1 = [];
        let normal1 = [Math.cos(alpha), Math.sin(alpha), 0];

        for(let i = 0; i < this.stacks+1; i++){
            points1.push(Math.cos(alpha), Math.sin(alpha), i*stackLen);
            this.normals.push(...normal1);
            nVertices++;
        }

        this.vertices.push(...points1);

		for(let j = 0; j < this.slices-1; j++){
            let points2 = [];
            let normal2 = [Math.cos(alpha + ang), Math.sin(alpha + ang), 0];

			for(let k = 0; k < this.stacks+1; k++){
                points2.push(Math.cos(alpha + ang), Math.sin(alpha + ang), k*stackLen);
                this.normals.push(...normal2);
                nVertices++;
            }

            this.vertices.push(...points2);
            
            for(let u = 0; u < this.stacks; u++){
                let basePoint1 = nVertices-2*(this.stacks+1) + u;
                let basePoint2 = nVertices-(this.stacks+1) + u;
			    this.indices.push(basePoint1, basePoint2, basePoint2+1, basePoint1, basePoint2+1, basePoint1+1);
            }

			points1 = points2;
			z += stackLen;
            alpha += ang;
		}

        for(let v = 0; v < this.stacks; v++){
            let basePoint1 = nVertices-(this.stacks+1) + v;
            let basePoint2 = v;
            this.indices.push(basePoint1, basePoint2, basePoint2+1, basePoint1, basePoint2+1, basePoint1+1);
        }

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}