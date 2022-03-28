import P5 from "p5";
import "p5/lib/addons/p5.dom";
// import "p5/lib/addons/p5.sound";	// Include if needed
import "../styles.scss";

// DEMO: A sample class implementation
import { Agent } from "./Agent";

// Creating the sketch itself
const sketch = (p5: P5) => {
  // DEMO: Prepare an array of Agent.ts instances
  let pursuer: Agent;
  let target: Agent;

  // The sketch setup method
  p5.setup = () => {
    // Creating and positioning the canvas
    const canvas = p5.createCanvas(600, 600);
    canvas.parent("app");

    // Configuring the canvas
    p5.background('#00000025');

    pursuer = new Agent(p5, p5.createVector(100, 100),  p5.createVector(0, 0));
    pursuer._maxSpeed = pursuer._maxSpeed * 1.5;

    target = new Agent(p5, p5.createVector(100, 100),  p5.createVector(300, 100));
    target.seek(p5.createVector(300, 0));
    target.color = 'blue';
  };

  // The sketch draw method
  p5.draw = () => {
    p5.background(0);
    // DEMO: Let the circle instances draw themselves
    if (p5.mouseIsPressed) {
      target.position.set(p5.mouseX, p5.mouseY);
      target.velocity = p5.createVector(0, 0);
    }
    pursuer.applyForce(pursuer.pursue(target));
    pursuer.update();
    pursuer.draw();

    target.applyForce(p5.createVector(300, 0));
    target.update();
    target.draw();

    const dist = pursuer.position.dist(target.position);
    if (dist < (pursuer._size + target._size)) {
      target.position = p5.createVector(p5.random(0, p5.width), p5.random(0, p5.height));
      target.velocity = p5.createVector(0, 0);
      target.flee(pursuer.position);
    }
  };
};

new P5(sketch);
