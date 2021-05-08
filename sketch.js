/*

This is the drawing part; based on this example: https://editor.p5js.org/aferriss/sketches/S1UTHZBHm

*/

let graphValuesBattVolt = [];
let graphValuesTemperature = [];
let graphValuesHumidity = [];
let graphValuesPressure = [];
let graphValuesVOC = [];
let graphValuesGas = [];
let numPts = 100;

function setup() { 
  canvas = createCanvas(windowWidth,windowHeight - 220);
  bleSetup();
}
//Whenever we get an linebreak, we take the current value, and add it to the array, while shifitng all of it's values one postition.
function handleLineBreak(value){
  valueint = float(value.split(", "));
  graphValuesBattVolt.unshift(valueint[0]); 
  graphValuesTemperature.unshift(valueint[1]); 
  graphValuesHumidity.unshift(valueint[2]); 
  graphValuesPressure.unshift(valueint[3]); 
  graphValuesVOC.unshift(valueint[4]); 
  graphValuesGas.unshift(valueint[5]); 
}

function draw() {
  
  background("#f5f6fa");
  drawLines("#C0392B", graphValuesBattVolt, 0, 5);
  drawLines("#9B59B6", graphValuesTemperature, 10, 45);
  drawLines("#2980B9", graphValuesHumidity, 0, 100);
  drawLines("#1ABC9C", graphValuesPressure, 1010, 1020);
  drawLines("#27AE60", graphValuesVOC, 0, 1000);
  drawLines("#F1C40F", graphValuesGas, 0, 5);
  drawLabel("#C0392B", graphValuesBattVolt, 15, "Battery Voltage(V): ", 0, 5);
  drawLabel("#9B59B6", graphValuesTemperature, 30, "Temerature(C): ", 10, 45);
  drawLabel("#2980B9", graphValuesHumidity, 45, "Humidity(%): ", 0, 100);
  drawLabel("#1ABC9C", graphValuesPressure, 60, "Pressure(hPa): ", 1010, 1020);
  drawLabel("#27AE60", graphValuesVOC, 75, "VOC(ppm): ", 0, 1000);
  drawLabel("#F1C40F", graphValuesGas, 90, "Gas(V): ", 0, 5);

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