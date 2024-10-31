import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Arm Workout Simulator";
document.title = gameName;

//Header Section
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

//Button Section
const flexButton = document.createElement("button");
const flexButtonText = "💪";
flexButton.innerHTML = flexButtonText;
flexButton.style.fontSize = "96px";
flexButton.style.setProperty("position", "fixed");
flexButton.style.setProperty("top", "64px");
app.append(flexButton);

//Upgrade Button 1
const upgradeButtonTier1 = document.createElement("button");
const upgradeButtonTier1Amount = document.createElement("flexes");
const upgrade1desc = document.createElement("div");

//The Second Button
const upgradeButtonTier2 = document.createElement("button");
const upgradeButtonTier2Amount = document.createElement("flexes");
const upgrade2desc = document.createElement("div");

//The Third Button
const upgradeButtonTier3 = document.createElement("button");
const upgradeButtonTier3Amount = document.createElement("flexes");
const upgrade3desc = document.createElement("div");

//The Fourth Button
const upgradeButtonTier4 = document.createElement("button");
const upgradeButtonTier4Amount = document.createElement("flexes");
const upgrade4desc = document.createElement("div");

//The Fifth Button
const upgradeButtonTier5 = document.createElement("button");
const upgradeButtonTier5Amount = document.createElement("flexes");
const upgrade5desc = document.createElement("div");

const blankDiv = document.createElement("div");
blankDiv.innerHTML = "";

interface Item {
  name: string;
  cost: number;
  rate: number;
  numBought: number;
  descDiv: HTMLDivElement;
  descString: string;
}

const availableItems: Item[] = [
  {
    name: "Fish Jerky",
    cost: 10,
    rate: 0.1,
    numBought: 0,
    descDiv: upgrade1desc,
    descString: "Chewy and full of nutrients. Auto Flex by 0.1",
  },
  {
    name: "Pre Workout",
    cost: 50,
    rate: 0.5,
    numBought: 0,
    descDiv: upgrade2desc,
    descString: "That good powder stuff. Auto Flex by 0.5",
  },
  {
    name: "Protein Shakes",
    cost: 100,
    rate: 2,
    numBought: 0,
    descDiv: upgrade3desc,
    descString: "A drinkable meal. Auto Flex by 2",
  },
  {
    name: "Costco Chicken",
    cost: 500,
    rate: 10,
    numBought: 0,
    descDiv: upgrade4desc,
    descString: "Carbs for those gains. Auto Flex by 10",
  },
  {
    name: "Steroids",
    cost: 1000,
    rate: 50,
    numBought: 0,
    descDiv: upgrade5desc,
    descString: "Even professionals use them! Auto Flex by 50",
  },
];

let flexCounter: number = 0.0;
let flexRate: number = 0.0;
let lastUpdatedTime: number = 0;
let accumulator: number = 0;
const costMultiplier = 1.15;

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


flexButton.innerHTML = flexButtonText;
app.append(flexButton);

const upgradeButtonArray: HTMLButtonElement[] = [
  upgradeButtonTier1, upgradeButtonTier2, upgradeButtonTier3, upgradeButtonTier4, upgradeButtonTier5
];

const upgradeAmountArray: HTMLElement[] = [
  upgradeButtonTier1Amount, upgradeButtonTier2Amount, upgradeButtonTier3Amount, upgradeButtonTier4Amount, upgradeButtonTier5Amount];

for (let i = 0; i < availableItems.length; i++) {
  //Upgrade Buttons
  upgradeButtonArray[i].innerHTML =
    `${availableItems[i].name}: ` + availableItems[i].cost;
    upgradeButtonArray[i].title = `${availableItems[i].descString}`;

  bottomLeftHalf.appendChild(upgradeButtonArray[i]);
  upgradeButtonArray[i].disabled = true;
  createUpgradeButtonClicker(upgradeButtonArray[i], availableItems[i], i);

  availableItems[i].descDiv.innerHTML = `${availableItems[i].name} Bought: ` + availableItems[i].numBought;
  bottomLeftHalf.appendChild(availableItems[i].descDiv);

  //Upgrade Counters
  //upgradeAmountArray[i].innerHTML = `${availableItems[i].name} Bought: ` + availableItems[i].numBought;
  //bottomRightHalf.appendChild(upgradeAmountArray[i]);
  //bottomLeftHalf.appendChild(availableItems[i].descDiv);
}

function createUpgradeButtonClicker(
  upgradeButton: HTMLButtonElement,
  currentItem: Item,
  itemNum: number,
) {
  //const upgradeButton = document.createElement("button");
  //upgradeButton.innerHTML = `${currentItem.name}: ` + currentItem.cost;
  //bottomLeftHalf.append(upgradeButton);
  //upgradeButton.disabled = true;

  upgradeButton.addEventListener("click", () => {
    flexCounter -= currentItem.cost;
    flexRate += currentItem.rate;
    currentItem.numBought++;
    currentItem.cost *= costMultiplier;
    currentItem.cost = Math.round(currentItem.cost * 100) / 100;
    modifyUpgradeText(itemNum);
    statusTextDisplay();
    modifyCounterText();
  });
}

flexButton.addEventListener("click", () => {
  flexCounter++;
  modifyCounterText();
});

//Flex Counter Display
const flexCounterDisplay = document.createElement("flexes");
let flexCounterText = "Flexes Completed: " + flexCounter;

flexCounterDisplay.innerHTML = flexCounterText;
app.append(flexCounterDisplay);

//Upgrade Modify Text
function modifyUpgradeText(i: number) {
  availableItems[i].descDiv.innerHTML = `${availableItems[i].name} Bought: ` + availableItems[i].numBought;

  upgradeButtonArray[i].innerHTML =
    `${availableItems[i].name}: ` + availableItems[i].cost;
}

//Counter Text Functions
function modifyCounterText() {
  flexCounterText = "Flexes Completed: " + flexCounter.toFixed(1);
  flexCounterDisplay.innerHTML = flexCounterText;
  //app.append(flexCounterDisplay);
}

function autoModifyCounter(rateAmount: number) {
  flexCounter += rateAmount;
  flexCounter = Math.round(flexCounter * 100) / 100;
  //console.log(flexCounter);
}

//Checks that there is enough currency to buy a certain upgrade and disables/enables it respectively
function checkCost(arrayPosition: number) {
  if (flexCounter >= availableItems[arrayPosition].cost) {
    upgradeButtonArray[arrayPosition].disabled = false;
  }
  if (flexCounter < availableItems[arrayPosition].cost) {
    upgradeButtonArray[arrayPosition].disabled = true;
  }
}

//Status Display
const statusDisplay = document.createElement("flexes");
let statusText = flexRate + " flexes per sec";

statusDisplay.innerHTML = statusText;
app.append(statusDisplay);

function statusTextDisplay() {
  flexRate = Math.round(flexRate * 100) / 100;
  statusText = flexRate.toFixed(1) + " flexes per sec";
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

  for (let i = 0; i < availableItems.length; i++) {
    checkCost(i);
  }

  requestAnimationFrame(moveTime);
}

requestAnimationFrame(moveTime);
