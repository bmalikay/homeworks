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


const usdInput = document.querySelector('#usd');
const somInput = document.querySelector('#som');
const eurInput = document.querySelector('#eur');

const converter = (element, targetElement1, targetElement2) => {
    element.oninput = () => {
        const request = new XMLHttpRequest();
        request.open('GET', '../data/converter.json');
        request.setRequestHeader('Content-type', 'application/json');
        request.send();

        request.onload = () => {
            const data = JSON.parse(request.response);

            if (element.id === 'som') {
                targetElement1.value = (element.value / data.usd).toFixed(2);
                targetElement2.value = (element.value / data.eur).toFixed(2);
            }
            else if (element.id === 'usd') {
                targetElement1.value = (element.value * data.usd).toFixed(2);
                targetElement2.value = (element.value * (data.eur / data.usd)).toFixed(2);
            }
            else if (element.id === 'eur') {
                targetElement1.value = (element.value * (data.usd / data.eur)).toFixed(2);
                targetElement2.value = (element.value *  data.eur).toFixed(2);
            }

            if (element.value === '') {
                targetElement1.value = '';
                targetElement2.value = '';
            }
        };
    };
};

converter(somInput, usdInput, eurInput);
converter(usdInput, somInput, eurInput);
converter(eurInput, usdInput, somInput);
