import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My Web game";
document.title = gameName;

//Button Section
const bigButton = document.createElement('bigButton');
const bigButtonText = 'Button Check💪';
bigButton.style.backgroundColor = 'grey';
bigButton.style.color = 'black';
//document.body.appendChild(bigButton);
bigButton.addEventListener('click', () => {
    console.log('button click');
});

//Header Section
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

//const button = document.createElement("button1");
bigButton.innerHTML = bigButtonText;
app.append(bigButton);
