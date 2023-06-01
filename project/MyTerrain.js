import {CGFobject, CGFshader, CGFtexture} from '../lib/CGF.js';
import { MyPlane } from './MyPlane.js';

/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTerrain extends CGFobject {
	constructor(scene) {
	        super(scene);
                this.scene = scene;
                this.texture = new CGFtexture(scene, "images/terrain.jpg");
                this.altimetry = new CGFtexture(scene, "images/altimetry.png");
                this.heightmap = new CGFtexture(scene, "images/heightmap.png");
                this.shader = new CGFshader(this.scene.gl, "shaders/ground.vert", "shaders/ground.frag");
                this.plane = new MyPlane(this.scene, 30);
	}
	
	display() {
                this.shader.setUniformsValues({ uSampler1: 1 });
                this.shader.setUniformsValues({ uSampler2: 2 });
                this.shader.setUniformsValues({ uSampler3: 3 });
                this.texture.bind(1);
                this.altimetry.bind(2);
                this.heightmap.bind(3);

                this.scene.pushMatrix();
                this.scene.setActiveShader(this.shader);
                this.scene.translate(0,-100,0);
                this.scene.scale(400,1,400);
                this.scene.rotate(-Math.PI/2.0,1,0,0);
                this.plane.display();
                this.scene.setActiveShader(this.scene.defaultShader);
                this.scene.popMatrix();
	}
}
