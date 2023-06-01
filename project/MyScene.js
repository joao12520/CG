import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";
import { MySphere } from "./MySphere.js";
import { MyHalfSphere } from "./MyHalfSphere.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyTerrain } from "./MyTerrain.js";
import { MyBird } from "./MyBird.js";
import { MyEgg } from "./MyEgg.js";
import { MyNest } from "./MyNest.js";
import { MyBillboard } from "./MyBillboard.js";
import { MyTreeGroupPatch } from "./MyTreeGroupPatch.js";
import { MyTreeRowPatch } from "./MyTreeRowPatch.js";
import { MyInterface } from './MyInterface.js';

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }
  init(application) {
    super.init(application);

    this.interface = new MyInterface();
    this.gui = this.interface.gui; // para obter a referência ao GUI
    
    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);
    

    //Objects connected to MyInterface
    this.displayAxis = false;
    this.scaleFactor = 1;
    this.displayNormals = false;
    this.speedFactor = 1;

    this.enableTextures(true);

    this.earthTexture = new CGFtexture(this, "textures/earth.jpg");
    this.panoramaTexture = new CGFtexture(this, "images/panorama4.jpg");

    this.appearance = new CGFappearance(this);
    this.appearance.setTexture(this.texture);
    //this.appearance.setTexture(this.panoramaTexture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');

    this.earthAppearance = new CGFappearance(this);
    this.earthAppearance.setTexture(this.earthTexture);
    this.earthAppearance.setTextureWrap('REPEAT', 'REPEAT');
    this.earthAppearance.setAmbient(3,3,3,0);


    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.terrain = new MyTerrain(this);
    this.sphere = new MySphere(this,20,20);
    this.panorama = new MyPanorama(this,200,25,25,this.panoramaTexture);
    this.bird = new MyBird(this);
    this.egg1 = new MyEgg(this);
    this.egg2 = new MyEgg(this);
    this.egg3 = new MyEgg(this);
    this.egg4 = new MyEgg(this);
    this.eggs = [this.egg1, this.egg2, this.egg3, this.egg4];
    this.droppedEgg = null;
    this.displayEggs = [true, true, true, true];
    this.eggPositions = [[-70, -45.15, -20], [80, -45.15, 0], [-25, -45.15, -70], [0, -45.15, 50]];
    this.nest = new MyNest(this, 20, 20)
    this.billboard = new MyBillboard(this, 2, 0, 2, 3, 1);
    this.treeGroupPatch1 = new MyTreeGroupPatch(this, -90, -45.15, -20, 16, 6, 8);
    this.treeGroupPatch2 = new MyTreeGroupPatch(this, 60, -45.15, 20, 16, 6, 8);
    this.treeGroupPatch3 = new MyTreeGroupPatch(this, -25, -45.15, 40, 16, 6, 8);
    this.treeRowPatch = new MyTreeRowPatch(this, 75, -45.15, -45, 12, 4, 8);
    this.trees = [this.treeGroupPatch1, this.treeGroupPatch2, this.treeGroupPatch3, this.treeRowPatch];

    this.objects = [];

    //Shaders
    this.shaders = {};

    //Speed, angle
    this.ACCELERATION = 0.025;
    this.CURVATURE = 0.06;

    // Reset
    this.reset();

    this.setUpdatePeriod(25);

  }

  initLights() {
    this.lights[0].setPosition(15, 0, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      1.25,
      0.1,
      1000,
      vec3.fromValues(50, 10, 15),
      vec3.fromValues(0, 0, 0)
    );
  }
  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }

  reset(){
    this.bird.reset();
    this.speedFactor = 1;
    this.scaleFactor = 1;
  }

  update(t) {
    this.checkKeys(t);
    super.update(t);
    this.bird.update(t);
    this.eggs.forEach((egg) => egg.update(t));
    this.checkCollisions();
  }

  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    if (this.displayAxis) this.axis.display();

    // Display normals
    if (this.displayNormals)
      this.objects.forEach((o) => o.enableNormalViz())
    else
      this.objects.forEach((o) => o.disableNormalViz())


    // ---- BEGIN Primitive drawing section

    this.nest.display();

    this.pushMatrix();
    this.translate(...this.bird.getPos());
    this.panorama.display(); 
    this.popMatrix();
    
    this.terrain.display();

    this.eggs.forEach((egg, i) => {
      if(this.displayEggs[i]){
       this.pushMatrix();
       this.translate(...this.eggPositions[i]);
       egg.display();
       this.popMatrix();
      }
   });

    if(this.droppedEgg != null){    
      this.pushMatrix();
      this.translate(...this.droppedEgg.position);
      this.droppedEgg.display();
      this.popMatrix();
    }

   this.trees.forEach((tree) => {
     this.pushMatrix();
     tree.display();
     this.popMatrix();
   });

    this.bird.display();
    this.updateCamera();

   this.setActiveShader(this.defaultShader);
    
    // ---- END Primitive drawing section
  }
  
  checkKeys(t) {
    if (this.gui.isKeyPressed("KeyW")) {
      this.bird.accelerate(this.ACCELERATION);
    }
  
    if (this.gui.isKeyPressed("KeyS")) {
      this.bird.accelerate(-this.ACCELERATION);
    }
  
    if (this.gui.isKeyPressed("KeyA")) {
      this.bird.turn(this.CURVATURE);
    }
  
    if (this.gui.isKeyPressed("KeyD")) {
      this.bird.turn(-this.CURVATURE);
    }

    if (this.gui.isKeyPressed("KeyP")) {
      this.bird.dive();
    }

    if (this.gui.isKeyPressed("KeyO")) {
      this.bird.dropEgg(t);
    }
  
    // Reset
    if (this.gui.isKeyPressed("KeyR")) {
      this.reset();
    }
  }     

  updateCamera() {
    const birdPos = this.bird.getPos();
    const dist = 20;
    const angle = this.bird.getOrientation();
    const dirVector = vec3.fromValues(Math.sin(Math.PI/2 - angle), -Math.PI / 5, Math.cos(Math.PI/2 + angle));
    const cameraPos = vec3.subtract(vec3.create(), birdPos, vec3.scale(vec3.create(), dirVector, dist * this.scaleFactor));
  
    this.camera.setPosition(cameraPos);
    this.camera.setTarget(birdPos);
  }

  checkCollisions(){
    for(let i = 0; i < this.eggs.length; i++){
      const egg = this.eggs[i];
      if(!this.nest.containsEgg(egg) && !egg.isFalling){
        if(this.checkCollision(this.eggPositions[i], this.bird.getPos())){
          this.bird.addEgg(egg);
        }
      }
    }

    if(this.droppedEgg != null){
      if(this.checkCollision(this.droppedEgg.position, this.nest.getPos())){
        this.nest.addEgg(this.droppedEgg);
        this.droppedEgg = null;
      }
    }
  }

  checkCollision(pos1, pos2) {
    const collisionThreshold = 4.25;
  
    const distance = Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) +
      Math.pow(pos1[1] - pos2[1], 2) +
      Math.pow(pos1[2] - pos2[2], 2)
    );

    return distance < collisionThreshold;
  }
}
