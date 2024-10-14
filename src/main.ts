import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Arm Workout Simulator";
document.title = gameName;

//Header Section
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

interface Item {
  name: string;
  cost: number;
  rate: number;
  numBought: number;
  description: string;
}

const availableItems: Item[] = [
  { name: "Fish Jerky", cost: 10, rate: 0.1, numBought: 0, description: 'Chewy and full of nutrients'},
  { name: "Pre Workout", cost: 50, rate: 0.5, numBought: 0, description: 'That good powder stuff'},
  { name: "Protein Shakes", cost: 100, rate: 2, numBought: 0, description: 'A drinkable meal'},
  { name: "Costco Chicken", cost: 500, rate: 10, numBought: 0, description: 'Carbs for those gains'},
  { name: "Steroids", cost: 1000, rate: 50, numBought: 0, description: 'Even professionals use them!'},
];

let flexCounter: number = 0.0;
let flexRate: number = 0.0;
let lastUpdatedTime: number = 0;
let accumulator: number = 0;

//Div section
const bottomLeftHalf = document.createElement("div");
bottomLeftHalf.style.setProperty("position", "fixed");
bottomLeftHalf.style.setProperty("bottom", "10px");
bottomLeftHalf.style.setProperty("left", "10px");
app.append(bottomLeftHalf);

const bottomRightHalf = document.createElement("div");
bottomRightHalf.style.setProperty("position", "fixed");
bottomRightHalf.style.setProperty("bottom", "10px");
bottomRightHalf.style.setProperty("right", "10px");
app.append(bottomRightHalf);

//Button Section
const bigButton = document.createElement("button");
const bigButtonText = "💪";
bigButton.style.setProperty("font-size", "5em");
bigButton.style.setProperty("position", "fixed");
bigButton.style.setProperty("top", "0");

bigButton.innerHTML = bigButtonText;
app.append(bigButton);

//Upgrade Button 1
const upgradeButtonTier1 = document.createElement("button");
//1st Button Counter
const upgradeButtonTier1Amount = document.createElement("flexes");

//The Second Button
const upgradeButtonTier2 = document.createElement("button");
//2nd Button Counter
const upgradeButtonTier2Amount = document.createElement("flexes");

//The Third Button
const upgradeButtonTier3 = document.createElement("button");
//3rd Button Counter
const upgradeButtonTier3Amount = document.createElement("flexes");

//The Fourth Button
const upgradeButtonTier4 = document.createElement("button");
//4th Button Counter
const upgradeButtonTier4Amount = document.createElement("flexes");

//The Fifth Button
const upgradeButtonTier5 = document.createElement("button");
//5th Button Counter
const upgradeButtonTier5Amount = document.createElement("flexes");

const upgradeButtonArray = [];
upgradeButtonArray[0] = upgradeButtonTier1;
upgradeButtonArray[1] = upgradeButtonTier2;
upgradeButtonArray[2] = upgradeButtonTier3;
upgradeButtonArray[3] = upgradeButtonTier4;
upgradeButtonArray[4] = upgradeButtonTier5;

const upgradeAmountArray: HTMLElement[] = [];
upgradeAmountArray[0] = upgradeButtonTier1Amount;
upgradeAmountArray[1] = upgradeButtonTier2Amount;
upgradeAmountArray[2] = upgradeButtonTier3Amount;
upgradeAmountArray[3] = upgradeButtonTier4Amount;
upgradeAmountArray[4] = upgradeButtonTier5Amount;

for (let i = 0; i < availableItems.length; i++) {
  //Upgrade Buttons
  upgradeButtonArray[i].innerHTML =
    `${availableItems[i].name}: ` + availableItems[i].cost;
  bottomLeftHalf.append(upgradeButtonArray[i]);
  upgradeButtonArray[i].disabled = true;

  //Upgrade Counters
  const upgradeButtonTextAmount =
    `${availableItems[i].name} Bought: ` + availableItems[i].numBought;
  upgradeAmountArray[i].innerHTML = upgradeButtonTextAmount;
  bottomRightHalf.append(upgradeAmountArray[i]);
}

//Flex Counter Display
const flexCounterDisplay = document.createElement("flexes");
let flexCounterText = "Flexes Completed: " + flexCounter;

flexCounterDisplay.innerHTML = flexCounterText;
app.append(flexCounterDisplay);

//Upgrade Modify Text
function modifyUpgradeText(i: number) {
  const upgradeButtonTextAmount =
    `${availableItems[i].name} Bought: ` + availableItems[i].numBought;
  upgradeAmountArray[i].innerHTML = upgradeButtonTextAmount;
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
  if (flexCounter >= availableItems[0].cost) {
    upgradeButtonTier1.disabled = false;
  }
  if (flexCounter < availableItems[0].cost) {
    upgradeButtonTier1.disabled = true;
  }

  //Flex Upgrade Check 2
  if (flexCounter >= availableItems[1].cost) {
    upgradeButtonTier2.disabled = false;
  }
  if (flexCounter < availableItems[1].cost) {
    upgradeButtonTier2.disabled = true;
  }

  //Flex Upgrade Check 3
  if (flexCounter >= availableItems[2].cost) {
    upgradeButtonTier3.disabled = false;
  }
  if (flexCounter < availableItems[2].cost) {
    upgradeButtonTier3.disabled = true;
  }

  requestAnimationFrame(moveTime);
}

bigButton.addEventListener("click", () => {
  flexCounter++;
  modifyCounterText();
});

//The Upgrade Button Clickers
upgradeButtonTier1.addEventListener("click", () => {
  flexCounter -= availableItems[0].cost;
  flexRate += availableItems[0].rate;
  availableItems[0].numBought++;
  availableItems[0].cost *= 1.15;
  availableItems[0].cost = Math.round(availableItems[0].cost * 100) / 100;
  //console.log(upgrade1Price);
  modifyUpgradeText(0);
  statusTextDisplay();
  modifyCounterText();
});

upgradeButtonTier2.addEventListener("click", () => {
  flexCounter -= availableItems[1].cost;
  flexRate += availableItems[1].rate;
  availableItems[1].numBought++;
  availableItems[1].cost *= 1.15;
  availableItems[1].cost = Math.round(availableItems[1].cost * 100) / 100;
  modifyUpgradeText(1);
  statusTextDisplay();
  modifyCounterText();
});

upgradeButtonTier3.addEventListener("click", () => {
  flexCounter -= availableItems[2].cost;
  flexRate += availableItems[2].rate;
  availableItems[2].numBought++;
  availableItems[2].cost *= 1.15;
  availableItems[2].cost = Math.round(availableItems[2].cost * 100) / 100;
  modifyUpgradeText(2);
  statusTextDisplay();
  modifyCounterText();
});

upgradeButtonTier4.addEventListener("click", () => {
  flexCounter -= availableItems[3].cost;
  flexRate += availableItems[3].rate;
  availableItems[3].numBought++;
  availableItems[3].cost *= 1.15;
  availableItems[3].cost = Math.round(availableItems[3].cost * 100) / 100;
  modifyUpgradeText(3);
  statusTextDisplay();
  modifyCounterText();
});

upgradeButtonTier5.addEventListener("click", () => {
  flexCounter -= availableItems[4].cost;
  flexRate += availableItems[4].rate;
  availableItems[4].numBought++;
  availableItems[4].cost *= 1.15;
  availableItems[4].cost = Math.round(availableItems[4].cost * 100) / 100;
  modifyUpgradeText(4);
  statusTextDisplay();
  modifyCounterText();
});

requestAnimationFrame(moveTime);
