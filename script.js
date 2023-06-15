document.addEventListener("DOMContentLoaded", () => {
  const searchButton = document.getElementById("search-button");
  const loader = document.getElementById("loader");
//movie search button 
  searchButton.addEventListener("click", async () => {
    const search = document.getElementById("movie-search").value;
    const api = "k_kqjaf24l";
//searched movie name in console
    console.log(search);
// fetching data
    async function fetchData() {
      try {
          loader.style.display = "block";
        const response = await fetch(`https://imdb-api.com/en/API/SearchMovie/${api}/${search}`);
        const data = await response.json();
        console.log(data);

         const mainContainer = document.getElementById("main-container");
        mainContainer.innerHTML = "";

// checking weather receiving data is array
        if (Array.isArray(data.results)) {
          data.results.forEach((element) => {
            const mainContainer = document.getElementById("main-container");
            const movieContainer = document.createElement("div");
            movieContainer.className = "container";
            const movieHeaderContainer = document.createElement("div");
            movieHeaderContainer.className = "movie-container-header";
            const movieTitle = document.createElement("h4");
            movieTitle.innerHTML = element.title;
            const movieBodyContainer = document.createElement("div");
            movieBodyContainer.className = "movie-container-body";
            const moviePicture = document.createElement("img");
            moviePicture.className = "movie-image";
            moviePicture.src = element.image;
            moviePicture.alt = `Movie image ${element.title}`
            const movieDescription = document.createElement("span");
            movieDescription.innerText = element.description;
            const movieMoreDetail = document.createElement("button");
            movieMoreDetail.className = "more-less-btn";
            movieMoreDetail.innerText = "Read More";
            const detailContent = document.createElement("div");
            detailContent.className = "less-detail";
            // creating more detail button
            // also adding nested if else statement to check already movie detail fetched if yes then 
            //just using conditional style rendering to show and hide data
            // if data is already present it will avoid repeated request to server by using nested if statement
            movieMoreDetail.addEventListener("click", () => {
              detailContent.classList.toggle("less-detail");
              detailContent.classList.toggle("more-detail");

              if (detailContent.classList.contains("more-detail")) {
                movieMoreDetail.innerText = "Read Less";
                const containsPTag = movieBodyContainer.querySelector("p") !== null;
                if (containsPTag) {
                  console.log("Read more");
                  const delew = document.getElementById("full-detail");
                  delew.setAttribute("style", "display: block;");
                  detailContent.setAttribute("style", "display: block;");
                } else {
                  console.log("fetching more detail");
                  const lesser = document.createElement("p");
                  lesser.id = "full-detail";
                  lesser.innerText = "More movie detail";
                  lesser.setAttribute("style", "display: block;");
                  movieBodyContainer.append(lesser);
// fetching additional info of movie 
                  fetch(`https://imdb-api.com/en/API/Title/k_kqjaf24l/${element.id}/FullActor,FullCast,Posters,Images,Trailer,Ratings,Wikipedia/`)
                    .then((res) => res.json())
                    .then((detail) => {
                      console.log(detail);
                      detailContent.innerHTML = `<p>Release Date: ${detail.releaseDate}</p>
                        <p>Run Time: ${detail.runtimeStr}</p>
                        <p>Director: ${detail.directors}</p>
                        <p>Stars: ${detail.stars}</p>
                        <p>Plot: ${detail.plot}</p>
                        <a href="https://www.imdb.com/title/${detail.id}" target="_blank">IMDB Info Page</a>`;
                      movieBodyContainer.append(detailContent);
                    })
                    .catch((error) => {
                      console.log(error);
                      detailContent.setAttribute("style", "display: block;");
                    });
                }
              } else {
                const containsPTag = movieBodyContainer.querySelector("p") !== null;
                if (containsPTag) {
                  movieMoreDetail.innerText = "Read More";
                  const dete = document.getElementById("full-detail");
                  dete.setAttribute("style", "display: none;");
                  detailContent.setAttribute("style", "display: none;");
                  console.log("Read less");
                }
              }
            });
// appending elements 
            movieContainer.appendChild(movieMoreDetail);
            movieHeaderContainer.appendChild(movieTitle);
            movieBodyContainer.append(moviePicture, movieDescription);
            movieBodyContainer.append(movieMoreDetail);
            movieContainer.append(
              movieHeaderContainer,
              movieBodyContainer,
              movieMoreDetail,
              detailContent
            );
            mainContainer.append(movieContainer);
          });
        } else {
          console.log("Data is not an array");
        }
      } catch (error) {
        console.log(error);
      }
      finally {
       
        loader.style.display = "none";
      }
    }

    await fetchData();
  });
});
