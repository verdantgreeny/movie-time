import { indexDiv} from "./index.js";
import { mainTitleText } from "./search.js";
//북마크 하기

const bookmarkLink = document.querySelector("#bookmark-link");

let savedMovieCheck = []; 

//북마크에 저장
const save = function (movie, movieId) {
  let newMovieList = JSON.parse(localStorage.getItem("movie")) || [];
  let newMovie = movieId
  let isDup = savedMovieCheck.indexOf(newMovie);
  console.log('중복확인', isDup);
  
  if (isDup === -1) {
    newMovieList.push(movie);
    savedMovieCheck.push(movieId);

    localStorage.setItem("movie", JSON.stringify(newMovieList));
    alert("북마크가 저장 되었습니다.");
  } else {
    alert("북마크가 이미 저장 되어있습니다.")
  }

};

//메인화면에서 북마크 버튼을 눌렀을 때
indexDiv.addEventListener("click", function (e) {
  if (e.target.tagName === "BUTTON") {
    //영화 정보 가져오기
    let movieCard = e.target.closest(".movie-card");
    let movieId = e.target.id;
    let poster = movieCard.querySelector(".poster").innerText;
    let overview = movieCard.querySelector(".overview").innerText;
    let title = movieCard.querySelector(".movie-title").innerText;
    let rating = movieCard.querySelector(".rating").innerText;
    let movieObj = {
      title: title,
      poster: poster,
      overview: overview,
      rating: rating,
      id: movieId,
    };
    save(movieObj, movieId);
  }
});

//북마크 링크 클릭 시
bookmarkLink.addEventListener("click", function () {
  mainTitleText.innerHTML = "영화 북마크";
  if (localStorage.length === 0) {
    indexDiv.style.display = "none";
  } else {
    indexDiv.style.display = "grid";
    indexDiv.innerHTML= "";
    let printBookmarkCard = JSON.parse(localStorage.getItem("movie"));

    for (let i = 0; i < printBookmarkCard.length; i++) {
      let title = printBookmarkCard[i]["title"];
      let overview = printBookmarkCard[i]["overview"];
      let rating = printBookmarkCard[i]["rating"];
      let poster = printBookmarkCard[i]["poster"];
      let id = printBookmarkCard[i]["id"];

      //데이터 화면 출력하기
      let movieCard = `
      <article class="movie-card">
        <section
          class="movie-front"
          style="
            background-image: url('https://image.tmdb.org/t/p/w500${poster}');
          "
        >
          <div class="poster" style="display: none;">${poster}</div>
          <div class="ranking">${i + 1}</div>
          <div class="overview">${overview}</div>
        </section>
        <section>
          <li class="movie-title" id="${id}">${title}</li>
          <div class="rating">${rating}</div>
          <button class="bookmark-btn remove" id="${id}">북마크 삭제하기</button>
        </section>
      </article>
      `;
      indexDiv.innerHTML += movieCard;
    }    
    }
  });


// //모달창에 있는 북마크 버튼을 눌렀을 때
// let modalBookmark = function () {
//   modalSection.addEventListener("click", function (e) {
//     if (e.target.tagName === "BUTTON") {
//       alert("북마크 되었습니다.");
//     }
//   });
// };
