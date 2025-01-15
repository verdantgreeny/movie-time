import {key, indexDiv, printCard} from './index.js';
import {mainTitleText} from './search.js';


export let fetchMovie = async function (searchValue) {
  try {
      const mainUrl = `https://api.themoviedb.org/3/trending/movie/day?api_key=${key}&language=ko-KR`;
      const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${searchValue}&include_adult=false&language=ko-KR&page=1`;
      let url = '';
      searchValue === null ? url = mainUrl : url = searchUrl;
      const res = await fetch(url);
      const res2 = await res.json();
          let rows = res2["results"];
          indexDiv.innerHTML = "";
          rows.forEach(printCard);
    } catch (err) {
      console.log(`err : ${err}발생`);
      indexDiv.style.display = "none";
      mainTitleText.innerHTML = `페이지를 불러오지 못 했습니다.<br> "${err}" 발생`;
    }
  };



