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
        this.createMaterials();
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
    }

    createMaterials() {
        this.materials = [];
        
        //MATERIALS

        //RED
        this.scene.materialRed = new CGFappearance(this.scene);
        this.scene.materialRed.setAmbient(0.2, 0.0, 0.0, 1.0);
        this.scene.materialRed.setDiffuse(0.1, 0.0, 0.0, 1.0);
        this.scene.materialRed.setSpecular(1.0, 0.0, 0.0, 1.0);
        this.scene.materialRed.setShininess(10.0);

        //GREEN
        this.scene.materialGreen = new CGFappearance(this.scene);
        this.scene.materialGreen.setAmbient(0.0, 0.2, 0.0, 1.0);
        this.scene.materialGreen.setDiffuse(0.0, 0.1, 0.0, 1.0);
        this.scene.materialGreen.setSpecular(0.0, 1.0, 0.0, 1.0);
        this.scene.materialGreen.setShininess(10.0);

        //ORANGE
        this.scene.materialOrange = new CGFappearance(this.scene);
        this.scene.materialOrange.setAmbient(0.2, 0.1, 0.0, 1.0);
        this.scene.materialOrange.setDiffuse(0.1, 0.05, 0.0, 1.0);
        this.scene.materialOrange.setSpecular(1.0, 0.5, 0.0, 1.0);
        this.scene.materialOrange.setShininess(10.0);

        //YELLOW
        this.scene.materialYellow = new CGFappearance(this.scene);
        this.scene.materialYellow.setAmbient(0.2, 0.2, 0.0, 1.0);
        this.scene.materialYellow.setDiffuse(0.1, 0.1, 0.0, 1.0);
        this.scene.materialYellow.setSpecular(1.0, 1.0, 0.0, 1.0);
        this.scene.materialYellow.setShininess(10.0);

        //PINK
        this.scene.materialPink = new CGFappearance(this.scene);
        this.scene.materialPink.setAmbient(0.2, 0.08, 0.14, 1.0);
        this.scene.materialPink.setDiffuse(0.1, 0.04, 0.07, 1.0);
        this.scene.materialPink.setSpecular(1.0, 0.4, 0.7, 1.0);
        this.scene.materialPink.setShininess(10.0);

        //PURPLE
        this.scene.materialPurple = new CGFappearance(this.scene);
        this.scene.materialPurple.setAmbient(0.14, 0.02, 0.2, 1.0);
        this.scene.materialPurple.setDiffuse(0.07, 0.01, 0.1, 1.0);
        this.scene.materialPurple.setSpecular(0.7, 0.1, 1.0, 1.0);
        this.scene.materialPurple.setShininess(10.0);

        //BLUE
        this.scene.materialBlue = new CGFappearance(this.scene);
        this.scene.materialBlue.setAmbient(0.04, 0.08, 0.16, 1.0);
        this.scene.materialBlue.setDiffuse(0.02, 0.04, 0.08, 1.0);
        this.scene.materialBlue.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.scene.materialBlue.setShininess(10.0);

        this.materials = [this.scene.materialGreen, this.scene.materialPink, this.scene.materialYellow, this.scene.materialPurple, this.scene.materialRed, this.scene.materialBlue, this.scene.materialOrange];
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
        this.scene.customMaterial.apply();
        this.diamond.display();
        this.scene.popMatrix();

        //Triangle Big Blue
        this.scene.pushMatrix();
        this.scene.translate(0, -2, 0);
        this.materials[5].apply();
        this.triangleBig1.display();
        this.scene.popMatrix();

        //Triangle Big Orange
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.scene.translate(-2, 0, 0);
        this.materials[6].apply();
        this.triangleBig2.display();
        this.scene.popMatrix();

        //Triangle Small Purple
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.scene.translate(1, 0, 0);
        this.materials[3].apply();
        this.triangleSmall.display();
        this.scene.popMatrix();

        //Triangle Red
        this.scene.pushMatrix();
        this.scene.translate(2.293, -0.293, 0);
        this.scene.scale(Math.sqrt(2)/2, Math.sqrt(2)/2, Math.sqrt(2)/2);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.materials[4].apply();
        this.triangle1.display();
        this.scene.popMatrix();

        //Parallelogram Yellow
        this.scene.pushMatrix();
        this.scene.translate(3, 0.413, 0);
        this.scene.rotate((3/4)*Math.PI, 0, 0, 1);
        this.materials[2].apply();
        this.parallelogram.display();
        this.scene.popMatrix();

        //Triangle Pink
        this.scene.pushMatrix();
        this.scene.translate(1.59, 1.825, 0);
        this.scene.rotate((1.25)*Math.PI, 0, 0, 1);
        this.materials[1].apply();
        this.triangle2.display();
        this.scene.popMatrix();
    }
}