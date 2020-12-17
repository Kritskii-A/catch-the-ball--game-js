let level; // уровень сложности

// получаем canvas
let canvas = document.getElementById("canvas");
// получаем значение поля очков
let result = document.getElementById("result");
// получаем значение поля очков во всплывающем окне
let resultScore = document.getElementById("result-modal");

// получаем значение поля для макимальных результатов
let resultScoreMax = document.getElementById("result-max");
let resultModalScoreMax = document.getElementById("result-max-modal");
resultScoreMax.textContent = getMaxScore();

let maxScore = getMaxScore();
resultModalScoreMax.textContent = maxScore;

// получаем ширину и высоту экрана пользователя
let height = document.documentElement.clientHeight;
let width = document.documentElement.clientWidth;

const color = ["#FFAA00", "#006363", "#6A48D7", "#A66F00", "#5CCCCC"];

// определяем для пользователя ширину и высоту, равную экрану пользователя
canvas.width = width;
canvas.height = height;

// рисуем 2Д
let ctx = canvas.getContext("2d");

// Создание функции отображения шарика
function circle(pos_x, pos_y, radius, color) {
  // Назначение цвет круга
  ctx.fillStyle = color;
  // Начала рисования
  ctx.beginPath();
  // Рисуем круг
  ctx.arc(pos_x, pos_y, radius, 0, Math.PI * 2, true);
  // Закрашиваем круг
  ctx.fill();
}

// Random
function randomInteger(min = 5, max = 30) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

// счёт
let score = 0;

// Переменные для позиции клика
let click_x = 0;
let click_y = 0;

// ловим клик
document.getElementById("canvas").addEventListener(
  "click",
  function (event) {
    // получаем координаты клика
    click_x = event.offsetX;
    click_y = event.offsetY;
  },
  false
);

function playGameStart(
  levelAgain,
  colorActive = color[randomInteger(0, color.length - 1)]
) {
  // получаем выбранный уровень
  if (levelAgain) {
    level = levelAgain;
  } else {
    level = document.getElementById("level").value;
  }

  // указываем точки начала
  let x_circle = randomInteger(50, width - 50),
    y_circle = 0;

  // стартуем изменние положения шарика
  let playGame = setInterval(function () {
    // Удаление всего с поля
    ctx.clearRect(0, 0, width, height);

    // указываем скорость изменения положения шарика
    if (level === "undefined") {
      y_circle++;
    } else {
      y_circle += +level;
    }

    // Рисуем шарик
    circle(x_circle, y_circle, 25, colorActive);

    // Условие для заканчивания игры
    if (
      x_circle >= click_x - 26 &&
      x_circle <= click_x + 26 &&
      click_x > 0 &&
      y_circle >= click_y - 26 &&
      y_circle <= click_y + 26 &&
      click_y > 0
    ) {
      click_x = 0;
      click_y = 0;
      score++; // увеличиваем счет
      result.textContent = score; // показываем значение во всплывающем окне

      clearInterval(playGame); // очищаем поле
      changeMaxScore();
      playGameStart(level); // начинаем игру
    } else {
      click_x = 0;
      click_y = 0;
    }

    // если не успели поймать
    if (y_circle >= height + 25) {
      // Остановка таймера
      clearInterval(playGame);
      // Вывод счёта
      gameEnd(score);
    }
  }, 10);
}

// игра закончена
function gameEnd(score) {
  $("#level-again").val(level); // устанавливаем в selector текущий уровень
  resultScore.textContent = score; // показываем очки во всплывающем окне
  if (maxScore < score) {
    resultModalScoreMax.textContent = score; // показываем очки во всплывающем окне
  }
  if (maxScore < score) {
    setMaxScore(score); // заменяем максимальнео значение
  }
  $("#modalEndGame").modal(); // вызываем всплывающее окно
}

// начинаем игру сначала
function gamePlayAgain() {
  let levelAgain = document.getElementById("level-again").value; // получаем выбранный уровень игры
  score = 0; // перезаписываем текущие очки
  result.textContent = score; // перезаписываем текущие очки на основной странице

  $("#modalEndGame").modal("hide"); // скрываем всплывающее окно
  playGameStart(levelAgain); // начинаем новую игру
}

// макимальные очки запись
function setMaxScore(score) {
  localStorage.setItem("score", score);
}

// максимальные очки получить
function getMaxScore() {
  let value;
  if (localStorage.getItem("score")) {
    value = localStorage.getItem("score");
  } else {
    value = 0;
  }
  return value;
}

// меняем максимальное значение
function changeMaxScore() {
  if (resultScoreMax.textContent <= score) {
    resultScoreMax.textContent = score;
  }
}

// показываем всплывающее окно при старте
$("#modalHello").modal();
