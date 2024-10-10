import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My Web game";
document.title = gameName;

let flexCounter : number = 0;

//Button Section
const bigButton = document.createElement("button");
const bigButtonText = "Flex Check💪";

bigButton.innerHTML = bigButtonText;
app.append(bigButton);

const flexCounterDisplay = document.createElement("flexes");
let flexCounterText = "Flex Counter: " + flexCounter;

flexCounterDisplay.innerHTML = flexCounterText;
app.append(flexCounterDisplay);

function modifyCounterText(){
    flexCounterText = "Flex Counter: " + flexCounter;

    flexCounterDisplay.innerHTML = flexCounterText;
    app.append(flexCounterDisplay);
}

bigButton.addEventListener("click", () => {
  flexCounter++;
  modifyCounterText();
  //console.log("button click " + flexCounterText);
});

//Header Section
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);
