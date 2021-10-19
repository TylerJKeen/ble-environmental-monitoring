/*

This is the drawing part; based on this example: https://editor.p5js.org/aferriss/sketches/S1UTHZBHm

*/

let numPts = 100;

let timems = [];
let OXppm = [];
let NOppm = [];
let COppm = [];
let NO2ppm = [];
let SO2ppm = [];
let H2Sppm = [];
let CO2ppm = [];
let CH4ppm = [];
let batterymV = [];
let U15C = [];
let U16C = [];
let U17C = [];
let CO2C = [];
let BMEC = [];
let BMEPa = [];
let BMEH = [];


function setup() { 
  canvas = createCanvas(windowWidth,windowHeight - 220);
  bleSetup();
}
//Whenever we get an linebreak, we take the current value, and add it to the array, while shifitng all of it's values one postition.
function handleLineBreak(value){
  valueint = float(value.split(", "));
  timems.unshift(valueint[0]);
  OXppm.unshift(valueint[1]);
  NOppm.unshift(valueint[2]);
  COppm.unshift(valueint[3]);
  NO2ppm.unshift(valueint[4]);
  SO2ppm.unshift(valueint[5]);
  H2Sppm.unshift(valueint[6]);
  CO2ppm.unshift(valueint[7]);
  CH4ppm.unshift(valueint[8]);
  batterymV.unshift(valueint[9]);
  U15C.unshift(valueint[10]);
  U16C.unshift(valueint[11]);
  U17C.unshift(valueint[12]);
  CO2C.unshift(valueint[13]);
  BMEC.unshift(valueint[14]);
  BMEPa.unshift(valueint[15]);
  BMEH.unshift(valueint[16]);
}

function draw() {
  
  background("#f5f6fa");
  drawLines("#C0392B", OXppm, 0, 300000);
  drawLines("#9B59B6", COppm, 0, 10);
  drawLines("#2980B9", CO2ppm, 0, 60000);
  drawLines("#1ABC9C", BMEC, 0, 35);
  drawLines("#27AE60", BMEPa, 101000, 102000);
  drawLines("#F1C40F", BMEH, 0, 100);
  
  drawLabel("#C0392B", OXppm, 15, "Oxygen (ppm): ", 0, 300000);
  drawLabel("#9B59B6", COppm, 30, "Carbon Monixide (ppm): ", 0, 10);
  drawLabel("#2980B9", CO2ppm, 45, "Carbon Dioxide (%): ", 0, 5);
  drawLabel("#1ABC9C", BMEC, 60, "Temperature (C): ", 0, 35);
  drawLabel("#27AE60", BMEPa, 75, "Pressure (Pa): ", 101000, 102000);
  drawLabel("#F1C40F", BMEH, 90, "Humidity (%): ", 0, 100);

}

//This is 'stolen' from https://editor.p5js.org/aferriss/sketches/S1UTHZBHm
function drawLines(colour, values, min, max){
  stroke(colour);
  strokeWeight(5);
 // draw lines
  let minimumval = 0;
  let maximumval = 0;
  if (!(values.length === 0)) {
    minimumval = Math.min(...values)
    maximumval = Math.max(...values)
    if (maximumval > max) {
      max = maximumval;
    }
    if (minimumval < min) {
      min = minimumval;
    }
  }
  
  for(let i =1; i < values.length; i++){
    let x = width - (i+1) * (width / (numPts-1));
    let px = width - i * (width / (numPts-1)); 
    let y = map(values[i], min, max,height,0)
    let py = map(values[i-1], min, max,height,0)
    line(px, py, x, y);
    

  } 
  
}

function drawLabel(colour, values, pos, labelText, min, max) {
  let minimumval = 0;
  let maximumval = 0;
  if (!(values.length === 0)) {
    minimumval = Math.min(...values)
    maximumval = Math.max(...values)
    if (maximumval > max) {
      max = maximumval;
    }
    if (minimumval < min) {
      min = minimumval;
    }
  }
  stroke("#f5f6fa");
  fill(colour)
  textAlign(RIGHT);
  if (!(values.length === 0)) {
    text(values[0], width-10, map(values[0], min, max,height,0))
  }
  textAlign(LEFT);
  text("Max " + labelText + maximumval,10,pos)
  textAlign(LEFT);
  text("Min " + labelText + minimumval,10,pos+110)
}