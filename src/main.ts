import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My Web game";
document.title = gameName;

let flexCounter: number = 0;
//let currentTime: number = performance.timeOrigin + performance.now();
let lastUpdatedTime: number;

//Button Section
const bigButton = document.createElement("button");
const bigButtonText = "Flex Check💪";

bigButton.innerHTML = bigButtonText;
app.append(bigButton);

const flexCounterDisplay = document.createElement("flexes");
let flexCounterText = "Flex Counter: " + flexCounter;

flexCounterDisplay.innerHTML = flexCounterText;
app.append(flexCounterDisplay);

function modifyCounterText() {
  flexCounter++;
  flexCounterText = "Flex Counter: " + flexCounter;

  flexCounterDisplay.innerHTML = flexCounterText;
  app.append(flexCounterDisplay);
}

//setInterval(modifyCounterText, 1000);

function moveTime(timestamp: number){
  if(lastUpdatedTime === undefined){
    lastUpdatedTime = timestamp;
  }
  if(timestamp - lastUpdatedTime >= 1000){
    lastUpdatedTime = timestamp;
    console.log("I am inside the if statement");
    modifyCounterText();
  }
  //currentTime = performance.timeOrigin + performance.now();
  //console.log("Current difference is: " + (timestamp - lastUpdatedTime));
  requestAnimationFrame(moveTime);
}

bigButton.addEventListener("click", () => {
  modifyCounterText();
  //console.log("button click " + flexCounterText);
});

requestAnimationFrame(moveTime);
//Header Section
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);
