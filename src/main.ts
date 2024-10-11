import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My Web game";
document.title = gameName;

let flexCounter: number = 0;
let flexRate: number = 0;
//let currentTime: number = performance.timeOrigin + performance.now();
let lastUpdatedTime: number = 0;
let accumulator: number = 0;

//Button Section
const bigButton = document.createElement("button");
const bigButtonText = "Flex Check💪";

bigButton.innerHTML = bigButtonText;
app.append(bigButton);

const upgradeButton = document.createElement("button");
const upgradeButtonText = "Automatic Reps";

upgradeButton.innerHTML = upgradeButtonText;
app.append(upgradeButton);

upgradeButton.disabled = true;

const flexCounterDisplay = document.createElement("flexes");
let flexCounterText = "Flex Counter: " + flexCounter;

flexCounterDisplay.innerHTML = flexCounterText;
app.append(flexCounterDisplay);

function modifyCounterText() {
  flexCounter++;
  flexCounterText = "Flex Counter: " + flexCounter;
  flexCounterDisplay.innerHTML = flexCounterText;
  //app.append(flexCounterDisplay);
}

//setInterval(modifyCounterText, 1000);

function moveTime(timestamp: number){
  const deltaTime = timestamp - lastUpdatedTime;
  lastUpdatedTime = timestamp;

  accumulator += deltaTime;

  if(accumulator >= 1000 / flexRate && flexRate > 0){
    modifyCounterText();
    accumulator -= 1000 / flexRate;
  }

  if(flexCounter >= 10){
    upgradeButton.disabled = false;
  }
  if(flexCounter < 10){
    upgradeButton.disabled = true;
  }
  requestAnimationFrame(moveTime);
}

bigButton.addEventListener("click", () => {
  modifyCounterText();
  //console.log("button click " + flexCounterText);
});

upgradeButton.addEventListener("click", () => {
  flexCounter -= 10;
  flexRate++;
});

requestAnimationFrame(moveTime);
//Header Section
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);
