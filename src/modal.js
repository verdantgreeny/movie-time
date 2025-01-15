import {key, indexDiv} from './index.js';

// 모달 창 가져오기
const modal = document.querySelector(".modal");
const closeBtn = document.querySelector(".close-btn");
const modalSection = document.querySelector("#modal-section");

// ----------------모달----------------
function toggleModal() {
    modal.classList.toggle("hide");
  }
let printDetail = function() {
    
} 
  //상세 페이지 API로 데이터 받고 화면 출력
  let detailsMovie = function (id) {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=ko-KR`;
    fetch(url)
      .then((res) => res.json())
      .then(function(res) {
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
  