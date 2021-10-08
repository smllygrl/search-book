const GOOGLEBOOKS_URL = "https://www.googleapis.com/books/v1/volumes?q=";
const searchBtn = document.getElementById("googleSearch");

const accessSearchResults = async (searchInput) => {
  const searchResponse = await fetch(`${GOOGLEBOOKS_URL}${searchInput}`);
  const searchData = await searchResponse.json();
  return searchData.items;
};

searchBtn.addEventListener("click", async (event) => {
  console.log("Search Button Pressed");
  const userInput = document.querySelector("#searchInput").value;

  const booksResults = await accessSearchResults(userInput);
  const listOfBooks = booksResults.map((book) => {
    console.log(book.volumeInfo.title);
    const titlePara = document.createElement("p");
    const titleText = document.createTextNode(`${book.volumeInfo.title}`);
    titlePara.appendChild(titleText);
    return titlePara;
  });

  // For each book we want to create a div
  // Inside each div we want a title, an image, a para
  // Append each of the book div to the book container

  const bookContainer = document.querySelector(".bookContainer__search");

  listOfBooks.forEach((para) => {
    bookContainer.appendChild(para);
  });

  console.log(listOfBooks);
});
