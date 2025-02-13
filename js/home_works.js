// проверка на валидность
const emailInput = document.querySelector("#gmail_input");
const emailButton = document.querySelector("#gmail_button");
const emailResult = document.querySelector("#gmail_result");

const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
emailButton.onclick = () =>{
    if (gmailRegex.test(emailInput.value)) {
        emailResult.innerHTML = "Валидный Gmail";
        emailResult.style.color = "green";
    } else {
        emailResult.textContent = "Невалидный Gmail";
        emailResult.style.color = "red";
    }
}
// 2-e задание
const childBlock = document.querySelector(".child_block");
const parentBlock = document.querySelector(".parent_block");

let positionX = 0;
let positionY = 0;
const offsetWidth = parentBlock.clientWidth - childBlock.clientWidth;
const offsetHeight = parentBlock.clientHeight - childBlock.clientHeight;

const moveBlock = () => {
    if (positionX < offsetWidth && positionY === 0) {
        positionX++;
        childBlock.style.left = `${positionX}px`;
        requestAnimationFrame(moveBlock);
    } else if (positionX >= offsetWidth && positionY < offsetHeight) {
        positionY++;
        childBlock.style.top = `${positionY}px`;
        requestAnimationFrame(moveBlock);
    } else if (positionY >= offsetHeight && positionX > 0) {
        positionX--;
        childBlock.style.left = `${positionX}px`;
        requestAnimationFrame(moveBlock);
    } else if (positionX === 0 && positionY > 0) {
        positionY--;
        childBlock.style.top = `${positionY}px`;
        requestAnimationFrame(moveBlock);
    }
};
moveBlock();

// 2.2
const secondsDisplay = document.getElementById("seconds");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");

let counter = 0;
let timer = null;

startButton.addEventListener("click", () => {
    if (!timer) {
        timer = setInterval(() => {
            counter++;
            secondsDisplay.textContent = counter;
        }, 1000);
    }
});

stopButton.addEventListener("click", () => {
    clearInterval(timer);
    timer = null;
});

resetButton.addEventListener("click", () => {
    clearInterval(timer);
    counter = 0;
    secondsDisplay.textContent = counter;
    timer = null;
});

//hw3
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.querySelector(".modal");
    const modalClose = document.querySelector(".modal_close");

    if (!modal || !modalClose) return;

    let modalShown = false;

    function showModal() {
        if (!modalShown) {
            modal.style.display = "block";
            document.body.style.overflow = "hidden";
            modalShown = true;
            window.removeEventListener("scroll", scrollHandler);
        }
    }

    modalClose.addEventListener("click", () => {
        modal.style.display = "none";
        document.body.style.overflow = "";
    });

    //  Модалка через 10 секунд после загрузки страницы
    setTimeout(() => {
        showModal();
    }, 10000);

    // Модалка по скроллу до конца страницы
    function scrollHandler() {
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight) {
            showModal();
        }
    }

    window.addEventListener("scroll", scrollHandler);
});

