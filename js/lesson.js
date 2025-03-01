const phoneInput = document.querySelector('#phone_input');
const phoneButton = document.querySelector('#phone_button');
const phoneResult = document.querySelector('#phone_result');

const regExp = /\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}/


phoneButton.onclick = () => {
    if (regExp.test(phoneInput.value)) {
        phoneResult.innerHTML = 'OK'
        phoneResult.style.color = 'green'
    } else {
        phoneResult.innerHTML = 'NOT OK'
        phoneResult.style.color = 'red'
    }
}

// TAB SLIDER

const tabContentBlocks = document.querySelectorAll('.tab_content_block');
const tabItems = document.querySelectorAll('.tab_content_item');
const tabsParent = document.querySelector('.tab_content_items');

const hideTabContent = () => {
    tabContentBlocks.forEach(item => {
        item.style.display = 'none';
    });
    tabItems.forEach(item => {
        item.classList.remove('tab_content_item_active');
    });
}

const showTabContent = (index = 0) => {
    tabContentBlocks[index].style.display = 'block';
    tabItems[index].classList.add('tab_content_item_active');
};

hideTabContent();
showTabContent();

tabsParent.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')) {
        tabItems.forEach((item, i) => {
            if (event.target === item) {
                hideTabContent();
                showTabContent(i);
                currentIndex = i;
                resetAutoSwitch();
            }
        });
    }
}

let currentIndex = 0;
let intervalId = null;

function autoSwitch() {
    currentIndex = (currentIndex + 1) % tabItems.length;
    hideTabContent();
    showTabContent(currentIndex);
}

function startAutoSwitch() {
    intervalId = setInterval(autoSwitch, 3000);
}

function stopAutoSwitch() {
    clearInterval(intervalId);
}

function resetAutoSwitch() {
    stopAutoSwitch();
    startAutoSwitch();
}

startAutoSwitch();


// CONVERTER

const usdInput = document.querySelector("#usd");
const somInput = document.querySelector("#som");
const eurInput = document.querySelector("#eur");

const fetchRates = async () => {
    try {
        const response = await fetch("../data/converter.json");
        if (!response.ok) throw new Error("Ошибка загрузки данных");
        return await response.json();
    } catch (error) {
        console.error("Ошибка", error);
        return null;
    }
};

const converter = (element, targetElement1, targetElement2) => {
    element.oninput = async () => {
        const data = await fetchRates();
        if (!data) return;

        if (element.id === "som") {
            targetElement1.value = (element.value / data.usd).toFixed(2);
            targetElement2.value = (element.value / data.eur).toFixed(2);
        } else if (element.id === "usd") {
            targetElement1.value = (element.value * data.usd).toFixed(2);
            targetElement2.value = (element.value * (data.eur / data.usd)).toFixed(2);
        } else if (element.id === "eur") {
            targetElement1.value = (element.value * (data.usd / data.eur)).toFixed(2);
            targetElement2.value = (element.value * data.eur).toFixed(2);
        }

        if (element.value === "") {
            targetElement1.value = "";
            targetElement2.value = "";
        }
    };
};

converter(somInput, usdInput, eurInput);
converter(usdInput, somInput, eurInput);
converter(eurInput, usdInput, somInput);


// CARD SWITCHER
const cardBlock = document.querySelector(".card");
const btnNext = document.querySelector("#btn-next");
const btnPrev = document.querySelector("#btn-prev");

let cardId = 1;

const loadCard = async () => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${cardId}`);
        if (!response.ok) throw new Error("Ошибка загрузки карточки");

        const data = await response.json();
        cardBlock.innerHTML = `
            <p>${data.title}</p>
            <p>Completed: ${data.completed ? "✅" : "❌"}</p>
            <span>ID: ${data.id}</span>
        `;
    } catch (error) {
        console.error(error);
    }
};

btnNext.onclick = () => {
    cardId = cardId >= 200 ? 1 : cardId + 1;
    loadCard();
};

btnPrev.onclick = () => {
    cardId = cardId <= 1 ? 200 : cardId - 1;
    loadCard();
};

loadCard();


// WEATHER

const searchInput = document.querySelector(".cityName");
const searchButton = document.querySelector("#search");
const city = document.querySelector(".city");
const temp = document.querySelector(".temp");

const API_URL = "http://api.openweathermap.org/data/2.5/weather";
const API_TOKEN = "e417df62e04d3b1b111abeab19cea714";

searchButton.onclick = async () => {
    if (searchInput.value === "") {
        city.innerHTML = "Введите название города";
        temp.innerHTML = "";
        return;
    }

    try {
        const response = await fetch(`${API_URL}?appid=${API_TOKEN}&q=${searchInput.value}&lang=ru&units=metric`);
        if (!response.ok) throw new Error("Город не найден");

        const data = await response.json();
        city.innerHTML = data.name;
        temp.innerHTML = Math.round(data.main.temp) + "°C";
    } catch (error) {
        city.innerHTML = "Ошибка: " + error.message;
        temp.innerHTML = "";
    }

    searchInput.value = "";
};

