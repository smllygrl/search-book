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

  // bookResults is an array
  const booksResults = await accessSearchResults(userInput);
  console.log(booksResults[0].volumeInfo);

  // listofBooks is an array
  const listOfBooks = booksResults.map((book) => {
    console.log(book.volumeInfo);

    const bookObject = {
      title: book.volumeInfo.title,
      author: book.volumeInfo.authors,
      description: book.volumeInfo.description,
      img: book.volumeInfo.imageLinks.thumbnail,
    };
    console.log(bookObject);
    // let bookObjectArray = bookObject;
    // console.log(bookObjectArray);

    const bookDiv = document.createElement("div");
    const bookDivContent = document.createTextNode(
      `Title: ${bookObject.title} 
      Author(s):${bookObject.author}
      Description: ${bookObject.description}`
    );
    bookDiv.appendChild(bookDivContent);

    const bookImage = document.createElement("img");
    bookImage.src = bookObject.img;

    bookDiv.appendChild(bookImage);

    // const titlePara = document.createElement("p");
    // const titleText = document.createTextNode(
    //   `Title: ${book.volumeInfo.title}`
    // );
    // titlePara.appendChild(titleText);

    return bookDiv;
  });

  // For each book we want to create a div
  // Inside each div we want a title, an image, a para
  // Append each of the book div to the book container

  const bookContainer = document.querySelector(".bookContainer__results");

  listOfBooks.forEach((para) => {
    bookContainer.appendChild(para);
  });

  console.log(listOfBooks);
});

// const authorPara = document.createElement("p");
// const authorText = document.createTextNode(
//   `Authors: ${book.volumeInfo.authors}`
// );
// authorPara.appendChild(authorText);

// console.log(`${book.volumeInfo.authors}`);
