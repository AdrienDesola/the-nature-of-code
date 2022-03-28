import P5 from "p5";

export class Agent {
  p5: P5;
  position: P5.Vector;
  _size: number = 16;
  _maxSpeed: number = 6;
  _maxForce: number = 0.4;
  color: any = 255;

  acceleration: P5.Vector;
  velocity: P5.Vector;

  constructor(p5: P5, position: P5.Vector, velocity: P5.Vector) {
    this.p5 = p5;
    this.position = position;
    this.acceleration = p5.createVector(1, 1);
    this.velocity = velocity;
  }

  seek(vector: P5.Vector, minSpeed = 0,  arrival = false) {
    let force = vector.copy()
      // desired
      .sub(this.position);
    let desiredSpeed = this._maxSpeed;
    if (arrival) {
      let slowRadius = 150;
      let distance = force.mag();
      if (distance < slowRadius) {
        desiredSpeed = this.p5.map(distance, 0, slowRadius, minSpeed, this._maxSpeed);
      }
    }
    force.setMag(desiredSpeed);
    force.sub(this.velocity);
    force.limit(this._maxForce);
    return force;
  }

  pursue(target: Agent, ahead = 10) {
    const targetNextPosition = target.position.copy().add(target.velocity.copy().mult(ahead));

    return this.seek(targetNextPosition, target._maxSpeed, true);
  }

  flee(vec: P5.Vector) {
    return this.seek(vec).mult(-1);
  }

  evade(target: Agent, ahead = 10) {
    return this.pursue(target, ahead).mult(-1);
  }

  applyForce(force: P5.Vector) {
    this.acceleration.add(force);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this._maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.set(0, 0);
  }

  draw() {
    this.p5.push();
    this.p5.stroke(this.color);
    this.p5.strokeWeight(2);
    this.p5.fill(this.color);
    this.p5.translate(this.position);
    this.p5.rotate(this.velocity.heading());
    this.p5.triangle(-this._size, -this._size/2, -this._size, this._size, this._size, this._size/2);
    this.p5.pop();
  }
}
