// получаем canvas
let canvas = document.getElementById("canvas");
// получаем значение поля очков
let result = document.getElementById("result");
// получаем значение поля очков во всплывающем окне
let resultScore = document.getElementById("result-modal");

// получаем ширину и высоту экрана пользователя
let height = document.documentElement.clientHeight;
let width = document.documentElement.clientWidth;

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
let level;
function playGameStart(levelAgain) {
  // получаем выбранный уровень
  if (levelAgain) {
    level = levelAgain;
    console.log("true");
  } else {
    level = document.getElementById("level").value;
  }

  console.log(level);

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
    circle(x_circle, y_circle, 25, "#FFAA00");

    // Условие для заканчивания игры
    if (
      x_circle >= click_x - 30 &&
      x_circle <= click_x + 30 &&
      click_x > 0 &&
      y_circle >= click_y - 30 &&
      y_circle <= click_y + 30 &&
      click_y > 0
    ) {
      click_x = 0;
      click_y = 0;
      score++; // увеличиваем счет
      result.textContent = score; // показываем значение во всплывающем окне

      clearInterval(playGame); // очищаем поле
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
  $("#level-again").val(level);
  resultScore.textContent = score;
  $("#modalEndGame").modal();
}

// начинаем игру сначала
function gamePlayAgain() {
  let levelAgain = document.getElementById("level-again").value;
  score = 0;
  result.textContent = score;

  $("#modalEndGame").modal("hide");
  playGameStart(levelAgain);
}

$("#modalHello").modal();
