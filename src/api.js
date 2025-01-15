import {key, indexDiv, printCard} from './index.js';
import {mainTitleText} from './search.js';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YzA0MmRkMjU5ZmY3NDY3OGZhYWQ5ZmM5OTNkZTM3MSIsIm5iZiI6MTczNjI5ODAxNC40NDYsInN1YiI6IjY3N2RjZTFlYjExZDA4ODExMTdhZjllMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lh4p7D1aiISP-T8-lYWAbTXcJNMLecHQch9r-_-jwiQ'
  }
};

export let fetchMovie = async function (searchValue) {
  try {
      const mainUrl = `https://api.themoviedb.org/3/trending/movie/day?api_key=${key}&language=ko-KR`;
      const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${searchValue}&include_adult=false&language=ko-KR&page=1`;
      let url = '';
      searchValue === null ? url = mainUrl : url = searchUrl;
      const res = await fetch(url, options);
      const res2 = await res.json();
          let r = res2["results"];
          indexDiv.innerHTML = "";
          r.forEach(printCard);
    } catch (err) {
      indexDiv.style.display = "none";
      mainTitleText.innerHTML = `페이지를 불러오지 못 했습니다.<br> "${err}" 발생`;
    }
  };



