const question = document.getElementById("vocabulary");
const timer = document.getElementById("timer");
let nextButton = document.querySelector(".nextbutton");
const inScore = document.getElementById("score");

const vocabularyGame = [
  {
    question: "I can ________ the flowers.",
    options: ["smell", "small", "tall", "tell"],
    answer: "smell",
  },
  {
    question: "She bought a ________ dress for the party.",
    options: ["beautiful", "blue", "big", "busy"],
    answer: "beautiful",
  },
  {
    question: "The cat is ________ the tree.",
    options: ["under", "over", "between", "beside"],
    answer: "under",
  },
  {
    question: "He has a ________ collection of stamps.",
    options: ["large", "long", "loud", "lazy"],
    answer: "large",
  },
  {
    question: "The sun sets in the ________.",
    options: ["east", "west", "north", "south"],
    answer: "west",
  },
];

let currentQuestionIndex = 0;
let timerInterval;
let score = localStorage.getItem("score");

score = score !== null ? parseInt(score) : 0;

showStorage();

function displayQuestion() {
  if (currentQuestionIndex < vocabularyGame.length) {
    const questionText = vocabularyGame[currentQuestionIndex].question;
    const options = vocabularyGame[currentQuestionIndex].options;
    question.innerHTML = `
    <h1> ${currentQuestionIndex + 1}. ${questionText.replace(
      "________",
      `<span id="answer-span">-----</span>`
    )} </h1>
    <p id ="message"> </p>
    <div class="options">${options
      .map(
        (option, i) =>
          `<button class ="option" onclick="checkAnswer(${currentQuestionIndex}, ${i})">${option} </button>`
      )
      .join("")}</div>
  `;
    startTimer(60);
    if (nextButton) {
      nextButton.style.visibility = "hidden";
    }
  } else {
    currentQuestionIndex = 0;
    displayQuestion();
  }
  showStorage();
  removeItem();
}

displayQuestion();

function checkAnswer(questionIndex, optionIndex) {
  const answerSpan = document.getElementById("answer-span");
  const answer = vocabularyGame[questionIndex].answer;
  const selectedOption = vocabularyGame[questionIndex].options[optionIndex];
  const message = document.querySelector("#message");

  if (selectedOption === answer) {
    answerSpan.innerText = selectedOption;
    answerSpan.style.color = "green";
    const buttons = document.querySelectorAll(".option");
    buttons[optionIndex].style.backgroundColor = "green";
    buttons[optionIndex].style.color = "white";
    message.style.color = "green";
    message.textContent = "Correct Answer: ";
    disableAllButtons();
    scores(20);
    nextDisplay();

    // Show the "Next Question" button
    nextButton.style.visibility = "visible";
  } else {
    answerSpan.innerText = selectedOption;
    answerSpan.style.color = "red";
    const buttons = document.querySelectorAll(".option");
    buttons[optionIndex].style.backgroundColor = "red";
    message.style.color = "red";
    message.textContent = "Incorrect Answer: ";
    buttons[optionIndex].style.color = "white";
  }
}

function disableAllButtons() {
  const buttons = document.querySelectorAll(".option");
  buttons.forEach((button) => {
    button.disabled = true;
  });
}

//button next display
function nextDisplay() {
  const nextButtonContainer = document.getElementById("buttons");
  if (!nextButton) {
    nextButton = document.createElement("button");
    nextButton.className = "nextbutton";
    nextButton.textContent = "Next Question";
    nextButtonContainer.appendChild(nextButton);
    nextButton.addEventListener("click", () => {
      nextButton.style.visibility = "hidden"; // Hide the button again for the next question
      currentQuestionIndex++;
      saveStorage();
      displayQuestion();
    });
  }
}

//startTimer
function startTimer(remainingTime) {
  clearInterval(timerInterval);
  timer.innerHTML = "Time Left: " + "<b>" + remainingTime + " sec";

  timerInterval = setInterval(() => {
    remainingTime--;

    if (remainingTime == 0) {
      clearInterval(timerInterval);
      currentQuestionIndex++;
      saveStorage();
      displayQuestion();
    }
    timer.innerHTML = "Time Left: " + "<b>" + remainingTime + " sec";
  }, 1000);
}

function scores(value) {
  score = score + value;
  return score;
}

function saveStorage() {
  localStorage.setItem("score", score);
}

function showStorage() {
  const storedScore = localStorage.getItem("score");
  if (storedScore === null) {
    inScore.innerHTML = "Your Score : 0 ";
  } else {
    inScore.innerHTML =
      "Your Score : " +
      localStorage.getItem("score") +
      `   <i id="delete" class="fa-sharp fa-solid fa-trash fa-bounce"></i>`;
  }
}

function removeItem() {
  const deletethis = document.getElementById("delete");
  if (deletethis) {
    deletethis.addEventListener("click", () => {
      alert("Deleted");
      localStorage.removeItem("score");
      score = 0;
      showStorage();
    });
  }
}
