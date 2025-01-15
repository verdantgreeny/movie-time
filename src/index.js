export const key = "8c042dd259ff74678faad9fc993de371";
export const indexDiv = document.querySelector("#index-div");

import {fetchMovie} from './api.js'
// export const rankingText = document.querySelector(".ranking");
// export const main = document.querySelector("main");

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
      <button class="bookmark-btn">북마크</button>
    </section>
  </article>
  `;
  indexDiv.innerHTML += movieCard;
};



fetchMovie(null);


//북마크 하기
const bookmarkBtn = document.querySelector(".bookmark-btn");
