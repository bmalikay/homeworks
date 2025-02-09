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
const parentBlock = document.querySelector(".parent_block");
const childBlock = document.querySelector(".child_block");

let position = 0;
const speed = 5;

function moveBlock() {

    if (position < parentBlock.offsetWidth - childBlock.offsetWidth) {
        position += speed;
        childBlock.style.left = `${position}px`;
        requestAnimationFrame(moveBlock);
    }
}

moveBlock();
