let user = document.querySelector(".user");
let userInput = document.querySelector(".user-input");
let insuerMes = document.querySelector(".insuer");
let highScoreDiv = document.querySelector(".high-score");
let userSubmit = document.querySelector(".submit");
let selectBox = document.querySelector("select");
let startButton = document.querySelector("button");
let assignWord = document.querySelector(".assign-word");
let input = document.querySelector("input.assign");
let wordsContainer = document.querySelector(".words-container");
let timeLeft = document.querySelector(".time span");
let score = document.querySelector(".score .score-num");
let scoreFrom = document.querySelector(".score .score-from");
let infoLvl = document.querySelector(".info .level");
let infoSec = document.querySelector(".info .seconds");
let final = document.querySelector(".final");
let finish = document.querySelector(".finish");

const easyWords = [
  "Apple",
  "Cat",
  "Dog",
  "Sun",
  "Moon",
  "Tree",
  "Car",
  "Book",
  "Flower",
  "Smile",
  "Cry",
  "Laugh",
  "Eat",
  "Drink",
  "Sleep",
  "Run",
  "Jump",
  "Swim",
  "Happy",
  "Sad",
  "Big",
  "Small",
  "Hot",
  "Cold",
  "Love",
  "Friend",
  "Family",
  "Music",
  "Dance",
  "Sleep",
  "Read",
  "Write",
  "Listen",
  "Speak",
  "Watch",
  "Play",
  "Angry",
  "Walk",
  "Tired",
  "Scared",
  "Strong",
  "Wise",
  "Mother",
  "Father",
  "Sister",
];
const normalWords = [
  "Argument",
  "Beautiful",
  "Different",
  "Education",
  "Examples",
  "Existence",
  "Experience",
  "General",
  "Govern",
  "Important",
  "Knowledge",
  "Material",
  "Necessary",
  "Organization",
  "Pleasure",
  "Probable",
  "Quality",
  "Purpose",
  "Question",
  "Responsible",
  "Society",
  "Simple",
  "Thought",
  "Substance",
  "Common",
  "Decision",
  "Degree",
  "Amount",
  "Chocolate",
  "Chicken",
  "Window",
  "Goodbye",
  "Ground",
  "appear",
  "Morning",
  "Christmas",
  "Believe",
  "possess",
  "Belong",
  "consider",
  "Remember",
  "Pakistan",
  "animal",
  "mortal",
  "should",
];
const hardWords = [
  "analytically",
  "approachable",
  "assessment",
  "assessable",
  "authoritative",
  "availability",
  "beneficiary",
  "conceptualize",
  "constituency",
  "contextual",
  "contextualization",
  "disestablishment",
  "dissimilarity",
  "Organization",
  "distributional",
  "economically",
  "environmental",
  "establishment",
  "evidential",
  "financially",
  "formulation",
  "identification",
  "inconsistent",
  "individualist",
  "methodological",
  "responsively",
  "redistribution",
  "indication",
  "indiscreetly",
  "insignificant",
  "interpretation",
  "involvement",
  "legislation",
  "misinterpretation",
  "occurrence",
  "percentage",
  "periodically",
  "procedural",
  "reassessment",
  "redefinition",
  "reformulation",
  "requirement",
  "restructuring",
  "significantly",
  "specification",
];

const levels = {
  Easy: 5,
  Normal: 4,
  Hard: 3,
};

let userName;
userSubmit.onclick = () => {
  if (userInput.value == "") {
    insuerMes.classList.toggle("hidden");
  } else {
    userName = userInput.value;
    document.querySelector(".welcome-name").innerHTML = userName;
    user.remove();
  }
};

selectBox.value = "";
startButton.onclick = () => {
  if (selectBox.value != "") {
    input.classList.toggle("start");
    selectBox.parentElement.remove();
    timeLeft.innerHTML = levels[selectBox.value];
    if (selectBox.value == "Easy") {
      scoreFrom.innerHTML = easyWords.length;
    } else if (selectBox.value == "Normal") {
      scoreFrom.innerHTML = normalWords.length;
    } else {
      scoreFrom.innerHTML = hardWords.length;
    }
    genWords();
  }
};

function start() {
  timeLeft.innerHTML = levels[selectBox.value];
  let start = setInterval(() => {
    timeLeft.innerHTML--;
    if (timeLeft.innerHTML == 0) {
      clearInterval(start);
      if (assignWord.textContent.toLowerCase() === input.value.toLowerCase()) {
        input.value = "";
        score.innerHTML++;
        if (
          easyWords.length > 0 ||
          normalWords.length > 0 ||
          hardWords.length > 0
        ) {
          genWords();
        } else {
          finish.classList.add("win");
          finish.innerHTML = `Congratz`;
          selectBox.parentElement.remove();
          assignWord.remove();
          input.remove();
          wordsContainer.remove();
          document.querySelector(".info").remove();
          final.classList.add("result");
          final.innerHTML = `Your Score ☞ ${score.innerHTML} <br/> From ☞ ${scoreFrom.innerHTML}`;
          highScoreDiv.innerHTML = `Excellent ${userName} You Got Amazing Score`;
          highScoreDiv.classList.add("done");
          finish.onclick = () => {
            window.location.reload();
          };
        }
      } else {
        finish.classList.add("lose");
        finish.innerHTML = `Press To Try Again`;
        selectBox.parentElement.remove();
        assignWord.remove();
        input.remove();
        wordsContainer.remove();
        document.querySelector(".info").remove();
        final.classList.add("result");
        final.innerHTML = `Your Score ☞ ${score.innerHTML} <br/> From ☞ ${scoreFrom.innerHTML}`;
        finish.onclick = () => {
          window.location.reload();
        };
      }
    }
  }, 1000);
}
function getRandomWord(lvl) {
  let randomWord = lvl[Math.floor(Math.random() * lvl.length)];
  let wordIndex = lvl.indexOf(randomWord);
  lvl.splice(wordIndex, 1);
  let div = document.createElement("div");
  div.innerHTML = randomWord;
  assignWord.appendChild(div);
}

function assignWords(lvl) {
  for (let i = 0; i < lvl.length; i++) {
    let div = document.createElement("div");
    div.innerHTML = lvl[i];
    wordsContainer.appendChild(div);
  }
}
function genWords() {
  if (selectBox.value != "") {
    start();
    input.focus();
    startButton.remove();
    assignWord.innerHTML = "";
    wordsContainer.innerHTML = "";
    if (selectBox.value == "Easy") {
      getRandomWord(easyWords);
      assignWords(easyWords);
      infoSec.innerHTML = levels.Easy;
      infoLvl.innerHTML = " Easy ";
    } else if (selectBox.value == "Normal") {
      getRandomWord(normalWords);
      assignWords(normalWords);
      infoSec.innerHTML = levels.Normal;
      infoLvl.innerHTML = " Normal ";
    } else {
      getRandomWord(hardWords);
      assignWords(hardWords);
      infoSec.innerHTML = levels.Hard;
      infoLvl.innerHTML = " Hard ";
    }
    selectBox.classList.add("none");
  }
}
