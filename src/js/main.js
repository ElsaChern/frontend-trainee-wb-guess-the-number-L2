// Найдем все необходимые элементы на странице
const resultBox = document.querySelector(".resultBox");
const resultParagraphs = document.querySelectorAll(".resultBox p");
const guesses = document.querySelector(".guesses");
const lastResult = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");
const help = document.querySelector(".help");
const guessBtn = document.querySelector(".guess-button");
const guessField = document.querySelector(".guessField");
const resetGameBtn = document.querySelector(".reset-button");

// Выбор диапазона
const modal = document.querySelector("#modal");
// Подтверждение выбора
const confirmBtn = document.querySelector(".confirm");
// Подсказка какой диапазон был выбран
const selectedRenge = document.querySelector(".selected-renge");

const minNumber = document.querySelector("#startNumber");
const maxNumber = document.querySelector("#endNumber");

let min = 0;
let max = 100;
let guessCount = 1;
let userGuess;
let randomNumber;

// Получаем загаданное число
const getRandomNumber = () => {
  randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
};

// Функция проверки введенного числа с загаданным
const checkGuess = () => {
  resultBox.style.display = "flex";
  userGuess = Number(guessField.value);
  lowOrHi.style.display = "block";
  guesses.style.display = "block";
  guesses.textContent += userGuess + " ";

  if (userGuess === randomNumber) {
    lastResult.textContent = `Поздравляю! Ты угадал число. Количество попыток: ${guessCount}`;
    lastResult.style.backgroundColor = "green";
    help.style.display = "none";
    guesses.style.display = "none";
    lowOrHi.style.display = "none";
    gameOver();
  } else {
    lastResult.textContent = `Неверно! Попыток: ${guessCount}`;
    lastResult.style.backgroundColor = "rgba(235, 63, 63, 0.602)";
    // Отображение подсказки при 3х неверных ответах
    if (guessCount === 3) {
      help.style.display = "block";
      help.textContent =
        randomNumber % 2 === 0
          ? "Подсказка: загаданное число четное"
          : "Подсказка: загаданное число нечетное";
    }
    // После каждой попытки компьютер сообщает, было ли загаданное число больше или меньше предложенного
    if (userGuess < randomNumber && userGuess >= min) {
      lowOrHi.classList.remove("warning");
      lowOrHi.textContent = "Совет: попробуй число побольше";
    } else if (userGuess > randomNumber && userGuess <= max) {
      lowOrHi.classList.remove("warning");
      lowOrHi.textContent = "Совет: попробуй число поменьше";
    } else {
      // Обработка числа за пределами диапазона
      lowOrHi.textContent = "Упс, кажется число не входит в диапазон";
      lowOrHi.classList.add("warning");
    }
  }

  guessCount++;
  guessField.value = "";
  guessField.focus();
};

// Завершение игры
const gameOver = () => {
  guessField.disabled = true;
  guessBtn.disabled = true;
  resetGameBtn.style.display = "block";
  resetGameBtn.addEventListener("click", resetGame);
};

// Очистка значений и запуск новой игры
const resetGame = () => {
  guessCount = 1;
  resultBox.style.display = "none";
  guesses.textContent = "Предыдущие значения: ";
  resetGameBtn.style.display = "none";
  guessField.disabled = false;
  guessBtn.disabled = false;
  guessField.value = "";
  guessField.focus();

  getRandomNumber();
};

// Отображение модального окна
const initialize = () => {
  modal.classList.add("shown");
};

guessBtn.addEventListener("click", checkGuess);

confirmBtn.addEventListener("click", () => {
  modal.classList.remove("shown");
  selectedRenge.textContent += min + "-" + max;
  getRandomNumber();
});

minNumber.addEventListener("change", () => {
  min = Number(minNumber.value);
});

maxNumber.addEventListener("change", () => {
  max = Number(maxNumber.value);
});

initialize();
