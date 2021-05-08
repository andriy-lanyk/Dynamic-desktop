const time = document.querySelector('.time');
const date = document.querySelector('.date');
const greetingText = document.querySelector('.greeting-text');
const greetingName = document.querySelector('.greeting-name');
const plan = document.querySelector('.plan');
const task = document.querySelector('.task');

function showTime() {
    let today = new Date();
    let hour = today.getHours();
    let minutes = today.getMinutes();
    let seconds = today.getSeconds();
    
    time.textContent = `${addZero(hour)}:${addZero(minutes)}:${addZero(seconds)}`;

    setTimeout(showTime, 1000);
};

showTime();

function setDate() {
    let today = new Date();
    let day = today.getDate();
    let month = `${today.getMonth() + 1}`;
    let year = today.getFullYear();

    const getWeekDay = (today) => {
        let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
        
        return days[today.getDay()];
    }
    
    date.textContent = `${getWeekDay(today)} ${addZero(day)}.${addZero(month)}.${year}`;
}

setDate();

function addZero(number) { return number < 10 ? `0${number}` : `${number}` };

function greeting() {
    let today = new Date();
    let hour = today.getHours();
    if (hour >= 5 && hour < 11) {
        greetingText.textContent = 'Доброе утро';
        document.body.style.backgroundImage = "url('./img/Morning.jpg')";
    } else if (hour >= 11 && hour < 18) {
        greetingText.textContent = 'Добрый день';
        document.body.style.backgroundImage = "url('./img/Afternoon.jpg')";
        document.body.style.color = "Indigo";
    } else if (hour >= 18 && hour <= 22) {
        greetingText.textContent = 'Добрый вечер';
        document.body.style.background = "linear-gradient( rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4) ), url('./img/Evening.jpg')";
        document.body.style.backgroundSize = "cover";
        document.body.style.color = "OrangeRed";
    } else {
        greetingText.textContent = 'Доброй ночи';
        document.body.style.backgroundImage = "url('./img/Night.jpg')";
        document.body.style.color = "white";
    }
}

greeting();

greetingName.addEventListener("keypress", setName);
greetingName.addEventListener("blur", setName);
task.addEventListener("keypress", setTask);
task.addEventListener("blur", setTask);

function getName () {
    if (localStorage.getItem('name') === null || localStorage.getItem('name') === "") {
        greetingName.textContent = '/введите свое имя/';
    } else {
        greetingName.textContent = localStorage.getItem('name');
    }
};

function getTask () {
    if (localStorage.getItem('task') === null || localStorage.getItem('task') === "") {
        task.textContent = '/введите задание/'
    } else {
        task.textContent = localStorage.getItem('task');
    }
};

function setName (event) {
    if (event.type === 'keypress') {
        if (event.which == 13 || event.keyCode == 13) {
        localStorage.setItem('name', event.target.innerText);
        greetingName.blur();
        }    
    } else {
        localStorage.setItem('name', event.target.innerText)
    }
};

function setTask (event) {
    if (event.type === 'keypress') {
        if (event.which == 13 || event.keyCode == 13) {
        localStorage.setItem('task', event.target.innerText);
        task.blur();
        }    
    } else {
        localStorage.setItem('task', event.target.innerText)
    }
};

getName();
getTask();

console.log(localStorage.getItem('name'));
console.log(localStorage.getItem('task'));


