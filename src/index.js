import {fetchMovie} from './api.js';
import { mainTitleText } from './search.js';

export const key = "8c042dd259ff74678faad9fc993de371";
export const indexDiv = document.querySelector("#index-div");
export let printCard = function (a, i) {
  let title = a["title"];
  let overview = a["overview"];
  let rating = a["vote_average"];
  let poster = a["poster_path"];
  let id = a["id"];
  //데이터 화면 출력하기
  let movieCard = `
  <article class="movie-card">
    <section
      class="movie-front"
      style="
        background-image: url('https://image.tmdb.org/t/p/w500${poster}');
      "
    >
      <div class="ranking">${i + 1}</div>
      <div class="overview">${overview}</div>
    </section>
    <section>
      <li class="movie-title" id="${id}">${title}</li>
      <div class="rating">평점 : ${rating}</div>
      <button class="bookmark-btn" id="${id}">북마크</button>
    </section>
  </article>
  `;
  indexDiv.innerHTML += movieCard;
};

fetchMovie(null);

//북마크 하기
const bookmarkLink = document.querySelector('#bookmark-link');

let bookmarkList = [];

bookmarkLink.addEventListener('click', function(){
  mainTitleText.innerHTML = '영화 북마크';
  if (bookmarkList.length === 0) {
    indexDiv.style.display = "none";
  } else {
    indexDiv.style.display = "grid";
  }
})

indexDiv.addEventListener("click", function (e) {
    if (e.target.tagName === "BUTTON") {
        e.target.classList.add('add-bookmark');
        alert("북마크 되었습니다.");
      }
     });

let modalBookmark = function () {
   modalSection.addEventListener("click", function (e) {
   if (e.target.tagName === "BUTTON") {
       alert("북마크 되었습니다.");
     }
   });
 };