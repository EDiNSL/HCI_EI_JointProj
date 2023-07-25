const spinningImage = document.getElementById('spinning-image');
const dial = document.getElementById('dialButton');
const dialBar = document.getElementById('pie');
const indicator = document.getElementById('greenIndicator');
const key = document.getElementById('key');
const mask = document.getElementById('mask');
const resetButton = document.getElementById('resetButton');

let currentAngle = 0;
let previousFunctionalAngle = 0;
let functionalAngle = 0;

let snapThres = 10;

let validSpin = false;

let dialIsOn = false;

let keyIsIn = false;

let mouseKeyDist = 0;

let maxAngle = 90;

const circle = new CircularProgressBar("pie");
circle.initial();

let options = {
  index: 1,
  percent: currentAngle,
};

circle.animationTo(options);

function angleLimit(){
  if (currentAngle>maxAngle){
    if (previousFunctionalAngle == 0){
      functionalAngle = 0;
    } else if (previousFunctionalAngle == maxAngle){
      functionalAngle = maxAngle;
    }
  } else {
    if (previousFunctionalAngle == maxAngle){
      if (previousFunctionalAngle - currentAngle >snapThres){
        functionalAngle = maxAngle;
      } else {
        functionalAngle  = currentAngle;
      }
    } else if (previousFunctionalAngle == 0){
      if (currentAngle>snapThres){
        functionalAngle = 0;
      } else {
        functionalAngle  = currentAngle;
      }
    } else {
      functionalAngle  = currentAngle;
    }
    
  }
  previousFunctionalAngle = functionalAngle;
}



// Function to calculate the angle between the mouse and the center of the image

function dialAngle(a){
  dial.style.transform = `rotate(${a}deg)`;
  num = functionalAngle/360*100
  options = {
    index: 1,
    percent: num,
  };
  circle.animationTo(options);
}

function keyholeAngle(a){
  spinningImage.style.transform = `rotate(${a}deg)`;
}

function calculateAngle(mouseX, mouseY, obj) {

  const boundingRect = obj.getBoundingClientRect();
  const center_x = boundingRect.left + boundingRect.width / 2;
  const center_y = boundingRect.top + boundingRect.height / 2;

  const radians = Math.atan2(mouseX - center_x, mouseY - center_y);
  const degree = radians * (180 / Math.PI) * -1 +180;

  currentAngle = Math.round(degree);
  angleLimit();
}

function reset(){
  currentAngle = 0;
  previousFunctionalAngle = 0;
  functionalAngle = 0;
  dialAngle(functionalAngle);
  keyholeAngle(functionalAngle);

}

function resetFull(){
  currentAngle = 0;
  previousFunctionalAngle = 0;
  functionalAngle = 0;
  dialAngle(functionalAngle);
  keyholeAngle(functionalAngle);

  key.style.display = 'inherit';
  mask.style.display = 'inherit';
  dial.style.display = 'none';
  dialBar.style.display = 'none';

  validSpin = false;

  dialIsOn = false;

  keyIsIn = false;

  mouseKeyDist = 0;

  key.style.left = '80%';

  dial.style.backgroundColor = '#cc0000';
  indicator.style.backgroundColor = '#ffffff';

  spinningImage.style.backgroundColor = '#ffffff'
}

resetButton.onclick = function(event){
  resetFull();
};

spinningImage.ondragstart = function() {
  return false;
};

dial.ondragstart = function() {
  return false;
};

key.ondragstart = function() {
  return false;
};

function spin(event){
  calculateAngle(event.touches[0].clientX, event.touches[0].clientY, spinningImage);
  dialAngle(functionalAngle);
  keyholeAngle(functionalAngle);

  if (functionalAngle>maxAngle-2){
    
    dialIsOn = true;
    window.removeEventListener('touchmove', spin);
    spinningImage.onmouseup = null;
    console.log("y");

    dial.style.backgroundColor = '#008000';
    indicator.style.backgroundColor = '#008000';
  }
  
}

function moveKey(event){

  console.log('touchmove registered');

  const boundingRect = key.getBoundingClientRect();
  const keyholeboundingRect = mask.getBoundingClientRect();
  const keyholeTarget = keyholeboundingRect.left;
  const center_x = boundingRect.left + boundingRect.width / 2;
  const center_y = boundingRect.top + boundingRect.height / 2;

  let mouseX = event.touches[0].clientX;

  let pos = mouseX - mouseKeyDist;

  if (pos - boundingRect.width/2<keyholeTarget){
    keyIsIn = true;
    key.style.display = 'none';
    mask.style.display = 'none';
    spinningImage.style.display = 'inherit';
    dial.style.display = 'inherit';
    dialBar.style.display = 'inherit';
    spinningImage.style.backgroundColor = '#DE9300'
  }
  key.style.left = mouseX - mouseKeyDist + "px";


}

dial.ontouchstart = function(event){

  if (dialIsOn == false){
    window.addEventListener('touchmove', spin);
    console.log("yeet2");
  }
  

};

key.ontouchstart = function(event){

    const boundingRect = key.getBoundingClientRect();
    const center_x = boundingRect.left + boundingRect.width / 2;

    mouseKeyDist =  event.touches[0].clientX - center_x;

    console.log('touchstart registered');
    window.addEventListener('touchmove', moveKey);
  

};

window.ontouchend = function(event) {
  if (dialIsOn == false){
  window.removeEventListener('touchmove', spin);
  console.log("yeet");
  spinningImage.onmouseup = null;
  reset();
  }

  window.removeEventListener('touchmove', moveKey);
  key.onmouseup = null;
};


dial.addEventListener("touchstart", function(event){

  if (dialIsOn == false){
    window.addEventListener('touchmove', spin);
    console.log("yeet2");
  }
  

});

key.addEventListener("touchstart", function(event){

  const boundingRect = key.getBoundingClientRect();
  const center_x = boundingRect.left + boundingRect.width / 2;

  mouseKeyDist =  event.touches[0].clientX - center_x;

  console.log('touchstart registered');
  window.addEventListener('touchmove', moveKey);


});

window.addEventListener("touchend", function(event) {
  if (dialIsOn == false){
  window.removeEventListener('touchmove', spin);
  console.log("yeet");
  spinningImage.onmouseup = null;
  reset();
  }

  window.removeEventListener('touchmove', moveKey);
  key.onmouseup = null;
});

