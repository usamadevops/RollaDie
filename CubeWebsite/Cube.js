var cube = document.getElementById('cube');
var value = document.getElementById('Count');
var number;
var counter;
var min = 1;
var max = 24;
var sideCounts = [0, 0, 0, 0, 0, 0];

var i = 0;
var txt = 'Times Rolled';
var speed = 150;

function typeWriter() {
  if (i < txt.length) {
    document.getElementById("timesText").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}

function Totalincrement() {
  number = parseInt(value.innerText);
  counter = number + 1
  var value1 = counter++
  value.innerText = value1
}

function getSideFromRotation(x, y) {
  const facesRotations = [
    { x: 0, y: 0 },
    { x: 180, y: 0 },
    { x: 90, y: 0 },
    { x: 270, y: 0 },
    { x: 0, y: 90 },
    { x: 0, y: 270 },
  ];

  const normalizedRotation = {
    x: ((x % 360) + 360) % 360,
    y: ((y % 360) + 360) % 360,
};

const faceIndex = facesRotations.findIndex(
  (rotation) =>
    rotation.x === normalizedRotation.x && rotation.y === normalizedRotation.y
);

return faceIndex + 1;
}

function updateSideCounts(side) {
sideCounts[side - 1]++;
displaySideCounts();
}

function displaySideCounts() {
var sideCountsContainer = document.getElementById('sideCounts');
sideCountsContainer.innerHTML = '';

sideCounts.forEach(function (count, index) {
  var sideCountDiv = document.createElement('div');
  sideCountDiv.innerHTML = `Side ${index + 1}: ${count}`;
  sideCountsContainer.appendChild(sideCountDiv);
});
}

cube.onclick = function() {
var xRand = getRandom(max, min);
var yRand = getRandom(max, min);
cube.style = 'rotateX('+xRand+'deg) rotateY('+yRand+'deg)';
cube.style.transform = 'rotateX('+xRand+'deg) rotateY('+yRand+'deg)';
Totalincrement();
typeWriter();

var side = getSideFromRotation(xRand, yRand);
updateSideCounts(side);
}

function getRandom(max, min) {
return (Math.floor(Math.random() * (max-min)) + min) * 90;
}

//This is a function which will Drag an Element
dragElement(cube);


function dragElement(elmnt)
{
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (elmnt) {
    // if present, the header is where you move the DIV from:
    elmnt.onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }
  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:

    document.onmousemove = null;
  }
}

document.addEventListener('DOMContentLoaded', function() {
  displaySideCounts();
});