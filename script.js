const apiKey = "4f375e16251b46c087cab7622448252f"; // Your NewsAPI key
const newsSection = document.getElementById("news-section");
const categoryButtons = document.querySelectorAll(".category-btn");
const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");

// Fetch news based on category or search query
async function fetchNews(query, isCategory = true) {
  let url;
  if (isCategory) {
    url = `https://newsapi.org/v2/top-headlines?category=${query}&country=us&apiKey=${apiKey}`;
  } else {
    url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;
  }

  try {
    newsSection.innerHTML = "";
    newsSection.style.opacity = "0";

    const response = await fetch(url);
    const data = await response.json();

    if (data.articles.length > 0) {
      displayNews(data.articles.slice(0, 5)); // Display first 5 articles
    } else {
      newsSection.innerHTML = "<p>No articles found.</p>";
      newsSection.style.opacity = "1";
    }
  } catch (error) {
    console.error("Error fetching news:", error);
    newsSection.innerHTML =
      "<p>Error fetching news. Please try again later.</p>";
    newsSection.style.opacity = "1";
  }
}

// Display the news articles
function displayNews(articles) {
  newsSection.style.opacity = "1";
  articles.forEach((article) => {
    const articleElement = document.createElement("div");
    articleElement.classList.add("article");
    articleElement.innerHTML = `
            <h2>${article.title}</h2>
            <p>${article.description || "No description available."}</p>
            <a href="${article.url}" target="_blank">Read more</a>
        `;
    newsSection.appendChild(articleElement);
  });
}

// Add event listeners to category buttons
categoryButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const category = e.target.getAttribute("data-category");
    fetchNews(category);
  });
});

// Add event listener to search button
searchBtn.addEventListener("click", () => {
  const searchTerm = searchInput.value.trim();
  if (searchTerm) {
    fetchNews(searchTerm, false);
  }
});

// Dark mode toggle
const darkModeToggle = document.createElement("button");
darkModeToggle.id = "dark-mode-toggle";
darkModeToggle.textContent = "Toggle Dark Mode";
document.body.prepend(darkModeToggle);

darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});
