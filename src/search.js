import {key, indexDiv, printCard} from './index.js';

//검색기능 구현
const searchBtn = document.querySelector(".search-btn");
const searchInput = document.querySelector("#search-input");
const mainTitleText = document.querySelector("#main-title-text");
const ranking = document.querySelector("#ranking");

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
        rows.forEach(printCard);
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