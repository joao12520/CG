import {CGFobject, CGFappearance, CGFtexture, CGFshader} from '../lib/CGF.js';
import { MyBillboard } from './MyBillboard.js';

export class MyTreeGroupPatch extends CGFobject {
    constructor(scene, x, y, z, height, width, spacing) {
      super(scene);
      this.position = [x, y, z];
      this.scene = scene;
      this.height = height;
      this.width = width;
      this.spacing = spacing;
      this.billboards = [];
      this.texture = new CGFtexture(scene, "textures/billboard1.png");
      this.appearance = new CGFappearance(this.scene);
      this.appearance.setTexture(this.texture);
      this.shader = new CGFshader(this.scene.gl, "shaders/billboard.vert", "shaders/billboard.frag");
  
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          const treeX = x + (i - 1) * spacing + Math.random() * spacing * 0.5;
          const treeZ = z + (j - 1) * spacing + Math.random() * spacing * 0.5;
          this.billboards.push(new MyBillboard(scene, treeX, y, treeZ, height, width));
        }
      }
    }

    display() {
      this.scene.pushMatrix();
      this.shader.setUniformsValues({uSampler: 1,});
      this.texture.bind(1);
      this.scene.setActiveShader(this.shader);
      this.appearance.apply();
      
      for (let i = 0; i < this.billboards.length; i++) {
        this.billboards[i].display();
      }

      this.scene.setActiveShader(this.scene.defaultShader);
      this.scene.popMatrix();
    }

    enableNormalViz() {
      for (let i = 0; i < this.billboards.length; i++) {
        this.billboards[i].enableNormalViz();
      }
    }

    disableNormalViz() {
      for (let i = 0; i < this.billboards.length; i++) {
        this.billboards[i].disableNormalViz();
      }
    }
}    