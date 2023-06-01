import { CGFobject, CGFappearance } from "../lib/CGF.js";
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
import { MyParallelogram } from "./MyParallelogram.js";

export class MyTangram extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }
    initBuffers() {
        //INITIALIZING OBJECTS
        this.diamond = new MyDiamond(this.scene);
        this.triangle1 = new MyTriangle(this.scene);
        this.triangle2 = new MyTriangle(this.scene);
        this.parallelogram = new MyParallelogram(this.scene);
        this.triangleBig1 = new MyTriangleBig(this.scene);
        this.triangleBig2 = new MyTriangleBig(this.scene);
        this.triangleSmall = new MyTriangleSmall(this.scene);   
        
        this.material = new CGFappearance(this.scene);
        this.material.setAmbient(10, 10, 10, 10);
        this.material.setDiffuse(0.9, 0.9, 0.9, 1);
        this.material.setSpecular(0.1, 0.1, 0.1, 1);
        this.material.setShininess(10.0);
        this.material.loadTexture('images/tangram.png');
        this.material.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.diamond.updateTexCoords([
			0, 0.5,
			0.25, 0.25,
			0.25, 0.75,
			0.5, 0.5,
		]);

        this.triangleBig2.updateTexCoords(
            [
                1, 0,
                0.5, 0.5,
                1, 1,
            ]);

        this.triangleBig1.updateTexCoords(
            [
                0, 0,
                1, 0,
                0.5, 0.5,
            ]);
        
        this.triangleSmall.updateTexCoords(
            [   
                0.25, 0.25,
                0, 0.5,
            ]);

        this.parallelogram.updateTexCoords(
            [
                1, 1,
                0.75, 0.75,
                0.5, 1,
                0.25, 0.75,
            ]);

        this.triangle1.updateTexCoords(
            [
                0.5, 0.5,
                0.25, 0.75,
                0.75, 0.75,
                1, 1,               
            ]); 
            
        this.triangle2.updateTexCoords(
            [
                0, 0.5,
                0.5, 1,
                0, 1,
            ]);        
    }
    display() {
        var transl = [
            1.0, 0.0 , 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            2.0, -1.0, 0.0, 1.0,
          ];

        //Diamond Green
        this.scene.pushMatrix();
        this.scene.multMatrix(transl);
        this.material.apply();
        this.diamond.display();
        this.scene.popMatrix();

        //Triangle Big Blue
        this.scene.pushMatrix();
        this.scene.translate(0, -2, 0);
        this.triangleBig1.display();
        this.scene.popMatrix();

        //Triangle Big Orange
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.scene.translate(-2, 0, 0);
        this.material.apply();
        this.triangleBig2.display();
        this.scene.popMatrix();

        //Triangle Small Purple
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.scene.translate(1, 0, 0);
        this.triangleSmall.display();
        this.scene.popMatrix();

        //Triangle Red
        this.scene.pushMatrix();
        this.scene.translate(2.293, -0.293, 0);
        this.scene.scale(Math.sqrt(2)/2, Math.sqrt(2)/2, Math.sqrt(2)/2);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.triangle1.display();
        this.scene.popMatrix();

        //Parallelogram Yellow
        this.scene.pushMatrix();
        this.scene.translate(3, 0.413, 0);
        this.scene.rotate((3/4)*Math.PI, 0, 0, 1);
        this.parallelogram.display();
        this.scene.popMatrix();

        //Triangle Pink
        this.scene.pushMatrix();
        this.scene.translate(1.59, 1.825, 0);
        this.scene.rotate((1.25)*Math.PI, 0, 0, 1);
        this.triangle2.display();
        this.scene.popMatrix();
    }
}