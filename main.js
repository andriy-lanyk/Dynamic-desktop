import wishes from './wishes.js';

const time = document.querySelector('.time');
const date = document.querySelector('.date');
const greetingText = document.querySelector('.greeting-text');
const greetingName = document.querySelector('.greeting-name');
const wish = document.querySelector('.wish');
var timeoutID;

function showTime() {
  let today = new Date();
  let hour = today.getHours();
  let minutes = today.getMinutes();
  let seconds = today.getSeconds();

  time.textContent = `${addZero(hour)}:${addZero(minutes)}:${addZero(seconds)}`;

  setTimeout(showTime, 1000);
}

showTime();

function setDate() {
  let today = new Date();
  let day = today.getDate();
  let month = `${today.getMonth() + 1}`;
  let year = today.getFullYear();

  const getWeekDay = today => {
    let days = [
      'Воскресенье',
      'Понедельник',
      'Вторник',
      'Среда',
      'Четверг',
      'Пятница',
      'Суббота',
    ];

    return days[today.getDay()];
  };

  date.textContent = `${getWeekDay(today)} ${addZero(day)}.${addZero(
    month,
  )}.${year}`;
}

setDate();

function addZero(number) {
  return number < 10 ? `0${number}` : `${number}`;
}

function greeting() {
  let today = new Date();
  let hour = today.getHours();
  if (hour >= 5 && hour < 11) {
    greetingText.textContent = 'Доброе утро';
    document.body.style.backgroundImage = "url('./img/Morning.jpg')";
    document.body.style.color = 'Maroon';
  } else if (hour >= 11 && hour < 18) {
    greetingText.textContent = 'Добрый день';
    document.body.style.backgroundImage = "url('./img/Afternoon.jpg')";
    document.body.style.color = 'Yellow';
  } else if (hour >= 18 && hour < 22) {
    greetingText.textContent = 'Добрый вечер';
    document.body.style.background =
      "linear-gradient( rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4) ), url('./img/Evening.jpg')";
    document.body.style.backgroundSize = 'cover';
    document.body.style.color = 'OrangeRed';
  } else {
    greetingText.textContent = 'Доброй ночи';
    document.body.style.backgroundImage = "url('./img/Night.jpg')";
    document.body.style.color = 'LightGrey';
  }
}

greeting();

greetingName.addEventListener('keypress', setName);
greetingName.addEventListener('blur', setName);
greetingName.addEventListener('click', changeGreetingNameText);

function changeGreetingNameText() {
  greetingName.textContent = ' ';
  wish.textContent = '[желание появиться когда я узнаю Ваше имя]';
  clearTimeout(timeoutID);
  setTimeout(function () {
    greetingName.focus();
    greetingName.style.outline = 'solid';
  }, 0);
}

function getName() {
  if (
    localStorage.getItem('name') === null ||
    localStorage.getItem('name') === ''
  ) {
    greetingName.textContent = '[введите свое имя]';
    wish.textContent = '[желание появиться когда я узнаю Ваше имя]';
    clearTimeout(timeoutID);
  } else {
    greetingName.textContent = `${localStorage.getItem('name')}!`;
    clearTimeout(timeoutID);
    printWish();
  }
}

function setName(event) {
  greetingName.style.outline = '';
  if (event.type === 'keypress') {
    if (event.which == 13 || event.keyCode == 13) {
      localStorage.setItem('name', event.target.innerText);
      greetingName.blur();
      getName();
    }
  } else {
    localStorage.setItem('name', event.target.innerText);
    getName();
  }
}

getName();

function choiceOfWishes() {
  return [...wishes][
    Math.ceil(Math.random() * ([...wishes].length - 1 - 1)) + 0
  ].toLowerCase();
}

function printWish() {
  wish.textContent = ` ${choiceOfWishes()}`;
  wish.style.textDecoration = 'underline';

  timeoutID = setTimeout(printWish, 20000);
}
