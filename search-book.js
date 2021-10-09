const GOOGLEBOOKS_URL = "https://www.googleapis.com/books/v1/volumes?q=";
const searchBtn = document.getElementById("googleSearch");
const clearBtn = document.getElementById("clearAll");

const accessSearchResults = async (searchInput) => {
  const searchResponse = await fetch(`${GOOGLEBOOKS_URL}${searchInput}`);
  const searchData = await searchResponse.json();
  return searchData.items;
};

searchBtn.addEventListener("click", async (event) => {
  console.log("Search Button Pressed");

  const userInput = document.querySelector("#searchInput").value;

  // bookResults is an array
  const booksResults = await accessSearchResults(userInput);

  // listofBooks is an array
  const listOfBooks = booksResults.map((book) => {
    console.log(book.volumeInfo);

    const bookObject = {
      title: book.volumeInfo.title,
      author: book.volumeInfo.authors,
      description: book.volumeInfo.description,
      img: book.volumeInfo.imageLinks?.thumbnail,
    };
    console.log(bookObject);

    const bookDiv = document.createElement("div");
    bookDiv.classList.add("bookDiv");

    const title = document.createTextNode(`${bookObject.title}`);
    bookDiv.appendChild(title);
    // title.classList.add("bookDiv__title");

    // authors is an array
    const authors = document.createTextNode(` by ${bookObject.author}`);
    bookDiv.appendChild(authors);
    // authors.classList.add("bookDiv__authors");

    // const bookDivContent = document.createTextNode(
    //   `Title: ${bookObject.title}
    //   Author(s):${bookObject.author}
    //   Description: ${bookObject.description}`
    // );
    // bookDiv.appendChild(bookDivContent);

    const bookImage = document.createElement("img");
    bookImage.classList.add("bookDiv__image");
    bookImage.src = bookObject.img;
    bookDiv.appendChild(bookImage);

    const description = document.createTextNode(`${bookObject.description}`);
    bookDiv.appendChild(description);
    // description.classList.add("bookDiv__description");

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

clearBtn.addEventListener("click", () => {
  console.log("Clear had been pressed");
  document.querySelector("#searchInput").value = null;
  location.reload();
});
