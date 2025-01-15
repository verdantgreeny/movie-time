export const key = "8c042dd259ff74678faad9fc993de371";
export const indexDiv = document.querySelector("#index-div");
export const rankingText = document.querySelector(".ranking");
export const main = document.querySelector("main");


export let fetchCard = function (a, i) {
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

//----------------홈화면 API로 데이터 받고 화면 출력----------------
let trendMovie = function () {
  const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${key}&language=ko-KR`;
  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      let rows = res["results"];
      indexDiv.innerHTML = "";
      rows.forEach(fetchCard);
    });
};

trendMovie();


//북마크 하기
const bookmarkBtn = document.querySelector(".bookmark-btn");
