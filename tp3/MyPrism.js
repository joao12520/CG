import {CGFobject} from '../lib/CGF.js';
/**
 * MyPrism
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPrism extends CGFobject {
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
		let alpha = 0

		for(var i = 0; i < this.slices; i++){
			let z = stackLen;

			let point1 = [Math.cos(alpha), Math.sin(alpha), 0];
			let point2 = [Math.cos(alpha + ang), Math.sin(alpha + ang), 0];
			this.vertices.push(...point1, ...point2);
			nVertices += 2;
			let point3 = [Math.cos(alpha), Math.sin(alpha), stackLen]; //temporary for normal calculation

			let a = point2.map((val, index) => val - point1[index]);
			let b = point3.map((val, index) => val - point1[index]);

			let normal = [a[1]*b[2] - a[2]*b[1], a[2]*b[0] - a[0]*b[2], a[0]*b[1] - a[1]*b[0]];
			let normalLen = Math.sqrt(normal[0]**2 + normal[1]**2 + normal[2]**2);
			normal = normal.map((val,_) => val / normalLen);

			this.normals.push(...normal, ...normal);

			for(var j = 0; j < this.stacks; j++){
				let point3 = [Math.cos(alpha), Math.sin(alpha), z];
				let point4 = [Math.cos(alpha + ang), Math.sin(alpha + ang), z];
	
				this.vertices.push(...point3, ...point4);
				nVertices += 2;
	
				this.indices.push(nVertices-4, nVertices-3, nVertices-1, nVertices-4, nVertices-1, nVertices-2);
				this.normals.push(...normal, ...normal);

				point1 = point3, point2 = point4;
				z += stackLen;
			}
			alpha += ang;
		}

		console.log(this.vertices);


		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}