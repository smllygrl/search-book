const GOOGLEBOOKS_URL = "https://www.googleapis.com/books/v1/volumes?q=";
// below is what will be entered+from+the+search+box
searchItem = document.getElementById("searchInput").value;
// let searchItem = "quilting";
const searchBtn = document.getElementById("googleSearch");

const accessSearchResults = async () => {
  const searchResponse = await fetch(`${GOOGLEBOOKS_URL}${searchItem}`);
  console.log(searchResponse);
  const searchData = await searchResponse.json();
  let resultArray = searchData.items;
  console.log(resultArray);

  const getVolumeInfo = async (array) => {
    let volumeInfo = await array.volumeInfo;
    console.log(volumeInfo);
  };

  getVolumeInfo(resultArray);
};

searchBtn.addEventListener("click", async () => {
  console.log("Search Button Pressed");

  await accessSearchResults();
  searchItem.value = "";
  // take whatever is in input box
  // split it using +
  // let searchItem = splitSearchString
});

// const getTitle = async (resultArray) => {
//   let title = await resultArray{volumeInfo.author};
//   console.log(title);
// };

// getTitle();

// const renderTitle () => {

// }

// const renderAuthor () => {

// }

// const renderDescription () => {

// }

// const renderImage () => {

// }

// from volumeInfo
// return title
// return imageLinks > thumbnail
// return authors
// return description
