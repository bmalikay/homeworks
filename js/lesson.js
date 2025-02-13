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

const tabs = document.querySelectorAll('.tab_content_item');
const tabContents = document.querySelectorAll('.tab_content_block');

let currentIndex = 0;
let intervalId = null;

function hideAllTabs() {
    tabs.forEach(tab => tab.classList.remove('tab_content_item_active'));
    tabContents.forEach(content => {
        content.style.display = 'none';
    });
}
function showTab(index) {
    tabs[index].classList.add('tab_content_item_active');
    tabContents[index].style.display = 'block';
    currentIndex = index;
}

function autoSwitch() {
    currentIndex++;
    if (currentIndex >= tabs.length) {
        currentIndex = 0;
    }
    hideAllTabs();
    showTab(currentIndex);
}
function startAutoSwitch() {
    intervalId = setInterval(autoSwitch, 3000);
}

function stopAutoSwitch() {
    clearInterval(intervalId);
    intervalId = null;
}
function resetAutoSwitch() {
    stopAutoSwitch();
    startAutoSwitch();
}
tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        hideAllTabs();
        showTab(index);
        resetAutoSwitch();
    });
});

hideAllTabs();
showTab(currentIndex);

startAutoSwitch();
