import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My Web game";
document.title = gameName;

let flexCounter: number = 0.0;
let flexRate: number = 0.0;
//let currentTime: number = performance.timeOrigin + performance.now();
let lastUpdatedTime: number = 0;
let accumulator: number = 0;

let upgrade1Amount: number = 0;
let upgrade2Amount: number = 0;
let upgrade3Amount: number = 0;

//Test section
//const bottomHalf = document.createElement('div');
//bottomHalf.setAttribute("style", " max-width: 1280px; margin: 0 auto; text-align: left;");


//Button Section
const bigButton = document.createElement("button");
const bigButtonText = "Flex Check💪";

bigButton.innerHTML = bigButtonText;
app.append(bigButton);

//Upgrade Button 1
const upgradeButtonTier1 = document.createElement("button");
const upgradeButtonTier1Text = "Automatic Reps 1";

upgradeButtonTier1.innerHTML = upgradeButtonTier1Text;
app.append(upgradeButtonTier1);
upgradeButtonTier1.disabled = true;

//1st Button Counter
const upgradeButtonTier1Amount = document.createElement("flexes");
let upgradeButtonTier1TextAmount = "Automatic Reps 1 Amount: "+ upgrade1Amount;

upgradeButtonTier1Amount.innerHTML = upgradeButtonTier1TextAmount;
app.append(upgradeButtonTier1Amount);

//The Second Button
const upgradeButtonTier2 = document.createElement("button");
const upgradeButtonTier2Text = "Automatic Reps 2";

upgradeButtonTier2.innerHTML = upgradeButtonTier2Text;
app.append(upgradeButtonTier2);
upgradeButtonTier2.disabled = true;

//2nd Button Counter
const upgradeButtonTier2Amount = document.createElement("flexes");
let upgradeButtonTier2TextAmount = "Automatic Reps 2 Amount: "+ upgrade2Amount;

upgradeButtonTier2Amount.innerHTML = upgradeButtonTier2TextAmount;
app.append(upgradeButtonTier2Amount);

//The Third Button
const upgradeButtonTier3 = document.createElement("button");
const upgradeButtonTier3Text = "Automatic Reps 3";

upgradeButtonTier3.innerHTML = upgradeButtonTier3Text;
app.append(upgradeButtonTier3);
upgradeButtonTier3.disabled = true;

//3rd Button Counter
const upgradeButtonTier3Amount = document.createElement("flexes");
let upgradeButtonTier3TextAmount = "Automatic Reps 3 Amount: "+ upgrade3Amount;

upgradeButtonTier3Amount.innerHTML = upgradeButtonTier3TextAmount;
app.append(upgradeButtonTier3Amount);

//Flex Counter Display
const flexCounterDisplay = document.createElement("flexes");
let flexCounterText = "Flex Counter: " + flexCounter;

flexCounterDisplay.innerHTML = flexCounterText;
app.append(flexCounterDisplay);

//Upgrade Button 3 Text
function modifyUpgradeText(){
  upgradeButtonTier1TextAmount = "Automatic Reps 1 Amount: "+ upgrade1Amount;
  upgradeButtonTier1Amount.innerHTML = upgradeButtonTier1TextAmount;

  upgradeButtonTier2TextAmount = "Automatic Reps 2 Amount: "+ upgrade2Amount;
  upgradeButtonTier2Amount.innerHTML = upgradeButtonTier2TextAmount;

  upgradeButtonTier3TextAmount = "Automatic Reps 3 Amount: "+ upgrade3Amount;
  upgradeButtonTier3Amount.innerHTML = upgradeButtonTier3TextAmount;
}

//Counter Text Functions
function modifyCounterText() {
  flexCounterText = "Flex Counter: " + flexCounter;
  flexCounterDisplay.innerHTML = flexCounterText;
  //app.append(flexCounterDisplay);
}

function autoModifyCounter(rateAmount: number){
  flexCounter += rateAmount;
  flexCounter = Math.round(flexCounter * 10) / 10
  //console.log(flexCounter);
}

//Status Display
const statusDisplay = document.createElement("flexes");
let statusText = flexRate + " flexes per sec";

statusDisplay.innerHTML = statusText;
app.append(statusDisplay);

function statusTextDisplay(){
  flexRate = Math.round(flexRate * 10) / 10
  statusText = flexRate + " flexes per sec";
  statusDisplay.innerHTML = statusText;
}


//Basically the Update Function
function moveTime(timestamp: number) {
  const deltaTime = timestamp - lastUpdatedTime;
  lastUpdatedTime = timestamp;

  accumulator += deltaTime;

  if (accumulator >= 100 / flexRate && flexRate > 0) {
    autoModifyCounter(0.1);
    modifyCounterText();
    accumulator -= 100 / flexRate;
  }

  //Flex Upgrade Check 1
  if (flexCounter >= 10) {
    upgradeButtonTier1.disabled = false;
  }
  if (flexCounter < 10) {
    upgradeButtonTier1.disabled = true;
  }

  //Flex Upgrade Check 2
  if (flexCounter >= 100) {
    upgradeButtonTier2.disabled = false;
  }
  if (flexCounter < 100) {
    upgradeButtonTier2.disabled = true;
  }

  //Flex Upgrade Check 3
  if (flexCounter >= 1000) {
    upgradeButtonTier3.disabled = false;
  }
  if (flexCounter < 1000) {
    upgradeButtonTier3.disabled = true;
  }

  requestAnimationFrame(moveTime);
}

bigButton.addEventListener("click", () => {
  flexCounter++;
  modifyCounterText();
  //console.log("button click " + flexCounterText);
});

//The Upgrade Button Clickers
upgradeButtonTier1.addEventListener("click", () => {
  flexCounter -= 10.0;
  flexRate += 0.1;
  upgrade1Amount++;
  modifyUpgradeText();
  statusTextDisplay();
  modifyCounterText();
});

upgradeButtonTier2.addEventListener("click", () => {
  flexCounter -= 100.0;
  flexRate += 2;
  upgrade2Amount++;
  modifyUpgradeText();
  statusTextDisplay();
  modifyCounterText();
});

upgradeButtonTier3.addEventListener("click", () => {
  flexCounter -= 1000.0;
  flexRate += 50;
  upgrade3Amount++;
  modifyUpgradeText();
  statusTextDisplay();
  modifyCounterText();
});

requestAnimationFrame(moveTime);
//Header Section
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);
