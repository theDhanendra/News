const API_KEY = "4277c36a13a44b7b86a97c66a034dff8";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
    // console.log(data);
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} - ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});

function fetchNewsData(){
    fetch(url)
        .then(response => responce.json())
        .then(data =>
            {
                displayNewsData(data.articles);
            })
        .catch(error =>{
            console.error('Error fetching data:', error);
        });
}

function displayNewsData(article){
    const newsContainer = document.getElementById('news-container');

    newsContainer.innerHTML = '';
  
  // Loop through articles and create elements to display them
  articles.forEach(article => {
    const articleElement = document.createElement('div');
    articleElement.className = 'article';
    
    const titleElement = document.createElement('h2');
    titleElement.textContent = article.title;
    
    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = article.description;
    
    articleElement.appendChild(titleElement);
    articleElement.appendChild(descriptionElement);
    
    newsContainer.appendChild(articleElement);
  });
}

// Call the fetchNewsData function to retrieve and display news
fetchNewsData();
