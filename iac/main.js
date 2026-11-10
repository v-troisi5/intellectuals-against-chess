let quotes = [];
async function loadQuotes(){
  try
  {
    const response = await fetch("./quotes.json");
    if (!response.ok){
      throw new Error("Could not load quotes.json");
    }

    quotes = await response.json();
    renderQuotes();

  }
  catch (error)
  {
    console.error("Error loading quotes");
  }
}

function showPage(page){
  document.querySelectorAll(".page").forEach(section => {
    section.classList.remove("active");
  });

  document.getElementById(page).classList.add("active");

  window.location.hash = page;
  window.scrollTo(0, 0);
}

function showList(){
  showPage("list");
}

function showRandom(){
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  document.getElementById("randomQuote").textContent = '"' + quote.text + '"';
  document.getElementById("randomAuthor").textContent = "- " + quote.author;

  showPage("random");
}

function renderQuotes(){
  const container = document.getElementById("quoteList");

  container.innerHTML = "";

  quotes.forEach(quote => {
    const item = document.createElement("div");
    item.className = "quote-item";

    const text = document.createElement("div");
    text.textContent = '"' + quote.text + '"';

    const author = document.createElement("span");
    author.className = "quote-author";
    author.textContent = "- " + quote.author;

    item.appendChild(text);
    item.appendChild(author);

    container.appendChild(item);
  });
}

function toggleTheme(){
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  document.getElementById("themeToggle").textContent = isDark ? "♔" : "♚";
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark"){
  document.body.classList.add("dark");
  document.getElementById("themeToggle").textContent = "♔";
}

function restorePage(){
  const page = window.location.hash.replace("#", "");

  if (["home", "random", "list"].includes(page)){
    if (page === "random"){
      showRandom();
      return;
    }
    showPage(page);
  } 
  else
  {
    showPage("home");
  }
}

loadQuotes();

window.addEventListener("hashchange", () => {
  const page = window.location.hash.replace("#", "");

  if (page === "random"){
    showRandom();
  }
  else if (["home", "list"].includes(page)){
    showPage(page);
  }
});
