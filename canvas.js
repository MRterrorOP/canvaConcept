var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");

class Circle {
  constructor(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
  }

  draw() {
    c.beginPath();
    console.log("draw is called");
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.strokeStyle = "lightgreen";
    c.stroke();
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
      console.log("reversing speed");
    }
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
      console.log("reversing speed");
    }
    this.draw();
  }
}
circlesArray = [];
for (let i = 0; i < 100; i++) {
  let radius = 30;
  let x = Math.random() * innerWidth;
  let y = Math.random() * innerHeight;
  let dx = (Math.random() - 0.5) * 4;
  let dy = (Math.random() - 0.5) * 4;
  const circle = new Circle(x, y, dx, dy, radius);
  circlesArray.push(circle);
}
console.log(circlesArray);

function animate() {
  requestAnimationFrame(animate);
  let gradient = c.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, "lightblue");
  gradient.addColorStop(1, "black");

  // Use the gradient as the fill style
  c.fillStyle = gradient;
  c.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < circlesArray.length; i++) {
    circlesArray[i].update();
  }
}
animate();
