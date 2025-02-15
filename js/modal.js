// MODAL

const modal = document.querySelector('.modal')
const modalTriggerButton = document.querySelector('#btn-get');
const modalCloseButton = document.querySelector('.modal_close');
const openModal = () => {
    modal.style.display = 'block';
}

const closeModal = () => {
    modal.style.display = 'none';
}
modalTriggerButton.onclick = openModal;
modalCloseButton.onclick = closeModal;
modal.onclick =(event) => {
    if (event.target === modal) {
        closeModal();
    }
};

setTimeout(openModal, 10000);

const checkScrollToEnd = () => {
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight) {
        openModal();
        window.removeEventListener('scroll', checkScrollToEnd);
    }
};
window.addEventListener('scroll', checkScrollToEnd);
