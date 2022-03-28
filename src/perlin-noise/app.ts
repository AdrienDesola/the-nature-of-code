import P5 from "p5";
import "p5/lib/addons/p5.dom";
// import "p5/lib/addons/p5.sound";	// Include if needed
import "../styles.scss";

// Creating the sketch itself
const width = 1000;
const height = 600;
const sketch = (p5: P5) => {

  // The sketch setup method
  p5.setup = () => {
    // Creating and positioning the canvas
    const canvas = p5.createCanvas(width, height);
    canvas.parent("app");

    // Configuring the canvas
    p5.background('#000000');
  };
  let time = 0;
  // The sketch draw method
  p5.draw = () => {
    const noisew = time * 100;
    const noiseh = p5.map(p5.noise(time), 0, 1, 0, height);
    // DEMO: Let the circle instances draw themselves
    p5.background('#000000');
    p5.color('#fff');
    p5.circle(noisew, noiseh, 10);
    time+= 0.01;
    console.count('tick');
  };
};

new P5(sketch);
