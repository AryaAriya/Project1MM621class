let leaves = [];//array to store the leaves
let numleaves = 60;//number of leaves to be displayed
let leftPumpkin = [
  '#ff7900',
  '#D99058',
  '#D44500',
  '#E1A95F',
  '#E97451'
];
let pumpkinLeftIndex = 0;//tracks which color from array is currently being used
let rightPumpkin = [
  '#fff8dc',
  '#CD5700',
  '#FF9966',
  '#DA9100',
  '#B87333'
];
let pumpkinRightIndex = 0;//tracks which color from array is currently being used

function setup() {
  createCanvas(500, 500);

  for(let i = 0; i < numleaves; i++){//push new leaf into leaves array
    leaves.push(new leaf());
  }
}  

function draw() {
  background(151, 186, 241);

  //grass
  noStroke();
  fill(116, 142, 84);
  rect(0, 370, 500, 200);

  //city skyline
  fill(100, 125, 165);
  rect(0, 140, 50, 220);
  rect(70, 160, 40, 200);
  rect(120, 200, 80, 120);
  rect(100, 215, 80, 120);
  rect(170, 250, 80, 120);
  rect(230, 140, 50, 120);
  rect(270, 245, 50, 20);
  rect(310, 160, 80, 110);
  rect(380, 215, 50, 30);
  rect(450, 140, 40, 120);
  
  fill(120, 145, 185);
  rect(0, 280, 20, 90);
  rect(10, 220, 45, 150);
  rect(80, 315, 90, 55);
  rect(40, 190, 55, 180);
  rect(120, 270, 90, 100);
  rect(120, 240, 50, 130);
  rect(210, 200, 60, 170)
  rect(240, 240, 50, 130);
  rect(270, 250, 110, 100);
  rect(380, 240, 50, 130);
  rect(300, 180, 50, 80)
  rect(420, 180, 55, 190);
  rect(450, 210, 55, 160);
   
  //bushes
  noStroke();
  fill(79, 121, 66);
  ellipse(0, 350, 80, 66.7);       
  ellipse(-23.3, 356.7, 53.3, 53.3);  
  ellipse(23.3, 356.7, 53.3, 53.3);  
  ellipse(0, 336.7, 46.300, 53.3);

  ellipse(130, 350, 80, 66.7);       
  ellipse(106.7, 356.7, 53.3, 53.3);  
  ellipse(153.3, 356.7, 53.3, 53.3);  
  ellipse(130, 336.7, 46.7, 40);

  ellipse(260, 350, 80, 66.7);       
  ellipse(236.7, 356.7, 53.3, 53.3);  
  ellipse(283.3, 356.7, 53.3, 53.3);  
  ellipse(260, 336.7, 46.7, 40);

  ellipse(390, 350, 80, 66.7);       
  ellipse(366.7, 356.7, 53.3, 53.3);  
  ellipse(413.3, 356.7, 53.3, 53.3);  
  ellipse(390, 336.7, 46.7, 40);

  ellipse(520, 350, 80, 66.7);       
  ellipse(496.7, 356.7, 53.3, 53.3);  
  ellipse(543.3, 356.7, 53.3, 53.3);  
  ellipse(520, 336.7, 46.7, 40);

  //giant tree
  push();//save current transformation state
  translate(410, 410);//coordinates
  drawGiantTree(175, 20);//branches
  pop();//restore transformation state
  
  //bench
  fill(80);
  rect(300, 350, 20, 80);

  fill(136, 118, 94)
  rect(275, 350, 300, 20)

  fill(136, 118, 94)
  rect(275, 290, 300, 20)

  fill(136, 118, 94)
  rect(275, 260, 300, 20)

  fill(136, 118, 94)
  rect(275, 320, 300, 20)

  fill(80);
  rect(300, 260, 15, 95);

  //one pumpkin and one jack-o-lantern on the bench
  fill(leftPumpkin[pumpkinLeftIndex]);
  stroke(0, 100);
  strokeWeight(2);

  ellipse(370, 325, 100, 50);
  ellipse(370, 325, 80, 50);
  ellipse(370, 325, 60, 50);
  ellipse(370, 325, 30, 50);

  fill(rightPumpkin[pumpkinRightIndex]);
  stroke(0, 100);
  strokeWeight(2);

  ellipse(465, 300, 80, 100);
  ellipse(465, 300, 60, 100);
  ellipse(465, 300, 40, 100);
  ellipse(465, 300, 20, 100);

  stroke(75, 103, 81);
  strokeWeight(10);
  line(370, 300, 350, 284.38);

  stroke(141, 112, 82);
  strokeWeight(10);
  line(465, 250, 455, 230);
  
  fill(0, 0, 0);
  noStroke();
  triangle(369.92, 318, 361.17, 333, 378.42, 333);

  fill(0, 0, 0);
  noStroke();
  triangle(339.92, 308, 331.17, 323, 348.42, 323);

  fill(0, 0, 0);
  noStroke();
  triangle(394.92, 308, 386.17, 323, 403.42, 323);

  fill(0, 0, 0);
  noStroke();
  arc(370, 337, 75, 20, radians(0), radians(180));

  noStroke();
  fill(leftPumpkin[pumpkinLeftIndex]);
  rect(347, 335, 6, 6);

  noStroke();
  fill(leftPumpkin[pumpkinLeftIndex]);
  rect(377, 343, 6, 6);

  //bench shadow
  noStroke();
  fill(0, 0, 0, 50);
  ellipse(480, 410, 300, 60, 128);
  
  for(let leaf of leaves){
    leaf.update();//update leaf
    leaf.display();//display leaf
  }
}

class leaf {
  constructor() {
    this.noiseOffset = random (1000);//unique starting point in Perlin noise space so each leaf sways independently
    this.reset();//initialize size, speed, color, and standard starting positions
    this.y = random(-height, 0);//overrides initial Y position only on creation so leaves start scattered across entire scene
  }

  reset(){//sets or resets the leaf's properties (at start or falls off-screen)
    this.x = random(width);//horizontal starting position across canvas width
    this.y = random(-20, -10);//positions leaf just above top edge of canvas so it smoothly transitions into view
    this.size = random(10, 25);//leaf size and diameter
    this.speed = random(1,3);//how fast leaf falls down
    this.color = color(random(150, 220), random(80, 150), 20);//autumn color pallette 
  }

  update() {//updates leaf for current frame
    this.y += this.speed;//moves leaf downwards based on its specific falling speed
    let sway = noise(frameCount * 0.01 + this.noiseOffset);//sway value using Perlin noise based on time and leaf's unique offset
    this.x += map(sway, 0, 1, -2, 2);//maps the 0-to-1 noise value to horizontal drift
    //checks if leaf has completely traveled past bottom edge of canvas
    if (this.y > height + this.size) {
      this.reset();//infinite loop of falling leaves
    }
  }

  display(){
  push();//save current transformation state
  translate(this.x, this.y);//move origin point directly to leaf's location
  fill(this.color);//use leaf's randomized autumn color
  noStroke();
  rectMode(CENTER);//center drawing coordinates on rectangle
  rotate(QUARTER_PI);//rotate 45 degrees to tilt it like a diamond
  rect(0, 0, this.size, this.size, this.size, 0, this.size, 0);//create leaf 
  pop();//restore transformation state
 }
}

function drawGiantTree(len, weight){
  strokeWeight(weight);
  stroke(65, 35, 15);
  //draw branch line straight up from current origin
  line(0, 0, 0, -len);
  //move origin to tip of drawn branch
  translate(0, -len);

  //if branch is short enough, stop growing and add leaves
  if (len < 18) {
    drawFoliage();
  } else { //continue growing smaller branches 
    push();//save current transformation state (right branch)
    rotate(0.42);//tilt to right 
    drawGiantTree(len * 0.76, weight * 0.7);//recurse with a shorter length (76%) and thinner weight (70%)
    pop();//restore transformation state

    //left branch
    push();//save current transformation state
    rotate(-0.38);//tilt to left
    drawGiantTree(len * 0.73, weight * 0.7);//Recurse with a shorter length (73%) and thinner weight (70%)
    pop();//restore transformation state

    //middle branch
    if(len > 50) {
      push();//save current transformation state
      rotate(0.04);//slight tilt just off-center
      drawGiantTree(len * 0.65, weight * 0.65); //recurse with a shorter length (65%) and thinner weight (65%)
      pop();//restore transformation state
    }
  }
}

function drawFoliage(){
  noStroke();
  let colors = [
    color(175, 35, 15, 210),
    color(215, 85, 20, 210),
    color(230, 150, 25, 210),
    color(130, 75, 25, 190)
  ];

  for(let i = 0; i < 9; i ++){//cluster of 9 leaves
    let colorIndex = i % colors.length;//cycle through colors in array using modulo
    fill(colors[colorIndex]);

    //pseudo-random offset so leaves scatter naturally around tip
    let xOffset = (i * 8) % 36 - 18;//results in value btwn -18 & 17
    let yOffset = (i * 11) % 36 - 18;//results in value btwn -18 & 17     //varying widths and heights for leaves
    let leafWidth = (i * 3) % 14 + 16;//width vary between 16 and 29
    let leafHeight = leafWidth * 0.75;
    //individual leaf
    ellipse(xOffset, yOffset, leafWidth, leafHeight);
  }
}

function mousePressed() {
  if (mouseX > 320 && mouseX < 420 && mouseY > 300 && mouseY < 350) {//bounding box of left pumpkin
     pumpkinLeftIndex = floor(random(leftPumpkin.length));//pick random whole number index from leftPumpkin color array
  }
  
  if (mouseX > 425 && mouseX < 505 && mouseY > 250 && mouseY < 350) {//bounding box of right pumpkin
    pumpkinRightIndex = floor(random(rightPumpkin.length));//pick random whole number index from rightPumpkin color array
  }
}
