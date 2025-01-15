import {key, indexDiv, printCard} from './index.js';


//----------------홈화면 API로 데이터 받고 화면 출력----------------
export let trendMovie = function () {
    const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${key}&language=ko-KR`;
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        let rows = res["results"];
        indexDiv.innerHTML = "";
        rows.forEach(printCard);
      });
  };

    //검색화면 API로 데이터 받고 화면 출력
export let searchForMovie = function (searchValue) {
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${searchValue}&include_adult=false&language=ko-KR&page=1`;
        fetch(url)
          .then((res) => res.json())
          .then((res) => {
            let rows = res["results"];
            indexDiv.innerHTML = "";
            rows.forEach(printCard);
          });
      };

