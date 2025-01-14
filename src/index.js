const key = "8c042dd259ff74678faad9fc993de371";
const indexDiv = document.querySelector("#index-div");
const rankingText = document.querySelector(".ranking");
const main = document.querySelector("main");
//검색기능 구현
const searchBtn = document.querySelector(".search-btn");
const searchInput = document.querySelector("#search-input");
const mainTitleText = document.querySelector("#main-title-text");
const ranking = document.querySelector("#ranking");
// 모달 창 가져오기
const modal = document.querySelector(".modal");
const closeBtn = document.querySelector(".close-btn");
const modalSection = document.querySelector("#modal-section");

let fetchCard = function (a, i) {
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

//----------------검색----------------
//검색버튼 마우스오버할 때 일어나는 이벤트 -> 클릭시 이벤트로 변경
searchBtn.addEventListener("click", function () {
  console.log("click");
  //삼항연산자로 바꾸기
  searchInput.style.display === "none"
    ? (searchInput.style.display = "inline")
    : (searchInput.style.display = "none");
});

//검색인풋 포커스할 때 일어나는 이벤트
searchInput.addEventListener("focus", function () {
  if (searchInput.value === "") {
    indexDiv.style.display = "none";
    mainTitleText.innerHTML = `"" 검색 결과`;
    console.log("focus");
  }
});

//검색화면 API로 데이터 받고 화면 출력
let searchForMovie = function (searchValue) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${searchValue}&include_adult=false&language=ko-KR&page=1`;
  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      let rows = res["results"];
      indexDiv.innerHTML = "";
      rows.forEach(fetchCard);
    });
};

// 인풋값가져오기 input
searchInput.addEventListener("input", function () {
  let searchValue = searchInput.value.trim(); //trim(): 문자열의 양 끝에 공백 제거
  if (searchValue !== "") {
    indexDiv.style.display = "grid";
    mainTitleText.innerHTML = `"${searchValue}" 검색 결과`;
    searchForMovie(searchValue);
    return;
  } else {
    mainTitleText.innerHTML = `"" 검색 결과`;
    indexDiv.innerHTML = "";
    return;
  }
});

// ----------------모달----------------
function toggleModal() {
  modal.classList.toggle("hide");
}

//상세 페이지 API로 데이터 받고 화면 출력
let detailsMovie = function (id) {
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=ko-KR`;
  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      modalSection.innerHTML = "";
      let title = res["title"];
      let originalTitle = res["original_title"];
      let overview = res["overview"];
      let poster = res["poster_path"];
      let rating = res["vote_average"];
      let releaseDate = res["release_date"];
      let genres = res["genres"][0]["name"];
      //데이터 화면 출력하기
      let modal = `
          <!-- modal start -->
          <div id="title1" class="modal">
            <div class="modal-content">
              <span class="close-btn"> X </span>
              <div class="modal-header">
                <img
                  class="modal-img"
                  src="https://image.tmdb.org/t/p/w500${poster}"
                  alt=""
                />
                <div class="modal-header-content">
                  <h2 id="modal-title">${title}</h2>
                  <p id="original-title"> ${originalTitle} </p>
                  <p id="modal-release-date">개봉일 : ${releaseDate}</p>
                  <p id="genres">장르 : ${genres}</p>
                  <p id="modal-rating">평점 : ${rating} </p>
                  <button class="bookmark-btn">북마크</button>
                </div>
              </div>

              <div id="modal-overview">
              <h2> 요약 </h2>
              <p>${overview}</p> 
            </div>
            </div>
          </div>
          <!-- modal end -->
  `
      modalSection.innerHTML = modal;

      // 모달 닫기 버튼 클릭 이벤트 추가
      const modalHide = document.querySelector(".modal");
      modalSection.addEventListener("click", function (e) {
        if (e.target.tagName === "SPAN") {
          modalHide.classList.add("hide");
        } else if (e.target.tagName === "BUTTON") {
          alert("북마크 되었습니다.");
        }
      });
    });
};

// 모달 열기 버튼 클릭 이벤트 추가
indexDiv.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    toggleModal();
    const movieId = e.target.getAttribute("id");
    detailsMovie(movieId);
    console.log(movieId);
  } else if (e.target.tagName === "BUTTON") {
    alert("북마크 되었습니다.");
  }
});

//북마크 하기
const bookmarkBtn = document.querySelector(".bookmark-btn");
