import {CGFobject, CGFappearance, CGFtexture} from '../../lib/CGF.js';
import {MyCone} from './MyCone.js';
import { MySphere } from './MySphere.js';
import { MyLeftWing } from './MyLeftWing.js';
import { MyRightWing } from './MyRightWing.js';

/**
 * MyBird
 * @constructor
 * @param scene - Reference to MyScene object
 * @param orientation - Initial orientation of the bird (angle around the Y-axis)
 * @param position - Initial position of the bird (x, y, z)
 * @param deltaTime - Time elapsed since the last update
 * @param angle - Angle to rotate the bird (in radians)
 * @param value - Value to increase/decrease the speed
 */
export class MyBird extends CGFobject {
  constructor(scene, orientation, position) {
    super(scene);
    this.cone = new MyCone(scene, 10);
	this.body = new MySphere(scene, 15, 15);
	this.head = new MySphere(scene, 15, 15);
	this.leftWing = new MyLeftWing(scene);
	this.rightWing = new MyRightWing(scene);
	this.leftEye = new MySphere(scene, 15, 15);
	this.rightEye = new MySphere(scene, 15, 15);

	this.bodyTexture = new CGFtexture(scene, "images/feathers.jpg");
	this.featherAppearance = new CGFappearance(this.scene);
	this.featherAppearance.setTexture(this.bodyTexture);
	this.featherAppearance.setAmbient(0.3, 0.3, 0.3, 1);
	this.featherAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
	this.featherAppearance.setSpecular(0.0, 0.0, 0.0, 1);

	this.eyeTexture = new CGFtexture(scene, "images/eye.jpg");
	this.eyeAppearance = new CGFappearance(this.scene);
	this.eyeAppearance.setTexture(this.eyeTexture);
	this.eyeAppearance.setAmbient(1, 1, 1, 1);
	this.eyeAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
	this.eyeAppearance.setSpecular(0.0, 0.0, 0.0, 1);

	this.beakAppearance = new CGFappearance(this.scene);
	this.beakAppearance.setAmbient(1.0, 0.7, 0.0, 1); 
	this.beakAppearance.setDiffuse(1.0, 0.7, 0.0, 1); 
	this.beakAppearance.setSpecular(0.0, 0.0, 0.0, 1);

	this.bodyAppearance = new CGFappearance(this.scene);
	this.bodyAppearance.setAmbient(0.2, 0.45, 0.8, 1);
	this.bodyAppearance.setDiffuse(0.2, 0.45, 0.8, 1);
	this.bodyAppearance.setSpecular(0.0, 0.0, 0.0, 1);

    // Variáveis de estado da ave
	this.egg = null;
	this.hasEgg	= false;
	this.isDiving = false;
    this.orientation = orientation;
    this.speed = 0;
    this.position = position;
	this.wingRotation = 0;
	
	this.upDownAnimPeriod = 15;
	this.upDownAnimInstant = 0;
	this.upDownAnimAmplitude = 0.06;
	this.wingsAnimPeriod = 15;
	this.wingsAnimInstant = 0;
	this.wingsAnimAmplitude = 0.15;
	this.diveAnimPeriod = 53;
	this.diveAnimInstant = 0;
	this.diveAnimAmplitude = 2.68;
  }

  addEgg(egg){
	if(this.hasEgg)
		return;

	this.hasEgg = true;
	this.egg = egg;
	this.scene.displayEggs[this.scene.eggs.indexOf(egg)] = false;
  }

  dropEgg(time){
	if(!this.hasEgg)
		return;

	console.log("Dropping egg");
	this.hasEgg = false;
	const eggPos = [this.position[0], this.position[1]-2, this.position[2]];
	const speedVec = [Math.sin(this.orientation + Math.PI/2) * this.speed, Math.sin((2*Math.PI * this.diveAnimInstant) / this.diveAnimPeriod) * this.diveAnimAmplitude, Math.cos(this.orientation + Math.PI/2) * this.speed];
	this.egg.drop(time, eggPos, speedVec);
	this.egg = null
  }

  turn(angle) {
    this.orientation += (angle * this.scene.speedFactor);
  }

  accelerate(value) {
    this.speed = Math.max(Math.min(this.speed + (value * this.scene.speedFactor), this.scene.speedFactor), 0);
  }

  reset() {
    this.position = vec3.fromValues(0, 0, 0);
    this.orientation = 0;
    this.speed = 0;
  }

  update() {
    // Atualizar a posição da ave com base na orientação e velocidade
    const deltaX = Math.sin(this.orientation + Math.PI/2) * this.speed;
    const deltaY = 0; // Não há movimento vertical
    const deltaZ = Math.cos(this.orientation + Math.PI/2) * this.speed;

    this.position[0] += deltaX;
    this.position[1] += deltaY;
    this.position[2] += deltaZ;
	this.updateAnims();
  }

  updateAnims() {
	const displacement = Math.sin((2 * Math.PI * this.upDownAnimInstant) / this.upDownAnimPeriod) * this.upDownAnimAmplitude;
	this.upDownAnimInstant++;
	this.position[1] += displacement;
  
	const wingsAnimPeriod = this.wingsAnimPeriod - ((this.wingsAnimPeriod / 2) * this.speed); // Adjust the period based on speed
	const wingsAngle = Math.sin((2 * Math.PI * this.wingsAnimInstant) / wingsAnimPeriod) * this.wingsAnimAmplitude;
	this.wingsAnimInstant++;
	this.wingRotation = wingsAngle;
  
	this.diveAnim();
  }
  

  dive(){
	this.isDiving = true;
  }

  diveAnim(){
	if(!this.isDiving)
		return;

	const displacement = Math.sin((2*Math.PI * this.diveAnimInstant) / this.diveAnimPeriod) * this.diveAnimAmplitude;
	this.diveAnimInstant++;
	this.position[1] -= displacement;

	if(this.diveAnimInstant == this.diveAnimPeriod){
		this.isDiving = false;
		this.diveAnimInstant = 0;
	}
  }

  getPos(){
	return this.position;
  }

  getOrientation(){
	return this.orientation;
  }

  getAccel(){
	return this.speed;
  }

  display() {
	//console.log(this.hasEgg);	
	//console.log(this.egg);	
    this.scene.pushMatrix();

    this.scene.translate(this.position[0], this.position[1], this.position[2]);
    this.scene.rotate(this.orientation, 0, 1, 0);
	this.scene.scale(4 * this.scene.scaleFactor, 4 * this.scene.scaleFactor, 4 * this.scene.scaleFactor);

	this.scene.pushMatrix();
	this.bodyAppearance.apply();
	this.scene.scale(0.8, 0.4, 0.4);
	this.body.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.bodyAppearance.apply();
	this.scene.translate(0.7, 0.4, 0);
	this.scene.scale(0.3, 0.3, 0.3);
	this.head.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.eyeAppearance.apply();
	this.scene.translate(0.95, 0.5, -0.115);
	this.scene.scale(0.0625, 0.0625, 0.0625);
	this.scene.rotate(Math.PI, 0, 1, 0);
	this.leftEye.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.eyeAppearance.apply();
	this.scene.translate(0.95, 0.5, 0.115);
	this.scene.scale(0.0625, 0.0625, 0.0625);
	this.scene.rotate(Math.PI, 0, 1, 0);
	this.rightEye.display();
	this.scene.popMatrix();


	this.scene.pushMatrix();
	this.beakAppearance.apply();
	this.scene.translate(0.9, 0.35, 0);
	this.scene.rotate(-Math.PI/2, 0, 0, 1);
	this.scene.scale(0.09, 0.4, 0.15);
	this.cone.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.featherAppearance.apply();
	this.scene.translate(0.2, 0.1, -0.65);
    this.scene.rotate(-Math.PI/2, 0, 0, 1);
    this.scene.rotate(Math.PI/2, 0, 1, 0);
	this.scene.rotate(-this.wingRotation, 0, 1, 0);
    this.scene.scale(0.5, 0.4, 0.4);
	this.leftWing.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.featherAppearance.apply();
	this.scene.translate(0.2, 0.1, 0.65);
	this.scene.rotate(-Math.PI/2, 1, 0, 0);
	this.scene.rotate(-Math.PI/2, 0, 0, 1);
	this.scene.rotate(this.wingRotation, 0, 1, 0);
    this.scene.scale(0.5, 0.4, 0.4);
	this.rightWing.display();
	this.scene.popMatrix();

	this.scene.popMatrix();

	if(this.hasEgg){
		this.scene.pushMatrix();
		this.scene.translate(this.position[0], this.position[1]-2, this.position[2]);
		this.egg.display();
		this.scene.popMatrix();
	}
}

  enableNormalViz() {
    this.cone.enableNormalViz();
    this.body.enableNormalViz();
    this.head.enableNormalViz();
    this.leftWing.enableNormalViz();
    this.rightWing.enableNormalViz();
  }

disableNormalViz() {
    this.cone.disableNormalViz();
    this.body.disableNormalViz();
    this.head.disableNormalViz();
    this.leftWing.disableNormalViz();
    this.rightWing.disableNormalViz();
  }
}
