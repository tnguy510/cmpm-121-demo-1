import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Arm Workout Simulator";
document.title = gameName;

//Header Section
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

let flexCounter: number = 0.0;
let flexRate: number = 0.0;
//let currentTime: number = performance.timeOrigin + performance.now();
let lastUpdatedTime: number = 0;
let accumulator: number = 0;

let upgrade1Amount: number = 0;
let upgrade2Amount: number = 0;
let upgrade3Amount: number = 0;

let upgrade1Price: number = 10;
let upgrade2Price: number = 100;
let upgrade3Price: number = 1000;

//Div section
const bottomLeftHalf = document.createElement('div');
bottomLeftHalf.style.setProperty('position', 'fixed')
bottomLeftHalf.style.setProperty('bottom', '10px')
bottomLeftHalf.style.setProperty('left', '10px')
app.append(bottomLeftHalf);

const bottomRightHalf = document.createElement('div');
bottomRightHalf.style.setProperty('position', 'fixed')
bottomRightHalf.style.setProperty('bottom', '10px')
bottomRightHalf.style.setProperty('right', '10px')
app.append(bottomRightHalf);

//Button Section
const bigButton = document.createElement("button");
const bigButtonText = "💪";
bigButton.style.setProperty('font-size', '5em');
bigButton.style.setProperty('position', 'fixed')
bigButton.style.setProperty('top', '0')

bigButton.innerHTML = bigButtonText;
app.append(bigButton);

//Upgrade Button 1
const upgradeButtonTier1 = document.createElement("button");
const upgradeButtonTier1Text = "Fish Jerky";

upgradeButtonTier1.innerHTML = upgradeButtonTier1Text;
bottomLeftHalf.append(upgradeButtonTier1);
upgradeButtonTier1.disabled = true;

//1st Button Counter
const upgradeButtonTier1Amount = document.createElement("flexes");
let upgradeButtonTier1TextAmount = "Fish Jerky Bought: " + upgrade1Amount;

upgradeButtonTier1Amount.innerHTML = upgradeButtonTier1TextAmount;
bottomRightHalf.append(upgradeButtonTier1Amount);

//The Second Button
const upgradeButtonTier2 = document.createElement("button");
const upgradeButtonTier2Text = "Protein Shakes";

upgradeButtonTier2.innerHTML = upgradeButtonTier2Text;
bottomLeftHalf.append(upgradeButtonTier2);
upgradeButtonTier2.disabled = true;

//2nd Button Counter
const upgradeButtonTier2Amount = document.createElement("flexes");
let upgradeButtonTier2TextAmount = "Protein Shakes Bought: " + upgrade2Amount;

upgradeButtonTier2Amount.innerHTML = upgradeButtonTier2TextAmount;
bottomRightHalf.append(upgradeButtonTier2Amount);

//The Third Button
const upgradeButtonTier3 = document.createElement("button");
const upgradeButtonTier3Text = "Steroids";

upgradeButtonTier3.innerHTML = upgradeButtonTier3Text;
bottomLeftHalf.append(upgradeButtonTier3);
upgradeButtonTier3.disabled = true;

//3rd Button Counter
const upgradeButtonTier3Amount = document.createElement("flexes");
let upgradeButtonTier3TextAmount = "Steroids Bought: " + upgrade3Amount;

upgradeButtonTier3Amount.innerHTML = upgradeButtonTier3TextAmount;
bottomRightHalf.append(upgradeButtonTier3Amount);

//Flex Counter Display
const flexCounterDisplay = document.createElement("flexes");
let flexCounterText = "Flexes Completed: " + flexCounter;

flexCounterDisplay.innerHTML = flexCounterText;
app.append(flexCounterDisplay);

//Upgrade Modify Text
function modifyUpgradeText() {
  upgradeButtonTier1TextAmount = "Fish Jerky Bought: " + upgrade1Amount;
  upgradeButtonTier1Amount.innerHTML = upgradeButtonTier1TextAmount;

  upgradeButtonTier2TextAmount = "Protein Shakes Bought: " + upgrade2Amount;
  upgradeButtonTier2Amount.innerHTML = upgradeButtonTier2TextAmount;

  upgradeButtonTier3TextAmount = "Steroids Bought: " + upgrade3Amount;
  upgradeButtonTier3Amount.innerHTML = upgradeButtonTier3TextAmount;
}

//Counter Text Functions
function modifyCounterText() {
  flexCounterText = "Flexes Completed: " + flexCounter;
  flexCounterDisplay.innerHTML = flexCounterText;
  //app.append(flexCounterDisplay);
}

function autoModifyCounter(rateAmount: number) {
  flexCounter += rateAmount;
  flexCounter = Math.round(flexCounter * 100) / 100;
  //console.log(flexCounter);
}

//Status Display
const statusDisplay = document.createElement("flexes");
let statusText = flexRate + " flexes per sec";

statusDisplay.innerHTML = statusText;
app.append(statusDisplay);

function statusTextDisplay() {
  flexRate = Math.round(flexRate * 100) / 100;
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
  if (flexCounter >= upgrade1Price) {
    upgradeButtonTier1.disabled = false;
  }
  if (flexCounter < upgrade1Price) {
    upgradeButtonTier1.disabled = true;
  }

  //Flex Upgrade Check 2
  if (flexCounter >= upgrade2Price) {
    upgradeButtonTier2.disabled = false;
  }
  if (flexCounter < upgrade2Price) {
    upgradeButtonTier2.disabled = true;
  }

  //Flex Upgrade Check 3
  if (flexCounter >= upgrade3Price) {
    upgradeButtonTier3.disabled = false;
  }
  if (flexCounter < upgrade3Price) {
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
  flexCounter -= upgrade1Price;
  flexRate += 0.1;
  upgrade1Amount++;
  upgrade1Price *= 1.15;
  upgrade1Price = Math.round(upgrade1Price * 100) / 100;
  //console.log(upgrade1Price);
  modifyUpgradeText();
  statusTextDisplay();
  modifyCounterText();
});

upgradeButtonTier2.addEventListener("click", () => {
  flexCounter -= upgrade2Price;
  flexRate += 2;
  upgrade2Amount++;
  upgrade2Price *= 1.15;
  upgrade2Price = Math.round(upgrade2Price * 100) / 100;
  console.log(upgrade2Price)
  modifyUpgradeText();
  statusTextDisplay();
  modifyCounterText();
});

upgradeButtonTier3.addEventListener("click", () => {
  flexCounter -= upgrade3Price;
  flexRate += 50;
  upgrade3Amount++;
  upgrade3Price *= 1.15;
  upgrade3Price = Math.round(upgrade3Price * 100) / 100;
  modifyUpgradeText();
  statusTextDisplay();
  modifyCounterText();
});

requestAnimationFrame(moveTime);
