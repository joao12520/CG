import {CGFobject} from '../lib/CGF.js';
/**
 * MySphere
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MySphere extends CGFobject {
	constructor(scene, slices, stacks, inverted=false) {
		super(scene);
		this.slices = slices;
		this.stacks = stacks;
        this.inverted = inverted
		this.initBuffers();
	}
	
	initBuffers() {
        this.vertices = [];
    
        this.normals = [];
    
        // Counter-clockwise reference of vertices
        this.indices = [];
        this.texCoords = [];
    
        const dTheta = Math.PI / this.stacks;
        const dPhi = 2*Math.PI / this.slices;
        let theta = 0;
        let phi = 0;
    
        for (let i = 0; i <= this.stacks; i++) {
            for (let j = 0; j <= this.slices; j++) {
                const x = Math.cos(phi) * Math.sin(theta);
                const y = Math.cos(theta);
                const z = Math.sin(phi) * Math.sin(theta);
    
                this.vertices.push(x, y, z);

                if(!this.inverted)
                    this.normals.push(x, y, z);
                else
                    this.normals.push(-x, -y, -z);

                this.texCoords.push(1-(j / this.slices), (i / this.stacks));
                phi += dPhi;
            }
            theta += dTheta;
            phi = 0;
        }
    
        // Create the sphere indices
        const indices = [];
        for (let i = 0; i < this.stacks; i++) {
            for (let j = 0; j < this.slices; j++) {
                const a = i * (this.slices + 1) + j;
                const b = a + this.slices + 1;
    
                if(!this.inverted)
                    this.indices.push(a, a + 1, b, b, a + 1, b + 1);
                else
                    this.indices.push(a, b, a + 1, b, b + 1, a + 1);
            }
        }
        
        //The defined indices (and corresponding vertices)
        //will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;
    
        this.initGLBuffers();
    }
}


