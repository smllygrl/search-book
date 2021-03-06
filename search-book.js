const GOOGLEBOOKS_URL = "https://www.googleapis.com/books/v1/volumes?q=";
const searchBtn = document.getElementById("googleSearch");
const clearBtn = document.getElementById("clearAll");

const accessSearchResults = async (searchInput) => {
  const searchResponse = await fetch(`${GOOGLEBOOKS_URL}${searchInput}`);
  const searchData = await searchResponse.json();
  return searchData.items;
};

clearBtn.addEventListener("click", () => {
  console.log("Clear had been pressed");
  document.querySelector("#searchInput").value = null;
  location.reload();
});

searchBtn.addEventListener("click", async (event) => {
  console.log("Search Button Pressed");

  const userInput = document.querySelector("#searchInput").value;

  // bookResults is an array
  const booksResults = await accessSearchResults(userInput);

  // listofBooks is an array
  const listOfBooks = booksResults.map((book) => {
    const bookObject = {
      title: book.volumeInfo.title,
      author: book.volumeInfo.authors,
      description: book.volumeInfo.description,
      img: book.volumeInfo.imageLinks?.smallThumbnail,
    };

    const bookDiv = document.createElement("div");
    bookDiv.classList.add("bookDiv");

    const bookDivTitle = document.createElement("h2");
    const title = document.createTextNode(`${bookObject.title}`);
    bookDivTitle.appendChild(title);
    bookDiv.appendChild(bookDivTitle);
    bookDivTitle.classList.add("bookDiv__title");

    const bookImage = document.createElement("img");
    bookImage.classList.add("bookDiv__image");
    bookImage.src = bookObject.img;
    bookDiv.appendChild(bookImage);

    // authors is an array
    const bookDivAuthors = document.createElement("h3");
    const authors = document.createTextNode(` by ${bookObject.author}`);
    bookDivAuthors.appendChild(authors);
    bookDiv.appendChild(bookDivAuthors);
    bookDivAuthors.classList.add("bookDiv__authors");

    const bookDivDes = document.createElement("p");
    const description = document.createTextNode(`${bookObject.description}`);
    bookDivDes.appendChild(description);
    bookDiv.appendChild(bookDivDes);
    bookDivDes.classList.add("bookDiv__des");
    console.log(typeof bookDivDes);

    return bookDiv;
  });

  // For each book we want to create a div
  // Inside each div we want a title, an image, a para
  // Append each of the book div to the book container

  const bookContainer = document.querySelector(".bookContainer__results");

  listOfBooks.forEach((div) => {
    bookContainer.appendChild(div);
  });

  console.log(listOfBooks);
});
