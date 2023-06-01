import { CGFobject } from "../lib/CGF.js";
import { MyQuad } from "./MyQuad.js";

export class MyUnitCubeQuad extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }
    initBuffers() {
        //INITIALIZING OBJECTS
        this.quad1 = new MyQuad(this.scene);    //bottom
        this.quad2 = new MyQuad(this.scene);    //top   
        this.quad3 = new MyQuad(this.scene);    //x+
        this.quad4 = new MyQuad(this.scene);    //x-
        this.quad5 = new MyQuad(this.scene);    //y+
        this.quad6 = new MyQuad(this.scene);    //y-
    }
    display() {
        this.scene.pushMatrix();
        this.scene.translate(0,-0.5,0);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.quad1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,0.5,0);
        this.quad2.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.5,0,0);
        this.scene.rotate(Math.PI/2, 0, 0, -1);
        this.quad3.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.5,0,0);
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.quad4.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.quad5.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,0,-0.5);
        this.scene.rotate(Math.PI/2, -1, 0, 0);
        this.quad6.display();
        this.scene.popMatrix();
    }
}