import { CGFobject } from "../lib/CGF.js";
import { MyQuad } from "./MyQuad.js";

export class MyUnitCubeQuad extends CGFobject {
    constructor(scene, top, front, right, back, left, bottom) {
        super(scene);
        this.quad1Texture = top;
        this.quad2Texture = front;
        this.quad3Texture = right;
        this.quad4Texture = back;
        this.quad5Texture = left;
        this.quad6Texture = bottom;
        this.initBuffers();
    }
    initBuffers() {
        //INITIALIZING OBJECTS
        this.quad1 = new MyQuad(this.scene);
        this.quad2 = new MyQuad(this.scene);
        this.quad3 = new MyQuad(this.scene);
        this.quad4 = new MyQuad(this.scene);
        this.quad5 = new MyQuad(this.scene);
        this.quad6 = new MyQuad(this.scene);
    }
    display() {
        this.scene.pushMatrix();
        this.scene.translate(0.5,1,0.5);
        this.scene.rotate(Math.PI/2, -1, 0, 0);
        this.quad1Texture.bind();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.5,0.5,1);
        this.quad2Texture.bind();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad2.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1,0.5,0.5);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.quad3Texture.bind();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad3.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.5,0.5,0);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.quad4Texture.bind();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad4.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,0.5,0.5);
        this.scene.rotate(-Math.PI/2, 0, 1, 0);
        this.quad5Texture.bind();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad5.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.5,0,0.5);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.quad6Texture.bind();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad6.display();
        this.scene.popMatrix();
    }
}