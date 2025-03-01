const cardsContainer = document.getElementById("cards-container");

const fetchPosts = async () => {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (!response.ok) throw new Error("Ошибка загрузки данных");

        const posts = await response.json();
        renderCards(posts);
    } catch (error) {
        console.error("Ошибка:", error);
    }
};

const renderCards = (posts) => {
    posts.slice(0, 10).forEach(post => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <img src="https://kinogo.inc/uploads/mini/short/2d/1563015062-1572996915-garri-potter-i-filosofskiy-kamen.jpg" alt="Картинка">
            <h3>${post.title}</h3>
            <p>${post.body}</p>
        `;
        cardsContainer.appendChild(card);
    });
};

fetchPosts();
