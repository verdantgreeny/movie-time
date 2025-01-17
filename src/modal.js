import { key, indexDiv } from "./index.js";

//모달

// 모달 창 가져오기
export const modal = document.querySelector(".modal");
export const modalSection = document.querySelector("#modal-section");

//상세 페이지 API - 모듈 실패
let detailsMovie = async function (id) {
  try {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=ko-KR`;
    const res = await fetch(url);
    const res2 = await res.json();
    modalSection.innerHTML = "";
    printDetails(res2);
    modalClose();
  } catch (err) {
    modalSection.innerHTML = "";
    alert(`
    상세페이지를 불러올 수 없습니다. 
    ${err}`);
  }
};

// 모달 화면출력
let printDetails = function (res2) {
  let title = res2["title"];
  let originalTitle = res2["original_title"];
  let overview = res2["overview"];
  let poster = res2["poster_path"];
  let rating = res2["vote_average"];
  let releaseDate = res2["release_date"];
  let genres = res2["genres"][0]["name"];
  let id = res2["id"];

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
              <div class="poster" style="display: none;">${poster}</div>
              <div class="modal-header-content">
                <h2 id="modal-title">${title}</h2>
                <p id="original-title"> ${originalTitle} </p>
                <p id="modal-release-date">개봉일 : ${releaseDate}</p>
                <p id="genres">장르 : ${genres}</p>
                <p id="modal-rating">평점 : ${rating} </p>
              </div>
            </div>

            <div id="modal-overview">
            <h2> 요약 </h2>
            <p id="modal-p-overview">${overview}</p> 
          </div>
          </div>
        </div>
        <!-- modal end -->
`;
  modalSection.innerHTML = modal;
};

// 모달 토글
const toggleModal = function () {
  modal.classList.toggle("hide");
};

// 모달 열기 버튼 클릭 이벤트 추가
indexDiv.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    toggleModal();
    const movieId = e.target.getAttribute("id");
    detailsMovie(movieId);
  }
});

// 모달 닫기 버튼 클릭 이벤트 추가
let modalClose = function () {
  const modalHide = document.querySelector(".modal");
  modalSection.addEventListener("click", function (e) {
    if (e.target.tagName === "SPAN" || e.target === modalHide) {
      modalHide.classList.add("hide");
    } else if (e.target.tagName === "BUTTON") {
      alert("북마크 되었습니다.");
    }
  });
};
